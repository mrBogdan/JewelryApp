import { Request, Response, NextFunction } from 'express';
import { uploadToStorageService, UserService } from '../../../services';
import { ISignupRequest } from '../../../interfaces/api/ISignupRequest';
import { IUser } from '../../../interfaces/models/IUser';
import { DEFAULT } from '../../../consts';
import * as path from 'path';
import { validator } from '../../../modules/validator';
import { IValidatorProperty } from '../../../interfaces/modules/validator/IValidatorProperty';
import {
    checkEmail,
    hasGreatThenOrEqualLength,
    hasLowerCase,
    hasUpperCase,
    onlyLetter
} from '../../../modules/validator/rules';
import { HttpError } from '../../../modules/errors/http.error';

const config = require('../../../../config');

export class UserController {
    private readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public signup(req: ISignupRequest, res: Response, next: NextFunction) {
        let imagePath: string = DEFAULT;

        if (req.file) {
            imagePath = req.file.path;
        }

        const validatedUser = this.validateUser(req);
        if (validatedUser.length) {
            res.status(400).send(validatedUser);
            return;
        }

        this.userService.isEmailRegistered(req.body.email)
            .then(() => uploadToStorageService(imagePath)
                .then((filePath: string) =>
                    this.userService.create(this.getUserFromReq(req, filePath))
                        .then((user: any) => {
                            res.send(user);
                        })
                ))
            .catch(next);

    }

    public signin(req: Request, res: Response, next: NextFunction) {
        const email: string = req.body.email;
        const password: string = req.body.password;

        return this.userService.getUserByEmailAndPassword(email, password)
            .then((token: string) => res.send(token))
            .catch(next);
    }

    public logout(req: Request, res: Response) {
        if (req.session.user) {
            delete req.session.user;
            res.sendStatus(200);
        } else {
            throw new HttpError(400, 'Bad logout');
        }
    }

    private validateUser(req: ISignupRequest) {
        const validatorParams: IValidatorProperty[] = [
            {
                field: {
                    fieldName: 'email',
                    value: req.body.email,
                    rules: [
                        checkEmail
                    ],
                }
            },
            {
                field: {
                    fieldName: 'firstName',
                    value: req.body.firstName,
                    rules: [
                        onlyLetter
                    ]
                }
            },
            {
                field: {
                    fieldName: 'lastName',
                    value: req.body.lastName,
                    rules: [
                        onlyLetter
                    ]
                }
            },
            {
                field: {
                    fieldName: 'password',
                    value: req.body.password,
                    rules: [
                        {
                            check: hasGreatThenOrEqualLength,
                            params: [3, 'password'],
                        },
                        hasLowerCase,
                        hasUpperCase,
                    ]
                }
            }
        ];

        return validator(validatorParams);
    }

    private getUserFromReq(req: ISignupRequest, filePath: string) {
        const { name } = path.parse(filePath);

        const user: IUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            email: req.body.email,
            imageUrl: `${config.get('services:StorageService')}/api/v1/${name}/name`,
            isAdmin: false,
            password: req.body.password,
            phone: req.body.phone
        };

        return user;
    }

}
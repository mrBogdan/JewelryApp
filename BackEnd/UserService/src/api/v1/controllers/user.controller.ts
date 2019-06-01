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

        this.validateUser(req);

        this.userService.isEmailRegistered(req.body.email)
            .then((isRegistered: boolean) => {
                if (isRegistered) {
                    throw new Error('User with this email has been registered!');
                }

                uploadToStorageService(imagePath)
                    .then((filePath: string) => {
                        const { name } = path.parse(filePath);
                        console.log('FILE: ', name);

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
                        this.userService.create(user)
                            .then((user: any) => {
                                res.send(user);
                            })
                            .catch(next);
                    });
            })
            .catch(next);

    }

    public signin(req: Request, res: Response, next: NextFunction) {
        const email: string = req.body.email;
        const password: string = req.body.password;

        return this.userService.getUserByEmailAndPassword(email, password)
            .catch(next);
    }

    public logout(req: Request, res: Response) {
        if (req.session.user) {
            delete req.session.user;
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
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

        console.log(validator(validatorParams));
    }

}
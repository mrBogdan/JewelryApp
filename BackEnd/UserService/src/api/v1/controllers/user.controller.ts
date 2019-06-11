import { Request, Response, NextFunction } from 'express';
import { uploadToStorageService, UserService } from '../../../services';
import { ISignupRequest } from '../../../interfaces/api/ISignupRequest';
import { IUser } from '../../../interfaces/models/IUser';
import { DEFAULT } from '../../../consts';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';
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
        console.log('BODY', req.body);
        console.log('BODY', req.file);

        if (req.file) {
            imagePath = req.file.path;
        }

        const validatedUser = this.validateUser(req);
        if (validatedUser.length) {
            res.status(400).send(validatedUser);
            return;
        }

        this.userService.isEmailRegistered(req.body.email)
            .then(() => uploadToStorageService(imagePath))
            .then((filePath: string) =>
                this.userService.create(this.getUserFromReq(req, filePath)))
            .then((user: any) => {
                res.send(user);
            })
            .catch(next);

    }

    public signin(req: Request, res: Response, next: NextFunction) {
        const email: string = req.body.email;
        const password: string = req.body.password;

        const validatedEmail = this.validateEmail(email);

        if (validatedEmail.length) {
            res.status(400).send(validatedEmail);
            return;
        }

        return this.userService.userLogin(email, password)
            .then((token: any) => res.send(token))
            .catch(next);
    }

    public logout(req: Request, res: Response, next: NextFunction) {
        console.log('DECODED: ', req['decoded']);
        res.sendStatus(200);
    }

    public refreshToken(req: Request, res: Response, next: NextFunction) {
        let token = req.headers['authorization'];
        const refreshToken = req.body.refreshToken;

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        const decoded = jwt.decode(token);
        this.userService.refreshToken(decoded.idUser, refreshToken)
            .then((data: any) => res.send(data))
            .catch(next);
    }

    public getUserFromToken(req: any, res: any, next: any) {
        const userId = req.decoded.idUser;

        return this.userService.getUserById(userId)
            .then(data => res.send(data))
            .catch(next);
    }

    public getUser(req: any, res: any, next: any) {
        try {
            console.log('CED', req.decoded);
            const userId = req.decoded.idUser;
            console.log('11111 ', userId);

            return this.userService.getUserById(userId)
                .then(data => res.send(data))
                .catch(next);
        } catch (e) {
            next(e);
        }
    }

    private validateEmail(email: string) {
        const validateParams: IValidatorProperty[] = [
            {
                field: {
                    fieldName: 'email',
                    value: email,
                    rules: [
                        checkEmail
                    ]
                }
            }
        ];

        return validator(validateParams);
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

    private getUserFromReq(req: ISignupRequest, filePath: string): IUser {
        const { name } = path.parse(filePath);

        return {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            email: req.body.email,
            imageUrl: `${config.get('services:StorageService')}/api/v1/${name}`,
            isAdmin: false,
            password: req.body.password,
            phone: req.body.phone
        };
    }

}

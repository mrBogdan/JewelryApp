import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../../services';
import { ISignupRequest } from '../../../interfaces/api/ISignupRequest';
import * as multiparty from 'multiparty';
import * as request from 'request';
import { ISignupUser } from '../../../interfaces/models/ISignupUser';
import { IUser } from '../../../interfaces/models/IUser';
import { createRequest } from '../../../modules/utils';
import logger from '../../../modules/logger';

const config = require('../../../../config');

export class UserController {
    private readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public signup(req: ISignupRequest, res: Response, next: NextFunction) {
        const form = new multiparty.Form();
        form.on('part', (part: any) => {
            request.post(`${config.get('services:StorageService')}/api/v1/upload`, {
                form: {
                    file: part
                }
            });
        });

        form.parse(req);
        res.sendStatus(200);
        /*const user: IUser = {
            firstName: body.firstName,
            lastName: body.lastName,
            address: body.address,
            email: body.email,
            imageUrl: ,
            isAdmin: false,
            password: body.password,
            phone: body.phone
        };

        this.userService.create(user)
            .catch(next);*/
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

}
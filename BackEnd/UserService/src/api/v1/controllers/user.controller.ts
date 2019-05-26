import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../../services';
import { IUser } from '../../../interfaces/models/IUser';

export class UserController {
    private readonly userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public signup(req: Request, res: Response, next: NextFunction) {
        const user: IUser = {
            firstName: req.
        };

        this.userService.signup()
            .catch(next);
    }

    public signin(req: Request, res: Response, next: NextFunction) {
        return this.userService.signin()
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
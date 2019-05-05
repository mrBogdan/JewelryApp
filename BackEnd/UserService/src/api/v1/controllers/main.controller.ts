import { Request, Response } from 'express';

export class MainController {
    public get(req: Request, res: Response) {
        res.send('OK');
    }
}
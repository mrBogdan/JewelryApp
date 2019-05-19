import { Request, Response } from 'express';
import db from '../../../modules/db';

export class CategoryController {
    public async get(req: Request, res: Response, next) {
        try {
            const pool = await db;
            const result: any = await pool.request()
                .query('select * from JCategory');

            res.send(result);
        } catch (e) {
            next(e)
        }

    }
}
import { NextFunction, Request, Response } from 'express';
import db from '../../../modules/db';

export class ProductController {
    public async get(req: Request, res: Response, next: NextFunction) {
        try {
            const pool = await db;
            const result: any = await pool.request()
                .query('SELECT * FROM JProduct');

            res.send({
                count: result.recordsets[0].length,
                data: result.recordsets[0]
            });
        } catch (e) {
            next(e);
        }

    }
}
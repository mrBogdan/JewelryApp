import { NextFunction, Request, Response } from 'express';
import db from '../../../modules/db';

export class OrderController {
    public async get(req: Request, res: Response, next: NextFunction) {
        res.send('OK');
    }
    public async create(req: Request, res: Response, next: NextFunction) {
        const user = req.body.user;
        const products = req.body.products;
        // firstName: this.firstName,
        //     lastName: this.lastName,
        //     email: this.email,
        //     address: this.address,
        //     phone: this.phone

        const pool = await db;
        const result = await pool.request()
            .query(`INSERT INTO JOrder 
            (${user.id ? 'idUser,' : ''} firstName, lastName, email, phone, deliveryAddress, products, price)
            VALUES(${user.id ? 'idUser,' : ''} ${user.firstName}, ${user.lastName}, ${user.email}, ${user.address}, ${user.phone})
            `);
    }

    public update(req: Request, res: Response, next: NextFunction) {

    }

    public delete(req: Request, res: Response, next: NextFunction) {

    }
}
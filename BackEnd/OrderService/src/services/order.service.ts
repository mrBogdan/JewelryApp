import { NextFunction, Request, Response } from 'express';
import db from '../modules/db';
import * as sql from 'mssql';

export class OrderService {
    public async get() {
        const pool = await db;
        const result = await pool.request()
            .query(`SELECT * FROM JOrders`);

        return result.recordsets[0];
    }

    public async getById(id: number) {
        const pool = await db;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(`SELECT * FROM JOrders WHERE idOrder = @id`);

        return result.recordset[0];
    }

    public async getByEmail(email: string) {
        const pool = await db;
        const result = await pool.request()
            .input('email', sql.NVarChar(50), email)
            .query(`SELECT * FROM JOrders WHERE email = @email`);

        return result.recordsets[0];
    }

    public async create(user: any, price: number, products: string) {
        const pool = await db;
        const result = await pool.request()
            .query(`INSERT INTO JOrders 
            (${user.id ? 'idUser,' : ''} firstName, lastName, email, phone, deliveryAddress, products, price)
            VALUES(${user.id ? `'${user.id}'` : ''} '${user.firstName}', '${user.lastName}', '${user.email}', '${user.phone}', '${user.address}', '${products}', ${price})
            `);

        return result.rowsAffected;
    }

    public update(req: Request, res: Response, next: NextFunction) {

    }

    public async delete(id) {
        const pool = await db;
        return await pool.request()
            .query(`DELETE FROM JOrders WHERE idOrder = ${id}`)

    }
}
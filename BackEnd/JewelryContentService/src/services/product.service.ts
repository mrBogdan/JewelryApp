import * as sql from 'mssql';
import db from '../modules/db';
import { HttpError } from '../modules/errors/http.error';
import logger from '../modules/logger';

export class ProductService {
    public async getAll() {
        try {
            const pool = await db;
            const result: any = await pool.request()
                .query('SELECT * FROM JProduct');

            return {
                count: result.recordsets[0].length,
                data: result.recordsets[0]
            };
        } catch (e) {
            logger.error(e);
            throw new HttpError(500, 'Server error');
        }
    }

    public async getById(id: string) {
        let result: any = null;
        try {
            const pool = await db;
            result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM JProduct WHERE idProduct = @id');
        } catch (e) {
            logger.error(e);
            throw new HttpError(500, 'Server error');
        }

        if (!result.recordset.length) {
            throw new HttpError(404, 'Product not found');
        }

        return {
            data: result.recordset[0]
        };

    }

    public async getByCategoryId(id: string) {
        try {
            const pool = await db;
            const result: any = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM JProduct WHERE idCategory = @id');

            return {
                count: result.recordsets[0].length,
                data: result.recordsets[0]
            };
        } catch (e) {
            logger.error(e);
            throw new HttpError(500, 'Server error');
        }
    }

    public async getByIds(ids: number[]) {
        try {
            const productIds = ids.join(',');
            const pool = await db;
            const result: any = await pool.request()
                .query(`SELECT * FROM JProduct WHERE idProduct IN (${productIds}) AND isActive = 1`);

            return {
                count: result.recordsets[0].length,
                data: result.recordsets[0]
            };
        } catch (e) {
            logger.error(e);
            throw new HttpError(500, 'Server error');
        }
    }
}
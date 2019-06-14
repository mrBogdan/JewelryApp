import * as sql from 'mssql';
import db from '../modules/db';
import { HttpError } from '../modules/errors/http.error';
import logger from '../modules/logger';

export class ProductService {
    public async getAll(top: any = 8, offset: any = 0) {
        try {
            const topValue: number = parseInt(top);
            const offsetValue = parseInt(offset);

            const pool = await db;
            const result: any = await pool.request()
                .query(`SELECT * 
                FROM JProduct 
                WHERE isActive = 1
                ORDER BY idProduct ASC
                OFFSET ${offsetValue} ROWS
                FETCH NEXT ${topValue} ROWS ONLY`);

            const count = await pool.request()
                .query('SELECT COUNT(*) FROM JProduct WHERE isActive = 1');
            
            return {
                count: count.recordset[0][''],
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

    public async deleteById(id: number) {
        try {
            const pool = await db;
            const result: any = await pool.request()
                .input('id', sql.Int, id)
                .query(`DELETE FROM JProduct WHERE idProduct = @id`);

            return {
                result
            };
        } catch (e) {
            logger.error(e);
            throw new HttpError(500, 'Server error');
        }
    }

    public async create(product: any) {
        try {
            const pool = await db;
            const result: any = await pool.request()
                .input('name', sql.NVarChar(50), product.productName)
                .input('productDescr', sql.NVarChar(50), product.productDescr)
                .input('imagePath', sql.NVarChar(255), product.imagePath)
                .input('idCategory', sql.Int, product.idCategory)
                .input('price', sql.Float, product.price)
                .query(`INSERT INTO JProduct (productName, productDescr, imagePath, idCategory, price)
                VALUES (@name, @productDescr, @imagePath, @idCategory, @price)`);

            return {
                result
            };
        } catch (e) {
            logger.error(e);
            throw new HttpError(500, 'Server error');
        }
    }
}
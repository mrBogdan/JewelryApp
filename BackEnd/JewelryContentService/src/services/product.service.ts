import sql from 'mssql';
import db from '../modules/db';

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
            throw new e;
        }
    }

    public async getById(id: string) {
        try {
            const pool = await db;
            const result: any = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM JProduct WHERE idProduct = @id');

            return {
                data: result.recordset[0]
            };
        } catch (e) {
            Promise.reject(e);
        }
    }
}
import db from '../modules/db';
import * as sqlstring from 'sqlstring';
import { HttpError } from '../modules/errors/http.error';
import logger from '../modules/logger';

export class SearchService {
    public async search(searchPhrase) {
        let result = null;

        console.log('SS', searchPhrase);

        try {
            const pool = await db;
            result = await pool.request()
                .query(`SELECT * FROM JProduct 
                WHERE isActive = 1 AND (productDescr LIKE '%${searchPhrase}%' OR productName LIKE '%${searchPhrase}%')`);

        } catch (e) {
            logger.error(e);
            throw new HttpError(500, 'Server error');
        }

        return {
            count: result.recordsets[0].length || 0,
            data: result.recordsets[0] || []
        };

    }
}
import dbPromise from '../modules/db';
import * as sql from 'mssql';
import { HttpError } from '../modules/errors/http.error';

export class UploadService {
    public async create(filePath: string, fileName: string, mimeType: string, nvFileExt: string) {
        const pool = await dbPromise;
        return pool.request()
            .input('nvFilePath', sql.NVarChar(sql.MAX), filePath)
            .input('nvFileName', sql.NVarChar(255), fileName)
            .input('nvMimeType', sql.NVarChar(50), mimeType)
            .input('nvFileExt', sql.NVarChar(50), nvFileExt)
            .query(`INSERT INTO JFile 
            (nvFilePath, nvFileName, nvMimeType, nvFileExt) 
            VALUES (@nvFilePath, @nvFileName, @nvMimeType, @nvFileExt)
            SElECT * FROM JFile WHERE idFile = @@identity`);
    }

    public async get(fileName: string) {
        const pool = await dbPromise;
        const fileEntity = await pool.request()
            .input('nvFileName', sql.NVarChar(sql.MAX), fileName)
            .query(`SELECT * FROM JFile WHERE nvFileName = @nvFileName`);

        if (!fileEntity.recordset.length) {
            throw new HttpError(404, 'File not found');
        }

        return fileEntity.recordset.pop();
    }
}
import dbPromise from '../modules/db';
import * as sql from 'mssql';

export class UploadService {
    public async create(filePath: string, fileName: string, mimeType: string) {
        const pool = await dbPromise;
        return pool.request()
            .input('nvFilePath', sql.NVarChar(sql.MAX), filePath)
            .input('nvFileName', sql.NVarChar(255), fileName)
            .input('nvMimeType', sql.NVarChar(50), mimeType)
            .query(`INSERT INTO JFile 
            (nvFilePath, nvFileName, nvMimeType) 
            VALUES (@nvFilePath, @nvFileName, @nvMimeType)
            SElECT * FROM JFile WHERE idFile = @@identity`);
    }
}
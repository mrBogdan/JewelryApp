import * as multer from 'multer';
import { Request } from 'express';
import * as fs from 'fs';

const config = require('../../../config/index');


const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, callback: any) => {
        const tmpDir = config.get('tmpDir');

        fs.access(tmpDir, (err: any) => {
            if (err) {
                fs.mkdirSync(tmpDir);
            }

            callback(null, tmpDir);
        });
    },
    filename(req: Express.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void): void {
        callback(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage
});

export {
    upload
}

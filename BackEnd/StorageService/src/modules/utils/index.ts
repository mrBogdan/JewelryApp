import * as multer from 'multer';
import { Request } from 'express';

const config = require('../../../config');

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, callback: any) => {
        callback(null, config.get('uploadDir'));
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

export class Utils {}

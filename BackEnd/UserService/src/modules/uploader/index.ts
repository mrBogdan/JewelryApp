import * as multer from 'multer';
import { Request } from 'express';
import { storageStream } from './StorageStream';
const config = require('../../../config/index');

const storage = storageStream({
    destination: (req: Request, file: Express.Multer.File, callback: any) => {
        callback(null, `${config.get('services:StorageService')}/api/v1/upload`);
    },
});

const upload = multer({
    storage
});

export {
    upload
}

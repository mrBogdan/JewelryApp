import { Request, Response, NextFunction } from 'express';
import { UploadService } from '../../../services/upload.service';
import { upload } from '../../../modules/utils';
import logger from '../../../modules/logger';

const uploadService = new UploadService();

export class UploadController {
    public uploadAndSaveFile(req: Request, res: Response, next: NextFunction) {
        upload.single('file')(req, res, (err: any) => {
           if (err) {
               console.error(err);
               return;
           }
        });

        if (!req.file) {
            res.sendStatus(400);
            console.log('not');
            return;
        }

        const filePath = req.file.path;
        const fileName = req.file.filename;
        const mimeType = req.file.mimetype;

        uploadService.create(filePath, fileName, mimeType)
            .then((fileModel: any) => res.send(fileModel.recordset))
            .catch(next);
    }
}
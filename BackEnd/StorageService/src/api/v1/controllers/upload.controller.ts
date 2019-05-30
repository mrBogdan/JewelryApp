import { Request, Response, NextFunction } from 'express';
import { UploadService } from '../../../services/upload.service';
import * as path from 'path';

const uploadService = new UploadService();

export class UploadController {
    public uploadAndSaveFile(req: Request, res: Response, next: NextFunction) {
        if (!req.file) {
            res.sendStatus(400);
            console.log('not');
            return;
        }
        const { name, ext } = path.parse(req.file.filename);
        const filePath = req.file.path;
        const mimeType = req.file.mimetype;

        uploadService.create(filePath, name, mimeType, ext)
            .then((fileModel: any) => res.send(fileModel.recordset.shift()))
            .catch(next);
    }
}
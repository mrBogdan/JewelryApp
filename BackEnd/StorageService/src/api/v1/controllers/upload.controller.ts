import { Request, Response, NextFunction } from 'express';
import { UploadService } from '../../../services/upload.service';
import * as path from 'path';
import { IFileServiceResponse } from '../../../interfaces/api/IFileServiceResponse';

const uploadService = new UploadService();

export class UploadController {
    public uploadAndSaveFile(req: Request, res: Response, next: NextFunction) {
        if (!req.file) {
            res.sendStatus(400);
            return;
        }
        const { name, ext } = path.parse(req.file.filename);
        const filePath = req.file.path;
        const mimeType = req.file.mimetype;

        uploadService.create(filePath, name, mimeType, ext)
            .then((fileModel: { recordset: IFileServiceResponse[] }) => res.send(fileModel.recordset.shift()))
            .catch(next);
    }
}
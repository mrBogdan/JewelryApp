import { createReadStream, unlink } from 'fs';
import { createRequest, toUpload } from '../modules/utils';
import { IFileServiceResponse } from '../interfaces/api/IFileServiceResponse';
import logger from '../modules/logger';

const config = require('../../config');

export function uploadToStorageService(filePath: string): Promise<string> {

    if (toUpload(filePath)) {
        return createRequest(`${config.get('services:StorageService')}/api/v1/upload`, 'POST', {
            formData: {
                file: createReadStream(filePath)
            }
        })
            .then((fileInfoJson: string) => {
                const fileInfo: IFileServiceResponse = JSON.parse(fileInfoJson);
                return fileInfo.nvFileName;
            })
            .catch((err: any) => {
                throw err;
            })
            .finally(() => {
                unlink(filePath, (err: any) => {
                    if (err) {
                        logger.error(err);
                        throw err;
                    }

                    logger.info('File was cleaned');
                });
            });
    }

    return Promise.resolve(filePath);

}
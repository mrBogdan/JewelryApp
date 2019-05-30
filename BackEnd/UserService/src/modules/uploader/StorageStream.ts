import * as fs from 'fs';
import * as request from 'request';
import logger from '../logger';

const config = require('../../../config');

function getDestination(req, file, cb) {
    cb(null, '/dev/null');
}

function StorageStream(opts) {
    this.getDestination = (opts.destination || getDestination);
}

StorageStream.prototype._handleFile = function _handleFile(req, file, cb) {
    this.getDestination(req, file, function (err, path) {
        if (err) return cb(err);
        
        console.log(file.stream);
        /*
        request.post({
            url: `${config.get('services:StorageService')}/api/v1/upload`,
            formData: {
                file: file.stream,
            }
        }, (err: any, res: any, body: any) => {
            if (err) {
                logger.error(err);
                return;
            }
            
            console.log(body);
        })*/
    });
};

StorageStream.prototype._removeFile = function _removeFile(req, file, cb) {
    fs.unlink(file.path, cb);
};

export function storageStream(opts) {
    return new StorageStream(opts);
}
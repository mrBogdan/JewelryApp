import * as request from 'request';
import * as Url from 'url';
import { IFileServiceResponse } from '../../interfaces/api/IFileServiceResponse';
import { DEFAULT } from '../../consts';

export class Utils {}

/*
export function createRequest(url: string, method: string, data: any = null, options: Object = {}) {
    return new Promise((resolve, reject) => {
        const { port, hostname, path } = Url.parse(url);

        const defaultOptions = {
            path,
            port,
            hostname,
            method
        };
        const extendedOptions = { ...defaultOptions, ...options };
        let resData = null;
        const req = request(url, extendedOptions, (res: any) => {
            res.setEncoding('utf8');

            res.on('data', (d: any) => {
                resData += d;
            });

            res.on('end', () => {
                resolve(resData);
            })
        });

        req.on('error', (e: any) => {
            reject(e);
        });

        req.write(data);
        req.end();
    });
}*/

export function createRequest(url, method, option): Promise<string> {
    return new Promise((resolve, reject) => {
        const extendedOptions = {...option, method};
        request(url, extendedOptions, (err: any, res: any, body: any) => {
            if (err) {
                reject(err);
            }

            resolve(body);
        })
    });
}

export function toUpload(filePath: string): boolean {
    const not = [
        DEFAULT
    ];

    return !not.includes(filePath);
}
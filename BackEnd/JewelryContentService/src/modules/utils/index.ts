import * as request from 'request';
import { DEFAULT } from '../../consts';

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
import * as jwt from 'jsonwebtoken';

export function sign(payload, secret, options) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, function (err, token) {
            if (err) {
                reject(err);
            }

            resolve(token);
        });
    })
}
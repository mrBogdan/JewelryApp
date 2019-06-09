import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export function hash(password: string) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) {
                reject(err);
                return;
            }

            resolve(hash);
        })
    });
}

export async function compare(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
}
import { HttpError } from '../errors/http.error';
import * as jwt from 'jsonwebtoken';

const config = require('../../../config');

export default (req: any, res: any, next: any) => {
    let token: string | any = req.headers['authorization'];
    
    if (!token) {
        throw new HttpError(403, 'Forbidden');
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    jwt.verify(token, config.get('secret'), (err, decoded) => {
        if (err) {
            console.log('Error', err);
            next(new HttpError(401, 'Unauthorized'));
        } else {
            console.log('DEC', decoded);
            req['decoded'] = decoded;

            next();
        }
    });
}
import { Request, Response, NextFunction } from 'express';
import logger from '../logger';
import { HttpError } from '../errors/http.error';

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HttpError) {
        res.status(err.status).send(err.message);
    } else {
        logger.error(err);
        res.status(500).send(err.message || 'Something went wrong');
    }
}
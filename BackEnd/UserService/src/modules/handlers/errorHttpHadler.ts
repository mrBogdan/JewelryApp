import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
    logger.error(err);
    res.status(500).send(err.message || 'Something went wrong');
}
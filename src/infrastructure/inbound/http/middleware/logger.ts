import { Request, Response, NextFunction } from 'express';
// TODO: make this logger a singleton and inject it into the express app and other classes that need it
import logger from '../../../../infrastructure/outbound/loggers/winston/logger';

// Simple middleware to log all requests
export function LogRequestsMiddleware(req: Request, res: Response, next: NextFunction) {
    logger.info(`${req.method} ${req.url}`);
    next();
}
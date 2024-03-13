import { Request, Response, NextFunction } from 'express';
// Wraps async functions and ensure that next is called with any errors
export default function asyncErrorHandler(fn: Function) {
    return function (req: Request, res: Response, next: NextFunction) {
        return Promise.resolve(fn(req, res, next)).catch(next);
    };
}

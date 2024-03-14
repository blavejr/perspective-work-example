import { Request, Response, NextFunction } from 'express';
import ApplicationValidationError from '../../../../domain/errors/validationError.error';
import { ValidationError } from 'yup';
import { MongoServerError } from 'mongodb';

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err);

    let statusCode = 500;
    let errorMessage: string | Array<String> = 'Internal Server Error';
    console.log(typeof err);
    console.log((err instanceof MongoServerError));
    
    
    if (err instanceof ValidationError) {
        statusCode = 400;
        errorMessage = err.errors;
    }else if (err instanceof ApplicationValidationError) {
        statusCode = 400;
        errorMessage = err.message.split(', ');
    }else if (err instanceof MongoServerError) {
        statusCode = 500;
        errorMessage = err.message;
        // console.log(err);
        // console.log(err.code);
        
        if (err.code === 11000){
            statusCode = 409
            errorMessage = 'Duplicated key error';
        }
    }

    res.status(statusCode).json({ error: errorMessage });
}

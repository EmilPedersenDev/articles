import { NextFunction, Request, Response } from 'express';
import { ErrorException } from '../helpers/types';

export default function (err: ErrorException, req: Request, res: Response, next: NextFunction) {
  err.statusCode = err.statusCode || 500;
  err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else if (process.env.NODE_ENV === 'production') {
    // Operationel error that we trust, can send to client
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      // Programming or unknown error. Ex. from vendor
      // Don't leak to much info
      console.error('ERROR', err);

      res.status(500).json({
        status: 'error',
        message: 'Something went worng!',
      });
    }
  }
}

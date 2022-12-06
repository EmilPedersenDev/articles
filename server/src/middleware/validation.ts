import { validationResult } from 'express-validator';

import { NextFunction, Request, Response } from 'express';
import AppError from '../helpers/app-error';

export const validation = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  next(new AppError(errors.array()[0].msg, 422));
};

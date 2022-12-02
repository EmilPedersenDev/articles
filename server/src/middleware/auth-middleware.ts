import { NextFunction, Request, Response } from 'express';
import AppError from '../helpers/app-error';
import { clearCookies, createNewAccessToken, verifyJwt } from '../services/auth-service';

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
  let accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return next(new AppError('No refresh token provided', 401));
  }

  if (!accessToken) {
    try {
      const newAccessToken = await createNewAccessToken(req, res, next);
      accessToken = newAccessToken;
    } catch (error) {
      clearCookies(res);
      next(new AppError('Unauthorized', 401));
    }
  }

  try {
    verifyJwt(refreshToken);
    verifyJwt(accessToken);
    return next();
  } catch (error) {
    next(error);
  }
};

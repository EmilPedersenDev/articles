import { NextFunction, Request, Response } from 'express';
import AppError from '../helpers/app-error';
import { clearCookies, createNewAccessToken, verifyJwt } from '../services/auth-service';

interface CustomRequest extends Request {
  user: any;
}

export const authorize = async (req: CustomRequest, res: Response, next: NextFunction) => {
  let accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return next(new AppError('Unauthorized', 401));
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
    const verifiedAccessToken = verifyJwt(accessToken);
    req.user = verifiedAccessToken;
    return next();
  } catch (error) {
    next(error);
  }
};

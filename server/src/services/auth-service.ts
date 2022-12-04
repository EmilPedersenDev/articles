import { NextFunction, Request, Response } from 'express';
import AppError from '../helpers/app-error';
import { accessTokenCookieOptions, accessTokenExpiration, refreshTokenExpiration } from '../helpers/constants';

const jwt = require('jsonwebtoken');

export const signJwt = (payload, expiration) => {
  const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiration,
  });

  return jwtToken;
};

export const verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const verifyRefreshToken = async (req: Request, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return next(new AppError('No refresh token provided', 401));
  }

  try {
    const verifiedRefreshToken = verifyJwt(refreshToken);
    return verifiedRefreshToken;
  } catch (error) {
    next(error);
  }
};

export const createNewAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const verifiedRefreshToken = await verifyRefreshToken(req, next);
    const { id } = verifiedRefreshToken;
    const accessToken = signJwt({ id: id }, accessTokenExpiration.toString());
    accessTokenCookie(res, accessToken);
  } catch (error) {
    next(error);
  }
};

export const accessTokenCookie = (res: Response, accessToken) => {
  res.cookie('accessToken', accessToken, {
    maxAge: accessTokenExpiration,
    httpOnly: true,
    domain: process.env.COOKIE_DOMAIN,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
};
export const refreshTokenCookie = (res: Response, refreshToken) => {
  res.cookie('refreshToken', refreshToken, {
    maxAge: refreshTokenExpiration,
    httpOnly: true,
    domain: process.env.COOKIE_DOMAIN,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
};

export const createUserAuthTokens = (userId: number, res: Response) => {
  // Sign the jwt
  const accessToken = signJwt({ id: userId }, accessTokenExpiration.toString());
  const refreshToken = signJwt({ id: userId }, refreshTokenExpiration.toString());

  // Return the tokens in a secure http cookie
  accessTokenCookie(res, accessToken);
  refreshTokenCookie(res, refreshToken);
};

export const createAccessToken = (id) => {
  const accessToken = signJwt({ id: id }, accessTokenExpiration.toString());
  return accessToken;
};
export const createRefreshToken = (id) => {
  const refreshToken = signJwt({ id: id }, accessTokenExpiration.toString());
  return refreshToken;
};

export const clearCookies = (res: Response) => {
  return res.clearCookie('accessToken').clearCookie('refreshToken');
};

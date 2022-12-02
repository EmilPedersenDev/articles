import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import AppError from '../helpers/app-error';
import { accessTokenCookie, refreshTokenCookie, signJwt } from '../services/auth-service';
import { accessTokenExpiration, refreshTokenExpiration } from '../helpers/constants';
const prisma = new PrismaClient();

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    next(new AppError('Please provide email, password and name', 400));
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new AppError('User already exists', 400);
    }

    const encryptedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: encryptedPassword,
        name: name,
      },
    });

    // Sign the jwt
    const accessToken = signJwt({ id: newUser.id }, accessTokenExpiration.toString());
    const refreshToken = signJwt({ id: newUser.id }, refreshTokenExpiration.toString());

    // Return the tokens in a secure http cookie
    accessTokenCookie(res, accessToken);
    refreshTokenCookie(res, refreshToken);

    res.status(201).json({
      status: 'success',
      data: {
        user: {
          email: newUser.email,
          name: newUser.name,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

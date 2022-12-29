import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import AppError from '../helpers/app-error';
import { User } from '../helpers/types/user-types';
import { CustomRequest } from '../helpers/types/auth-types';
import { clearCookies } from '../services/auth-service';
const prisma = new PrismaClient();

export const getUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { id } = req.user;

  if (!id) {
    return next(new AppError('No id found', 404));
  }

  try {
    const [user]: Array<User> = await prisma.$queryRaw`SELECT "id", "name", "email" FROM "User" WHERE id=${parseInt(
      id
    )}`;

    if (!user) {
      throw new AppError('Unauthorized', 401);
    }

    res.status(200).json(user);
  } catch (error: any) {
    clearCookies(res);
    next(error);
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers: Array<User> = await prisma.$queryRaw`SELECT * from "User"`;

    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

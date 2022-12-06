import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import AppError from '../helpers/app-error';
import { User } from '../helpers/types/user-types';
const prisma = new PrismaClient();

interface CustomRequest extends Request {
  user: any;
}

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
      throw new AppError('No user found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers: Array<User> = await prisma.$queryRaw`SELECT * from "User"`;

    res.status(200).json({
      status: 'success',
      data: {
        allUsers,
      },
    });
  } catch (error) {
    next(error);
  }
};

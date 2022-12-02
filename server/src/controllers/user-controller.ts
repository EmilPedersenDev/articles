import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import AppError from '../helpers/app-error';
const prisma = new PrismaClient();

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req?.params;

  if (!id) {
    return next(new AppError('No user found', 404));
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    // const user = await prisma.$queryRaw`SELECT * FROM User`;

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
    if (!id) {
      throw new AppError('No user found', 404);
    }
  } catch (error: any) {
    next(error);
  }
};

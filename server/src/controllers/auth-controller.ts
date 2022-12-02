import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { clearCookies, createUserAuthTokens } from '../services/auth-service';
import { SignUp, Login } from '../helpers/types/auth-types';
import { User } from '../helpers/types/user-types';
import { Password } from '../helpers/types';
import bcrypt from 'bcrypt';
import AppError from '../helpers/app-error';
const prisma = new PrismaClient();

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name }: SignUp = req.body;

  if (!email || !password || !name) {
    return next(new AppError('Please provide email, password and name', 400));
  }

  try {
    const existingUser: User = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new AppError('User already exists', 400);
    }

    const encryptedPassword: Password = await bcrypt.hash(password, 12);

    const newUser: User = await prisma.user.create({
      data: {
        email: email,
        password: encryptedPassword,
        name: name,
      },
    });
    createUserAuthTokens(newUser.id, res);

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

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { password, email }: Login = req.body;

  if (!password || !email) {
    return next(new AppError('No password or email found', 400));
  }

  try {
    const [user]: Array<User> = await prisma.$queryRaw`SELECT * FROM "User" WHERE email=${email}`;

    if (!user) {
      throw new AppError('No user found', 404);
    }

    const passwordMatch: boolean = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Password invalid', 401);
    }

    createUserAuthTokens(user.id, res);

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response) => {
  clearCookies(res);
  res.sendStatus(204);
};

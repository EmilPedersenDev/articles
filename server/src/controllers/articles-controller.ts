import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response }  from 'express';
import AppError from '../helpers/app-error';
import { Article } from '../helpers/types/article-types';
import { User } from '../helpers/types/user-types';
import { CustomRequest } from '../helpers/types/auth-types';
const prisma = new PrismaClient();

export const getAllArticles = async (req: Request, res: Response, next: NextFunction ) => {
  try {
    const articles: Article[] = await prisma.$queryRaw`SELECT * FROM "Article"`;
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};

export const getArticlesByUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { id } = req.user;

  if (!id) {
    return next(new AppError('No id provided', 400));
  }
  try {
    const user: User = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        articles: true,
      },
    });
  
    if (!user || !user.articles) {
      throw new AppError('No User or articles found', 500)
    }
  
    res.status(201).json(user.articles);
  } catch (error) {
    next(error);
  }
};

export const createArticle = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const newArticlesReq: Article = req.body;
  const { id } = req.user;

  if (!newArticlesReq || Object.keys(newArticlesReq).length === 0) {
    return next(new AppError('No article req found', 400));
  }

  try {
    const article: Article = await prisma.article.create({
      data: {
        title: newArticlesReq.title,
        content: newArticlesReq.content,
        published: newArticlesReq.published,
        userId: id,
      },
    });

    if (!article) {
      throw new AppError('No article was created', 500);
    }

    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
};

export const deleteArticle = async(req: CustomRequest, res: Response, next: NextFunction) => {
  const { id: userId } = req.user;
  const { id: articleId } = req.params;

  if(!userId || !articleId) {
    return next(new AppError('No userId or article id provided', 400))
  }
  
  try {
    await prisma.article.delete({
      where: {
        id: parseInt(articleId) 
      }
    })

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

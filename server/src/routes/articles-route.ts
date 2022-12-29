import { Router } from 'express';
import { createArticle, deleteArticle, getAllArticles, getArticle } from '../controllers/articles-controller';
import { authorize } from '../middleware/auth-middleware';

const articlesRouter = Router();

articlesRouter.route('/').get(authorize, getAllArticles).post(authorize, createArticle);
articlesRouter.route('/:id').get(authorize, getArticle).delete(authorize, deleteArticle);

export default articlesRouter;

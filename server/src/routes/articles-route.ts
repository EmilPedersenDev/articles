import { Router } from 'express';
import { createArticle, deleteArticle, getAllArticles, getArticlesByUser } from '../controllers/articles-controller';
import { authorize } from '../middleware/auth-middleware';

const articlesRouter = Router();

articlesRouter.route('/').get(authorize, getAllArticles).post(authorize, createArticle);
articlesRouter.route('/:id').get(authorize, getArticlesByUser).delete(authorize, deleteArticle)

export default articlesRouter;

import { Router } from 'express';
import { login, logout, signUp } from '../controllers/auth-controller';
import { authorize } from '../middleware/auth-middleware';

const authRouter = Router();

authRouter.route('/signup').post(signUp);
authRouter.route('/login').post(login);
authRouter.route('/logout').get(logout);

export default authRouter;

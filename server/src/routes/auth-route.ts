import { Router } from 'express';
import { login, logout, signUp } from '../controllers/auth-controller';
import { loginValidation, signUpValidation } from '../helpers/validation';
import { authorize } from '../middleware/auth-middleware';
import { validation } from '../middleware/validation';

const authRouter = Router();

authRouter.route('/signup').post(signUpValidation, validation, signUp);
authRouter.route('/login').post(loginValidation, validation, login);
authRouter.route('/logout').get(authorize, logout);

export default authRouter;

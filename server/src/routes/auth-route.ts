import { Router } from 'express';
import { signUp } from '../controllers/auth-controller';

const authRouter = Router();

authRouter.route('/signup').post(signUp);

export default authRouter;

import { Router } from 'express';
import { getUser } from '../controllers/user-controller';
import { authorize } from '../middleware/auth-middleware';

const userRouter = Router();

userRouter.route('/').get(authorize, getUser);

export default userRouter;

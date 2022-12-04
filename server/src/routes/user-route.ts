import { Router } from 'express';
import { getUser, getAllUsers } from '../controllers/user-controller';
import { authorize } from '../middleware/auth-middleware';

const userRouter = Router();

userRouter.route('/:id').get(authorize, getUser);
userRouter.route('/').get(authorize, getAllUsers);

export default userRouter;

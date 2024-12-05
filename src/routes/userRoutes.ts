import { Router } from 'express';
import { addAddress, getAddress } from '../controller/user.Controller';
import authMiddleware from '../middleware/auth.middleware';
const userRouter: Router = Router();

userRouter.post('/address',authMiddleware, addAddress);
userRouter.get('/address', authMiddleware, getAddress)

export default userRouter;

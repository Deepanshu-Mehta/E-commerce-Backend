import { Router } from 'express';
import authRoute from './authRoutes';
import productRouter from './productRoutes';
import userRouter from './userRoutes';
const rootRouter:Router = Router();

rootRouter.use('/auth',authRoute)
rootRouter.use('/product', productRouter);
rootRouter.use('/user', userRouter);

export default rootRouter; 
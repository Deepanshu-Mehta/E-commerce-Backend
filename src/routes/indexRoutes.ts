import { Router } from 'express';
import authRoute from './authRoutes';
import productRouter from './productRoutes';
const rootRouter:Router = Router();

rootRouter.use('/auth',authRoute)
rootRouter.use('/product', productRouter);

export default rootRouter;
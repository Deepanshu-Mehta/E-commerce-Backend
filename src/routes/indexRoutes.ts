import { Router } from 'express';
import authRoute from './authRoutes';
const rootRouter:Router = Router();

rootRouter.use('/auth',authRoute)

export default rootRouter;
import { Router } from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controller/product.Controller';
import authMiddleware from '../middleware/auth.middleware';
import adminMiddleware from '../middleware/admin.middleware';

const productRouter:Router = Router();

productRouter.post('/',authMiddleware, adminMiddleware,createProduct);
productRouter.put('/:id', authMiddleware, adminMiddleware, updateProduct);
productRouter.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);
productRouter.get('/', authMiddleware, adminMiddleware, getProducts);
productRouter.get('/:id', authMiddleware, adminMiddleware, getProductById)


export default productRouter;
import { Router } from 'express';
import { productRoutes } from './routes/product.routes';

export const routes = Router();

routes.use('/products', productRoutes);
import { Router } from 'express';
import { productRoutes } from './routes/product.routes';
import { rawMaterialRoutes } from './routes/rawMaterial.routes';

export const routes = Router();

routes.use('/products', productRoutes);
routes.use('/rawMaterials', rawMaterialRoutes);
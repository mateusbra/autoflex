import { Router } from 'express';
import { productRoutes } from './routes/product.routes';
import { rawMaterialRoutes } from './routes/rawMaterial.routes';
import { productMaterialRoutes } from './routes/productMaterials.routes';

export const routes = Router();

routes.use('/products', productRoutes);
routes.use('/rawMaterials', rawMaterialRoutes);
routes.use('/product-materials', productMaterialRoutes)
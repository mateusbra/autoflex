import { Router } from 'express';
import { ProductMaterialController } from '../controllers/productMaterial.controller';

const router = Router();
const controller = new ProductMaterialController();

router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/', controller.delete);
export { router as productMaterialRoutes };
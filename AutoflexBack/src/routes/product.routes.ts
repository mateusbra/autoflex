import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { ProductMaterialController } from '../controllers/productMaterial.controller';

const router = Router();
const controller = new ProductController();
const productMaterialController = new ProductMaterialController();

router.post('/', controller.create);
router.get('/', controller.list);
router.get('/:code', controller.getByCode);
router.get('/:code/materials',productMaterialController.getMaterials);
router.put('/:code', controller.updateByCode);
router.delete('/:code', controller.deleteByCode);
export { router as productRoutes };
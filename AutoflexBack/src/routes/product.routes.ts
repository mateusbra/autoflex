import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

const router = Router();
const controller = new ProductController();

router.post('/', controller.create);
router.get('/', controller.list);
router.delete('/:code', controller.deleteByCode);
export { router as productRoutes };
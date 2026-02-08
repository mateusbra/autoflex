import { Router } from 'express';
import { rawMaterialController } from '../controllers/rawMaterial.controller';

const router = Router();
const controller = new rawMaterialController();

router.post('/', controller.create);
router.get('/', controller.list);
router.get('/:code', controller.getByCode);
router.put('/:code', controller.updateByCode);
router.delete('/:code', controller.deleteByCode);
export { router as rawMaterialRoutes };
import { Request, Response } from 'express';
import { ProductMaterialService } from '../services/productMaterial.service';

const service = new ProductMaterialService();

export class ProductMaterialController {
  async create(req: Request, res: Response) {
    const productMaterial = await service.create(req.body);
    return res.status(201).json(productMaterial);
  }
  async getMaterials(req: Request, res: Response) {
    const code = req.params.code as string;
    const materials = await service.getMaterials(code);
    return res.status(200).json(materials);
  }
  async update(req: Request, res: Response) {
    const materials = await service.update(req.body);
    return res.status(200).json(materials);
  }
  async delete(req: Request, res: Response) {
    await service.delete(req.body);
    return res.status(204).send();
  }
}

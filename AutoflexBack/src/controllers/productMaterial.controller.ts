import { Request, Response } from 'express';
import { ProductMaterialService } from '../services/productMaterial.service';

const service = new ProductMaterialService();

export class ProductMaterialController {
  async create(req: Request, res: Response) {
    const productMaterial = await service.create(req.body);
    return res.status(201).json(productMaterial);
  }
  async list(req: Request, res: Response) {
    const productMaterial = await service.list();
    return res.status(200).json(productMaterial);
  }
}

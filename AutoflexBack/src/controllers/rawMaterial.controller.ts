import { Request, Response } from 'express';
import { rawMaterialService } from '../services/rawMaterial.service';
import { AppError } from '../errors/AppError';
const service = new rawMaterialService();

export class rawMaterialController {
  async create(req: Request, res: Response) {
    const rawMaterial = await service.create(req.body);
    return res.status(201).json(rawMaterial);
  }
  async list(req: Request, res: Response) {
    const rawMaterials = await service.list();
    return res.status(200).json(rawMaterials);
  }
  async deleteByCode(req: Request, res: Response) {
    const code = req.params.code as string;
    await service.deleteByCode(code);
    return res.status(204).send();
  }
  async getByCode(req: Request, res: Response) {
    const code = req.params.code as string;
    const rawMaterial = await service.findByCode(code);
    return res.status(204).json(rawMaterial);
  }
}

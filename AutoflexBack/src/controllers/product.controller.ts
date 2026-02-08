import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

const service = new ProductService();

export class ProductController {
  async create(req: Request, res: Response) {
    const product = await service.create(req.body);
    return res.status(201).json(product);
  }
  async list(req: Request, res: Response) {
    const products = await service.list();
    return res.status(200).json(products);
  }
  async deleteByCode(req: Request, res: Response) {
    const code = req.params.code as string;
    await service.deleteByCode(code);
    return res.status(204).send();
  }
  async getByCode(req: Request, res: Response) {
      const code = req.params.code as string;
      const product = await service.getByCode(code);
      return res.status(200).json(product);
    }
    async updateByCode(req: Request, res: Response) {
      const code = req.params.code as string;
      const updatedProduct = await service.updateByCode(code, req.body);
      return res.status(200).json(updatedProduct);
    }
}

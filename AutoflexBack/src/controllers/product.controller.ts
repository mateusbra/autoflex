import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { AppError } from '../errors/AppError';
const service = new ProductService();

export class ProductController {
  async create(req: Request, res: Response) {
    const product = await service.create(req.body);
    return res.status(201).json({ ...product, price: Number(product.price) });
  }
  async list(req: Request, res: Response) {
    const products = await service.list();
    return res.status(200).json(products);
  }
  async deleteByCode(req: Request, res: Response) {
    const code = req.params.code as string;
    const product = await service.findByCode(code);
    console.log(product);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    await service.deleteByCode(code);
    return res.status(204).send();
  }
}

import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

export class ProductController {
  async create(req: Request, res: Response) {
    const service = new ProductService();
    try {
      const product = await service.create(req.body);
      return res.status(201).json({...product, price: Number(product.price)});
    }
    catch (e: any) {
      console.log(e);
    }
  }
}

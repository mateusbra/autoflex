import { AppError } from '../errors/AppError';
import { ProductRepository } from '../repositories/product.reposiory';

interface CreateProductDTO {
  code: string;
  name: string;
  price: number;
}

const repository = new ProductRepository();

export class ProductService {
  async create(data: CreateProductDTO) {
    const product = await repository.create(data);
    const parsedProduct = { ...product, price: Number(product.price) }
    return parsedProduct;
  }

  async list() {
    const products = await repository.list();
    const parsedProducts = products.map(product => ({
      ...product,
      price: Number(product.price)
    }));
    return parsedProducts;
  }

  async deleteByCode(code: string) {
    const product = await this.findByCode(code);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    await repository.delete(code);
  }

  async findByCode(code: string) {
    const product = await repository.findByCode(code);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    const parsedProduct = { ...product, price: Number(product?.price) };
    return parsedProduct;
  }
}
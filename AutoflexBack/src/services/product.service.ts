import { ProductRepository } from '../repositories/product.reposiory';

interface CreateProductDTO {
  code: string;
  name: string;
  price: number;
}

export class ProductService {
  async create(data: CreateProductDTO) {
    const repository = new ProductRepository();

    return repository.create(data);
  }
}
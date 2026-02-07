import { ProductRepository } from '../repositories/product.reposiory';

interface CreateProductDTO {
  code: string;
  name: string;
  price: number;
}

const repository = new ProductRepository();

export class ProductService {
  async create(data: CreateProductDTO) {
    return repository.create(data);
  }

  async list() {
    return repository.list();
  }

  async deleteByCode(code: string) {
    await repository.delete(code);
  }
  async findByCode(code: string){
    return repository.findByCode(code);
  }
}
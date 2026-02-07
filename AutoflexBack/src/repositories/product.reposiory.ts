import  prisma  from '../lib/prisma';

export class ProductRepository {
  async create(data: any) {
    return prisma.product.create({
      data,
    });
  }
}
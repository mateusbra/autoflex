import prisma from '../lib/prisma';

export class ProductRepository {
  async create(data: any) {
    return prisma.product.create({
      data,
    });
  }
  async list() {
    return prisma.product.findMany();
  }
  async delete(code: string) {
    await prisma.product.delete({ where: { code } });
  }
  async findByCode(code: string) {
    return prisma.product.findUnique({ where: { code } });
  }
}
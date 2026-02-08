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
  async getByCode(code: string) {
    return prisma.product.findUnique({ where: { code } });
  }
  async updateByCode(code: string, name?: string, price?: number) {
    return prisma.product.update({ where: { code }, data: { name, price } });
  }
}
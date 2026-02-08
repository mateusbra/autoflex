import prisma from '../lib/prisma';

export class rawMaterialRepository {
  async create(data: any) {
    return prisma.rawMaterial.create({
      data,
    });
  }
  async list() {
    return prisma.rawMaterial.findMany();
  }
  async delete(code: string) {
    await prisma.rawMaterial.delete({ where: { code } });
  }
  async getByCode(code: string) {
    return prisma.rawMaterial.findUnique({ where: { code } });
  }
  async updateByCode(code: string, name?: string, stock?: number) {
    return prisma.rawMaterial.update({ where: { code }, data: { name, stock } });
  }
}
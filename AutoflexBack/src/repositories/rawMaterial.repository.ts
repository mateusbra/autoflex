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
  async findByCode(code: string) {
    return prisma.rawMaterial.findUnique({ where: { code } });
  }
}
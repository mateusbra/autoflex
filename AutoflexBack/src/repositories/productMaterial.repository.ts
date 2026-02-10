import prisma from '../lib/prisma';

export class ProductMaterialRepository {
    async create(productId: string, rawMaterialId: string, quantity: number) {
        return prisma.productMaterial.create({
            data: { productId, rawMaterialId, quantity }
        });
    }
    async list() {
        return prisma.productMaterial.findMany();
    }
    async getMaterials(productId: string) {
        return prisma.productMaterial.findMany({ where: { productId }, include: { rawMaterial: true } });
    };
    async update(productId: string, rawMaterialId: string, quantity: number) {
        return prisma.productMaterial.update({
            where: {
                productId_rawMaterialId: {
                    productId,
                    rawMaterialId,
                },
            },
            data: {
                quantity,
            },
        });
    };
    async delete(productId: string, rawMaterialId: string) {
        return prisma.productMaterial.delete({
            where: {
                productId_rawMaterialId: {
                    productId,
                    rawMaterialId,
                },
            },
        });
    }
}

import { AppError } from '../errors/AppError';
import { RawMaterialRepository } from '../repositories/rawMaterial.repository';

interface CreaterawMaterialDTO {
  code: string;
  name: string;
  stock: number;
}

const repository = new RawMaterialRepository();

export class rawMaterialService {
  async create(data: CreaterawMaterialDTO) {
    const rawMaterial = await repository.create(data);
    const parsedRawMaterial = { ...rawMaterial, stock: Number(rawMaterial.stock) }
    return parsedRawMaterial;
  }

  async list() {
    const rawMaterials = await repository.list();
    const parsedRawMaterials = rawMaterials.map(rawMaterial => ({
      ...rawMaterial,
      stock: Number(rawMaterial.stock)
    }));
    return parsedRawMaterials;
  }

  async deleteByCode(code: string) {
    const rawMaterial = await this.getByCode(code);
    if (!rawMaterial) {
      throw new AppError('rawMaterial not found', 404);
    }
    await repository.delete(code);
  }

  async getByCode(code: string) {
    const rawMaterial = await repository.getByCode(code);
    if (!rawMaterial) {
      throw new AppError('rawMaterial not found', 404);
    }
    const parsedRawMaterial = { ...rawMaterial, stock: Number(rawMaterial?.stock) };
    return parsedRawMaterial;
  }
  async updateByCode(code: string, data: { name?: string, stock?: number }) {
    const RawMaterial = await repository.getByCode(code);
    if (!RawMaterial) {
      throw new AppError('RawMaterial not found', 404);
    }
    const updatedRawMaterial = await repository.updateByCode(code, data?.name, data?.stock);
    const parsedRawMaterial = { ...updatedRawMaterial, price: Number(updatedRawMaterial?.stock) };
    return parsedRawMaterial;
  }
}
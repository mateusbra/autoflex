import { AppError } from '../errors/AppError';
import { rawMaterialRepository } from '../repositories/rawMaterial.repository';

interface CreaterawMaterialDTO {
  code: string;
  name: string;
  stock: number;
}

const repository = new rawMaterialRepository();

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
    const rawMaterial = await this.findByCode(code);
    if (!rawMaterial) {
      throw new AppError('rawMaterial not found', 404);
    }
    await repository.delete(code);
  }

  async findByCode(code: string) {
    const rawMaterial = await repository.findByCode(code);
    if (!rawMaterial) {
      throw new AppError('rawMaterial not found', 404);
    }
    const parsedRawMaterial = { ...rawMaterial, stock: Number(rawMaterial?.stock) };
    return parsedRawMaterial;
  }
}
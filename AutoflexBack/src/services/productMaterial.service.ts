import { AppError } from '../errors/AppError';
import { ProductRepository } from '../repositories/product.reposiory';
import { ProductMaterialRepository } from '../repositories/productMaterial.repository';
import { RawMaterialRepository } from '../repositories/rawMaterial.repository';

interface CreateProductMaterialDTO {
    productCode: string;
    rawMaterialCode: string;
    quantity: number;
}

const productRepository = new ProductRepository();
const rawMaterialRepository = new RawMaterialRepository();
const repository = new ProductMaterialRepository();



export class ProductMaterialService {
    async create(data: CreateProductMaterialDTO) {
        if (data.quantity <= 0) {
            throw new AppError('Quantity must be greater than zero', 400);
        }
        const product = await productRepository.getByCode(data.productCode);
        if (!product) throw new AppError('Product not found', 404);

        const rawMaterial = await rawMaterialRepository.getByCode(data.rawMaterialCode);
        if (!rawMaterial) throw new AppError('Raw material not found', 404);

        const productMaterial = await repository.create(product.id, rawMaterial.id, data.quantity);
        const parsedMaterialProduct = { ...productMaterial, quantity: Number(productMaterial.quantity) }
        return parsedMaterialProduct;
    }

    async list() {
        const productMaterials = await repository.list();
        const parsedProductMaterial = productMaterials.map(productMaterial => ({
            ...productMaterial,
            quantity: Number(productMaterial.quantity)
        }));
        return parsedProductMaterial;
    }
    async getMaterials(code: string) {
        const product = await productRepository.getByCode(code);
        if (!product) {
            throw new AppError('Product not found', 404);
        }

        const materials = await repository.getMaterials(product.id);

        return materials.map(pm => ({
            code: pm.rawMaterial.code,
            name: pm.rawMaterial.name,
            quantity: pm.quantity,
        }));
    }
}
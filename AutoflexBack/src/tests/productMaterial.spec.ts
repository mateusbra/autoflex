import request from 'supertest';
import app from '../../src/app';

it('should associate raw material to product', async () => {
    await request(app).post('/products').send({
        code: 'P001',
        name: 'Product',
        price: 100,
    });

    await request(app).post('/raw-materials').send({
        code: 'RM001',
        name: 'Steel',
        stock: 50,
    });

    const response = await request(app)
        .post('/product-materials')
        .send({
            productCode: 'P001',
            rawMaterialCode: 'RM001',
            quantity: 5,
        });
    expect(response.status).toBe(201);
    expect(response.body.quantity).toBe(5);
});

it('should return raw materials of product', async () => {
    await request(app).post('/products').send({
        code: 'P001',
        name: 'Product',
        price: 100,
    });

    await request(app).post('/raw-materials').send({
        code: 'RM001',
        name: 'Steel',
        stock: 50,
    });

    await request(app)
        .post('/product-materials')
        .send({
            productCode: 'P001',
            rawMaterialCode: 'RM001',
            quantity: 5,
        });

    const response = await request(app).get('/products/P001/materials');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].code).toBe('RM001');
    expect(response.body[0].quantity).toBe(5);
});

it('should return 404 if product not found', async () => {
    const response = await request(app).get('/products/INVALID/materials');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Product not found');
});

it('should update quantity', async () => {
    await request(app).post('/products').send({
        code: 'P001',
        name: 'Product',
        price: 100,
    });

    await request(app).post('/raw-materials').send({
        code: 'RM001',
        name: 'Steel',
        stock: 50,
    });

    await request(app)
        .post('/product-materials')
        .send({
            productCode: 'P001',
            rawMaterialCode: 'RM001',
            quantity: 5,
        });

    const response = await request(app)
        .put('/product-materials')
        .send({
            productCode: 'P001',
            rawMaterialCode: 'RM001',
            quantity: 10,
        });

    expect(response.status).toBe(200);
    expect(response.body.quantity).toBe(10);
});

it('should return 404 if association not found', async () => {
    const response = await request(app)
        .put('/product-materials')
        .send({
            productCode: 'P001',
            rawMaterialCode: 'RM001',
            quantity: 10,
        });

    expect(response.status).toBe(404);
});

it('should delete product material association', async () => {
    await request(app).post('/products').send({
        code: 'P001',
        name: 'Product',
        price: 100,
    });

    await request(app).post('/raw-materials').send({
        code: 'RM001',
        name: 'Steel',
        stock: 50,
    });

    await request(app).post('/product-materials').send({
        productCode: 'P001',
        rawMaterialCode: 'RM001',
        quantity: 5,
    });

    const response = await request(app)
        .delete('/product-materials')
        .send({
            productCode: 'P001',
            rawMaterialCode: 'RM001',
        });

    expect(response.status).toBe(204);
});

it('should return 404 if association not found', async () => {
    const response = await request(app)
        .delete('/product-materials')
        .send({
            productCode: 'P001',
            rawMaterialCode: 'RM001',
        });

    expect(response.status).toBe(404);
});
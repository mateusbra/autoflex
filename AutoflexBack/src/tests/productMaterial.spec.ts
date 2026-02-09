import request from 'supertest';
import  app  from '../../src/app';

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

import request from 'supertest';
import app from "../app";

describe('Create Product', () => {
  it('should create a product', async () => {
    const response = await request(app)
      .post('/products')
      .send({
        code: 'P001',
        name: 'Product One',
        price: 100,
      });

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.code).toBe('P001');
    expect(response.body.name).toBe('Product One');
    expect(response.body.price).toBe(100);
  });
});

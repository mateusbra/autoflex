import request from 'supertest';
import app from "../app";


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


it('should list products', async () => {
  await request(app).post('/products').send({
    code: 'P001',
    name: 'Product One',
    price: 100,
  });

  await request(app).post('/products').send({
    code: 'P002',
    name: 'Product Two',
    price: 200,
  });

  const response = await request(app).get('/products');

  expect(response.status).toBe(200);
  expect(response.body.length).toBe(2);

  expect(response.body[0]).toHaveProperty('code');
  expect(response.body[0].price).toBe(100);
});

it('should delete product by code', async () => {
  await request(app).post('/products').send({
    code: 'P001',
    name: 'Product One',
    price: 100,
  });

  const response = await request(app)
    .delete('/products/P001');

  expect(response.status).toBe(204);

  const list = await request(app).get('/products');

  expect(list.body.length).toBe(0);
});

it('should delete product by code', async () => {
  await request(app).post('/products').send({
    code: 'P001',
    name: 'Product One',
    price: 100,
  });

  const response = await request(app)
    .delete('/products/P001');

  expect(response.status).toBe(204);

  const list = await request(app).get('/products');

  expect(list.body.length).toBe(0);
});

it('should return 404 when deleting non existing product', async () => {
  const response = await request(app)
    .delete('/products/NOT_FOUND');

  expect(response.status).toBe(404);
  expect(response.body).toEqual({ message: 'Product not found' });
});


it('should return product by code', async () => {
  await request(app).post('/products').send({
    code: 'P001',
    name: 'Product One',
    price: 100,
  });

  const response = await request(app).get('/products/P001');

  expect(response.status).toBe(200);

  expect(response.body).toHaveProperty('id');
  expect(response.body.code).toBe('P001');
  expect(response.body.name).toBe('Product One');
  expect(response.body.price).toBe(100);
});

it('should return 404 if product not found', async () => {
  const response = await request(app).get('/products/INVALID');

  expect(response.status).toBe(404);
  expect(response.body.message).toBe('Product not found');
});

it('should update product by code', async () => {
    await request(app).post('/products').send({
      code: 'P001',
      name: 'Product One',
      price: 100,
    });

    const response = await request(app)
      .put('/products/P001')
      .send({
        name: 'Updated Product',
        price: 150,
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Product');
    expect(response.body.price).toBe(150);
  });

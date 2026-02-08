import request from 'supertest';
import app from "../app";

describe('Create rawMaterial', () => {
  it('should create a rawMaterial', async () => {
    const response = await request(app)
      .post('/rawMaterials')
      .send({
        code: 'RM001',
        name: 'rawMaterial One',
        stock: 10,
      });

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.code).toBe('RM001');
    expect(response.body.name).toBe('rawMaterial One');
    expect(response.body.stock).toBe(10);
  });
});

it('should list rawMaterials', async () => {
  await request(app).post('/rawMaterials').send({
    code: 'RM001',
    name: 'rawMaterial One',
    stock: 10,
  });

  await request(app).post('/rawMaterials').send({
    code: 'RM002',
    name: 'rawMaterial Two',
    stock: 20,
  });

  const response = await request(app).get('/rawMaterials');

  expect(response.status).toBe(200);
  expect(response.body.length).toBe(2);

  expect(response.body[0]).toHaveProperty('code');
  expect(response.body[0].stock).toBe(10);
});

it('should delete rawMaterial by code', async () => {
  await request(app).post('/rawMaterials').send({
    code: 'RM001',
    name: 'rawMaterial One',
    stock: 10,
  });

  const response = await request(app)
    .delete('/rawMaterials/RM001');

  expect(response.status).toBe(204);

  const list = await request(app).get('/rawMaterials');

  expect(list.body.length).toBe(0);
});

it('should delete rawMaterial by code', async () => {
  await request(app).post('/rawMaterials').send({
    code: 'RM001',
    name: 'rawMaterial One',
    stock: 10,
  });

  const response = await request(app)
    .delete('/rawMaterials/RM001');

  expect(response.status).toBe(204);

  const list = await request(app).get('/rawMaterials');

  expect(list.body.length).toBe(0);
});

it('should return 404 when deleting non existing rawMaterial', async () => {
  const response = await request(app)
    .delete('/rawMaterials/NOT_FOUND');
    
  expect(response.status).toBe(404);
  expect(response.body).toEqual({ message: 'rawMaterial not found' });
});
import request from 'supertest';
import app from "../app";


it('should create a rawMaterial', async () => {
    const response = await request(app)
        .post('/raw-materials')
        .send({
            code: 'RM001',
            name: 'Raw Material One',
            stock: 10,
        });

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.code).toBe('RM001');
    expect(response.body.name).toBe('Raw Material One');
    expect(response.body.stock).toBe(10);
});


it('should list rawMaterials', async () => {
    await request(app).post('/raw-materials').send({
        code: 'RM001',
        name: 'Raw Material One',
        stock: 10,
    });

    await request(app).post('/raw-materials').send({
        code: 'RM002',
        name: 'Raw Material Two',
        stock: 20,
    });

    const response = await request(app).get('/raw-materials');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);

    expect(response.body[0]).toHaveProperty('code');
    expect(response.body[0].stock).toBe(10);
});

it('should delete rawMaterial by code', async () => {
    await request(app).post('/raw-materials').send({
        code: 'RM001',
        name: 'Raw Material One',
        stock: 10,
    });

    const response = await request(app)
        .delete('/raw-materials/RM001');

    expect(response.status).toBe(204);

    const list = await request(app).get('/raw-materials');

    expect(list.body.length).toBe(0);
});

it('should delete rawMaterial by code', async () => {
    await request(app).post('/raw-materials').send({
        code: 'RM001',
        name: 'Raw Material One',
        stock: 10,
    });

    const response = await request(app)
        .delete('/raw-materials/RM001');

    expect(response.status).toBe(204);

    const list = await request(app).get('/raw-materials');

    expect(list.body.length).toBe(0);
});

it('should return 404 when deleting non existing rawMaterial', async () => {
    const response = await request(app)
        .delete('/raw-materials/NOT_FOUND');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Raw Material not found' });
});


it('should return rawMaterial by code', async () => {
    await request(app).post('/raw-materials').send({
        code: 'RM001',
        name: 'Raw Material One',
        stock: 10,
    });

    const response = await request(app).get('/raw-materials/RM001');

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body.code).toBe('RM001');
    expect(response.body.name).toBe('Raw Material One');
    expect(response.body.stock).toBe(10);
});

it('should return 404 if rawMaterial not found', async () => {
    const response = await request(app).get('/raw-materials/INVALID');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Raw Material not found');
});

it('should update rawMaterial by code', async () => {
    await request(app).post('/raw-materials').send({
        code: 'RM001',
        name: 'Raw Material One',
        stock: 10,
    });

    const response = await request(app)
        .put('/raw-materials/RM001')
        .send({
            name: 'Updated rawMaterial',
            stock: 15,
        });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated rawMaterial');
    expect(response.body.stock).toBe(15);
});

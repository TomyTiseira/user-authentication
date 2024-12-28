import request from 'supertest';
import app from '../src';
import connectDB, { disconnectDB } from '../src/config/connectDB.js';
import { generateToken } from './utils/generateToken.js';
import { cleanData } from './utils/cleanData.js';
import { initialData } from './utils/initialData.js';
import Role from '../src/Role/role.model.js';

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  // Limpia la base de datos antes de cada prueba
  await cleanData();
  // Inserta datos iniciales en la base de datos
  await initialData();
});

afterAll(async () => {
  // Cierra la conexión después de las pruebas
  await disconnectDB();
});

describe('Get all roles ', () => {
  it('GET /role should return status 200 and an array of roles', async () => {
    const { authToken, refreshToken } = await generateToken({ username: 'test', role: 'admin' });

    const response = await request(app)
      .get('/role')
      .set('Cookie', [`authToken=${authToken}`, `refreshToken=${refreshToken}`]);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
  });
});

describe('Create a role', () => {
  it('POST /role should return status 201 and a role', async () => {
    const { authToken, refreshToken } = await generateToken({ username: 'test', role: 'admin' });

    const response = await request(app)
      .post('/role/create')
      .set('Cookie', [`authToken=${authToken}`, `refreshToken=${refreshToken}`])
      .send({ name: 'test' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name');
    expect(typeof response).toBe('object');
    expect(response).not.toBeNull();
  });
});

describe('Get a role by id', () => {
  it('GET /role/:id should return status 200 and a role', async () => {
    const { authToken, refreshToken } = await generateToken({ username: 'test', role: 'admin' });
    const response = await request(app)
      .get('/role')
      .set('Cookie', [`authToken=${authToken}`, `refreshToken=${refreshToken}`]);
    const roleId = response.body[0]._id;

    const responseById = await request(app)
      .get(`/role/${roleId}`)
      .set('Cookie', [`authToken=${authToken}`, `refreshToken=${refreshToken}`]);

    expect(responseById.status).toBe(200);
    expect(typeof responseById).toBe('object');
    expect(responseById).not.toBeNull();
    expect(responseById.body).toHaveProperty('name');
  });
});

describe('Update a role', () => {
  it('PUT /role/:id should return status 200 and a role', async () => {
    const { authToken, refreshToken } = await generateToken({ username: 'test', role: 'admin' });
    const response = await request(app)
      .get('/role')
      .set('Cookie', [`authToken=${authToken}`, `refreshToken=${refreshToken}`]);
    const roleId = response.body[0]._id;

    const responseUpdate = await request(app)
      .put(`/role/${roleId}`)
      .set('Cookie', [`authToken=${authToken}`, `refreshToken=${refreshToken}`])
      .send({ name: 'test2' });

    const updatedRole = await Role.findById(roleId);

    expect(responseUpdate.status).toBe(200);
    expect(typeof responseUpdate).toBe('object');
    expect(responseUpdate).not.toBeNull();
    expect(responseUpdate.body).toHaveProperty('name');
    expect(updatedRole.name).toBe('test2');
  }
  );
});

describe('Delete a role', () => {
  it('DELETE /role/:id should return status 200 and a role', async () => {
    const { authToken, refreshToken } = await generateToken({ username: 'test', role: 'admin' });
    const response = await request(app)
      .get('/role')
      .set('Cookie', [`authToken=${authToken}`, `refreshToken=${refreshToken}`]);
    const roleId = response.body[0]._id;

    const responseDelete = await request(app)
      .delete(`/role/${roleId}`)
      .set('Cookie', [`authToken=${authToken}`, `refreshToken=${refreshToken}`])
      .send({ name: 'test2' });

    const deletedRole = await Role.findById(roleId);

    expect(responseDelete.status).toBe(200);
    expect(typeof responseDelete).toBe('object');
    expect(responseDelete).not.toBeNull();
    expect(responseDelete.body).toHaveProperty('name');
    expect(deletedRole.isActive).toBe(false);
  });
});

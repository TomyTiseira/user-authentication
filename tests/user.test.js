import request from 'supertest';
import app from '../src';
import connectDB, { disconnectDB } from '../src/config/connectDB.js';
import { generateToken } from './utils/generateToken.js';
import { cleanData } from './utils/cleanData.js';
import { initialData } from './utils/initialData.js';
import User from '../src/User/user.model.js';

beforeAll(async () => {
  await connectDB();
  // Limpia la base de datos antes de cada prueba
  await cleanData();
  // Inserta datos iniciales en la base de datos
  await initialData();
});

beforeEach(async () => {
  await cleanData();
  await initialData();
});

afterAll(async () => {
  // Cierra la conexión después de las pruebas
  await disconnectDB();
});

describe('Get all users ', () => {
  it('GET /role should return status 200 and an array of users', async () => {
    const { authToken, refreshToken } = await generateToken({ username: 'test', role: 'admin' });

    const response = await request(app)
      .get('/user')
      .set('Cookie', [`authToken=${authToken}`, `refreshToken=${refreshToken}`]);

    expect(response.status).toBe(201);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
  });
});

describe('Create User admin', () => {
  it('POST /user/createAdmin should return status 201 and a user', async () => {
    const { authToken, refreshToken } = await generateToken({ username: 'test', role: 'admin' });

    const response = await request(app)
      .post('/user/createAdmin')
      .set('Cookie', [`authToken=${authToken}`, `refreshToken=${refreshToken}`])
      .send({ username: 'test', password: '1234567' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('username');
    expect(typeof response).toBe('object');
    expect(response).not.toBeNull();
  });
});

describe('Create User', () => {
  it('POST /user/create should return status 201 and a user', async () => {
    const response = await request(app)
      .post('/user/create')
      .send({ username: 'test2', password: '1234567' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('username');
    expect(typeof response).toBe('object');
    expect(response).not.toBeNull();
  });
});

describe('Get a user by id', () => {
  it('GET /user/:id should return status 200 and a user', async () => {
    const { authToken, refreshToken } = await generateToken({ username: 'test', role: 'admin' });
    const response = await request(app)
      .get('/user')
      .set('Cookie', [`authToken=${authToken}`, `refreshToken=${refreshToken}`]);
    const userId = response.body[0]._id;

    const responseById = await request(app)
      .get(`/user/${userId}`)
      .set('Cookie', [`authToken=${authToken}`, `refreshToken=${refreshToken}`]);

    expect(responseById.status).toBe(200);
    expect(typeof responseById).toBe('object');
    expect(responseById).not.toBeNull();
    expect(responseById.body).toHaveProperty('username');
  });
});

describe('Update a user', () => {
  it('PUT /user/:id should return status 200 and a user', async () => {
    const { authToken, refreshToken } = await generateToken({ username: 'test', role: 'admin' });
    const response = await request(app)
      .get('/user')
      .set('Cookie', [`authToken=${authToken}`, `refreshToken=${refreshToken}`]);
    const userId = response.body[0]._id;

    const responseById = await request(app)
      .put(`/user/${userId}`)
      .set('Cookie', [`authToken=${authToken}`, `refreshToken=${refreshToken}`])
      .send({ username: 'test2' });

    const updatedUser = await User.findById(userId);

    expect(responseById.status).toBe(200);
    expect(typeof responseById).toBe('object');
    expect(responseById).not.toBeNull();
    expect(responseById.body).toHaveProperty('username');
    expect(updatedUser.username).toBe('test2');
  });
});

describe('Delete a user', () => {
  it('DELETE /user/:id should return status 200 and a user', async () => {
    const { authToken, refreshToken } = await generateToken({ username: 'test', role: 'admin' });
    const response = await request(app)
      .get('/user')
      .set('Cookie', [`authToken=${authToken}`, `refreshToken=${refreshToken}`]);
    const userId = response.body[0]._id;

    const responseById = await request(app)
      .delete(`/user/${userId}`)
      .set('Cookie', [`authToken=${authToken}`, `refreshToken=${refreshToken}`]);

    console.log(responseById.body);
    console.log(responseById.status);

    const deletedRole = await User.findById(userId);

    expect(responseById.status).toBe(200);
    expect(typeof responseById).toBe('object');
    expect(responseById).not.toBeNull();
    expect(responseById.body).toHaveProperty('username');
    expect(deletedRole.isActive).toBe(false);
  });
});

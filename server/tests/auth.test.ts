import app from '../src/server';
import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { mockUser } from './data';

describe('Authentication', () => {
  let prisma;
  beforeAll(() => {
    prisma = new PrismaClient();
  });

  afterAll(async () => {
    try {
      await prisma.user.deleteMany({
        where: {
          email: {
            in: Array.of(mockUser.email),
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
    await prisma.$disconnect();
  });

  it('should signup user', async () => {
    const response = await request(app).post('/api/v1/auth/signup').send(mockUser);
    expect(response.statusCode).toBe(201);
  });

  it('should login user', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      password: mockUser.password,
      email: mockUser.email,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.user.email).toMatch(mockUser.email);
  });
});

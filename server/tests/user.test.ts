import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import app from '../src/server';
import { mockUser } from './data';
import bcrypt from 'bcrypt';
import { createAccessToken, createRefreshToken } from '../src/services/auth-service';

describe('Name of the group', () => {
  let prisma;
  let accessToken;
  let refreshToken;
  let userId;

  // Setup before all tests are run
  beforeAll(async () => {
    prisma = new PrismaClient();
    const encryptedPassword = await bcrypt.hash(mockUser.password, 12);
    const user = await prisma.user.create({
      data: {
        ...mockUser,
        password: encryptedPassword,
      },
    });
    userId = user.id;
    accessToken = createAccessToken(user.id);
    refreshToken = createRefreshToken(user.id);
  });

  // Teardown after all tests are run
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

  it('should get the requested user', async () => {
    const response = await request(app)
      .get(`/api/v1/users/${userId}`)
      .set('Cookie', [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`]);

    expect(response.statusCode).toBe(200);
    expect(response.body.data.user.id).toBe(userId);
  });
  it('should get all users', async () => {
    const response = await request(app)
      .get(`/api/v1/users`)
      .set('Cookie', [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`]);

    const allUsersExists = Array.isArray(response.body.data.allUsers);

    expect(response.statusCode).toBe(200);
    expect(allUsersExists).toBeTruthy();
  });
});

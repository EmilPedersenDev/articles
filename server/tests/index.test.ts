import mockRequest from 'supertest';
import app from '../src/server';

describe('tests for the app/server', () => {
  it('GET root route', async () => {
    const response = await mockRequest(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  it('GET test route ', async () => {
    const response = await mockRequest(app).get('/api/v1/test');
    console.log(response.body?.data?.message);

    expect(response.statusCode).toBe(200);
    expect(response.body?.data?.message).toBe('Test api call');
  });
});

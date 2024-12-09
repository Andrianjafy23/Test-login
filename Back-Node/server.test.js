const request = require('supertest');
const app = require('./index'); // Importer l'application Express

let server;

beforeAll(() => {
  server = app.listen(5000, () => console.log('Serveur démarré pour les tests'));
});

afterAll(() => {
  server.close(() => {
    console.log('Serveur fermé après les tests');
  });
});

describe('POST /api/login', () => {
  it('should return a token on successful login', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ username: 'users', password: 'lazaniaina2310' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return 401 for incorrect credentials', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ username: 'invalid', password: 'wrongpassword' });

    expect(response.status).toBe(401);
  });
});

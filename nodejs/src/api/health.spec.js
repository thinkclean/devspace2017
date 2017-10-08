const request = require('supertest');

const app = require('../server');

describe('/health', () => {
  describe('GET /health', () => {
    it('should return code 200', () =>
      request(app)
        .get('/health')
        .expect(200));
  });
});

const { expect } = require('chai');
const request = require('supertest');

const app = require('./server');

describe('GET /users', () => {
  it('should return code 200', () =>
    request(app)
      .get('/users')
      .expect(200));

  it('should return empty array', () =>
    request(app)
      .get('/users')
      .expect(({ body }) => {
        expect(body).to.be.a('array');
        expect(body).to.be.empty;
      }));
});

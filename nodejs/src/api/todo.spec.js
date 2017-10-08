const { expect } = require('chai');
const request = require('supertest');

const db = require('../services/dbService');
const app = require('../server');

describe('/api/todo', () => {
  before(() => db.connect());
  after(() => db.disconnect());

  describe('when having no todo items', () => {
    it('GET /api/todo should return empty array', () =>
      request(app)
        .get('/api/todo')
        .expect(200)
        .expect(({ body }) => {
          expect(body).to.be.an('array');
          expect(body).to.be.empty;
        }));
  });

  describe('when having a todo item', () => {
    let todoItem;
    before(() =>
      request(app)
        .post('/api/todo')
        .send({ name: 'hello' })
        .expect(200)
        .expect(({ body }) => {
          expect(body).to.be.an('object');
          expect(body._id).to.be.a('string');
          expect(body.name).to.be.equal('hello');
          todoItem = body;
        }));

    describe('and requesting todo item by known id', () => {
      it('GET /api/todo should return expected item', () =>
        request(app)
          .get('/api/todo')
          .expect(200)
          .expect(({ body }) => {
            expect(body).to.be.an('array');
            expect(body).to.have.length(1);
            expect(body[0]).to.be.deep.equal(todoItem);
          }));

      it('GET /api/todo/:id should return expected item', () =>
        request(app)
          .get(`/api/todo/${todoItem._id}`)
          .expect(200)
          .expect(({ body }) => {
            expect(body).to.be.deep.equal(todoItem);
          }));
    });

    describe('and requesting todo item by unknown id', () => {
      it('GET /api/todo/:id should return code 404', () =>
        request(app)
          .get('/api/todo/1')
          .expect(404));
    });

    describe('and updating todo item by known id', () => {
      it('PUT /api/todo/:id should return code 404', () =>
        request(app)
          .put(`/api/todo/${todoItem._id}`)
          .send({ done: true })
          .expect(200)
          .expect(({ body }) => {
            expect(body).to.be.deep.equal({
              _id: todoItem._id,
              name: todoItem.name,
              done: true,
            });
          }));
    });

    describe('and deleting todo item by known id', () => {
      before(() =>
        request(app)
          .delete(`/api/todo/${todoItem._id}`)
          .expect(200)
          .expect(({ body }) => {
            expect(body._id).to.be.deep.equal(todoItem._id);
          }));

      describe('and requesting todo item by known id', () => {
        it('GET /api/todo should return expected item', () =>
          request(app)
            .get('/api/todo')
            .expect(200)
            .expect(({ body }) => {
              expect(body).to.be.an('array');
              expect(body).to.be.empty;
            }));

        it('GET /api/todo/:id should return code 404', () =>
          request(app)
            .get(`/api/todo/${todoItem._id}`)
            .expect(404));
      });
    });
  });
});

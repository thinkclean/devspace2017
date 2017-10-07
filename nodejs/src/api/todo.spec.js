const { expect } = require('chai');
const request = require('supertest');
const sinon = require('sinon');

const TodoItem = require('../model/TodoItem');
const app = require('../server');

describe('/api/todo', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('GET /api/todo', () => {
    describe('when having no todo items', () => {
      beforeEach(() => {
        sandbox.stub(TodoItem, 'find')
          .returns(Promise.resolve([]));
      });

      it('should return empty array', () =>
        request(app)
          .get('/api/todo')
          .expect(200)
          .expect(({ body }) => {
            expect(body).to.be.a('array');
            expect(body).to.be.empty;
          }));
    });
  });

  describe('GET /api/todo/:id', () => {
    describe('when requesting existing todo item by id', () => {
      beforeEach(() => {
        sandbox.stub(TodoItem, 'findById')
          .returns(Promise.resolve({ name: 'hello' }));
      });

      it('should return expected item', () =>
        request(app)
          .get('/api/todo/1')
          .expect(200)
          .expect(({ body }) => {
            expect(body).to.be.a('object');
            expect(body.name).to.be.equal('hello');
          }));
    });

    describe('when requesting non-existing todo item by id', () => {
      beforeEach(() => {
        sandbox.stub(TodoItem, 'findById')
          .returns(Promise.resolve());
      });

      it('should return code 404', () =>
        request(app)
          .get('/api/todo/1')
          .expect(404));
    });
  });
});

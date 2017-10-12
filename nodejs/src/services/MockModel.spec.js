const TodoItem = require('../model/TodoItem');
const createModel = require('./MockModel');

const MockModel = createModel(TodoItem);

describe.only('MockModel', () => {
  it('save()', () => {
    new MockModel({ name: 1 })
      .save()
      .then(console.log)
      .catch(console.error);
  });
});

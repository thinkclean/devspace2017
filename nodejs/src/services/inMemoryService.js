const TodoItem = require('../model/TodoItem');

let todoItems = [];

const findByObjectId = id => i => i._id.toString() === id.toString();
const findNotByObjectId = id => i => i._id.toString() !== id.toString();

const find = () =>
  Promise.resolve(todoItems);

const findById = id =>
  Promise.resolve(todoItems.find(findByObjectId(id)));

const save = (data) => {
  let todoItem = new TodoItem(data);
  const error = todoItem.validateSync();
  if (error) {
    return Promise.reject(error.toString());
  }
  todoItem = todoItem.toObject();
  todoItems.push(todoItem);
  return Promise.resolve(todoItem);
};

const findByIdAndUpdate = (id, data) => {
  const todoItem = todoItems.find(findByObjectId(id));
  if (todoItem) {
    Object.assign(todoItem, data);
  }
  return Promise.resolve(todoItem);
};

const findByIdAndRemove = (id) => {
  const todoItem = todoItems.find(findByObjectId(id));
  if (todoItem) {
    todoItems = todoItems.filter(findNotByObjectId(id));
  }
  return Promise.resolve(todoItem);
};

const remove = () => {
  todoItems = [];
  return Promise.resolve();
};

module.exports = {
  connect: () => Promise.resolve(),
  disconnect: () => Promise.resolve(),
  TodoItem: {
    find,
    findById,
    save,
    findByIdAndUpdate,
    findByIdAndRemove,
    remove,
  },
};

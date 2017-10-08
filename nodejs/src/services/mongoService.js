const config = require('config');
const mongoose = require('mongoose');

const TodoItem = require('../model/TodoItem');

mongoose.Promise = Promise;

const find = () =>
  TodoItem.find();

const findById = id =>
  TodoItem.findById(id);

const save = data =>
  new TodoItem(data).save();

const findByIdAndUpdate = (id, data) =>
  TodoItem.findByIdAndUpdate(id, data, { runValidators: true, new: true });

const findByIdAndRemove = id =>
  TodoItem.findByIdAndRemove(id);

const remove = () =>
  TodoItem.remove();

module.exports = {
  connect: () => mongoose.connect(config.db.uri, config.db.options)
    .then(() => console.log('Connected to database')),
  disconnect: () => mongoose.disconnect(),
  TodoItem: {
    find,
    findById,
    save,
    findByIdAndUpdate,
    findByIdAndRemove,
    remove,
  },
};

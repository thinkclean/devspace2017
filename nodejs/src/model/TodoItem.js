const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  done: Boolean,
});

module.exports = mongoose.model('TodoItem', schema);

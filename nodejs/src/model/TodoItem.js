const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  done: { type: Boolean, required: true, default: false },
}, { versionKey: false });

module.exports = mongoose.model('TodoItem', schema);

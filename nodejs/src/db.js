const config = require('config');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

module.exports = {
  connect: () => mongoose.connect(config.db.uri, config.db.options),
  disconnect: () => mongoose.disconnect(),
};

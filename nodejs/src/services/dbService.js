const config = require('config');

const service = config.useDatabase ? require('./mongoService') : require('./inMemoryService');

module.exports = {
  connect: service.connect,
  disconnect: service.disconnect,
  TodoItem: service.TodoItem,
};

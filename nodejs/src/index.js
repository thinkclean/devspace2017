const gracefulExit = require('express-graceful-exit');

const app = require('./server');
const db = require('./db');

app.use(gracefulExit.middleware(app));

const server = app.listen(3000, () => {
  console.log('Now listening on port 3000');

  db.connect()
    .then(() => console.log('Connected to database'))
    .catch((err) => {
      console.error(err.toString());
      server.close();
    });
});

process.on('message', (message) => {
  if (message === 'shutdown') {
    gracefulExit.gracefulExitHandler(app, server, {
      socketio: app.settings.socketio,
    });
  }
});

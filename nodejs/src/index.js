const app = require('./server');
const db = require('./services/dbService');

const server = app.listen(3000, () => {
  console.log('Now listening on port 3000');

  db.connect()
    .catch((err) => {
      console.error(err.toString());
      server.close();
    });
});

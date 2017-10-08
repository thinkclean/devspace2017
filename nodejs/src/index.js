const app = require('./server');
const db = require('./db');

const server = app.listen(3000, () => {
  console.log('Now listening on port 3000');

  db.connect()
    .then(() => console.log('Connected to database'))
    .catch((err) => {
      console.error(err.toString());
      server.close();
    });
});

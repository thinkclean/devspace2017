module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('OK');
  });

  return app;
};

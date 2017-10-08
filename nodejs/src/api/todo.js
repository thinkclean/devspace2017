const { TodoItem } = require('../services/dbService');

module.exports = (app) => {
  app.get('/todo', (req, res) => {
    TodoItem
      .find()
      .then(items => res.json(items))
      .catch(err => res.status(400).json(err.toString()));
  });

  app.get('/todo/:id', (req, res) => {
    TodoItem
      .findById(req.params.id)
      .then((item) => {
        if (item) res.json(item);
        else res.status(404).json('not found');
      })
      .catch(err => res.status(400).json(err.toString()));
  });

  app.post('/todo', (req, res) => {
    TodoItem
      .save(req.body)
      .then(item => res.json(item))
      .catch(err => res.status(400).json(err.toString()));
  });

  app.put('/todo/:id', (req, res) => {
    TodoItem
      .findByIdAndUpdate(req.params.id, req.body)
      .then((item) => {
        if (item) res.json(item);
        else res.status(404).json('not found');
      })
      .catch(err => res.status(400).json(err.toString()));
  });

  app.delete('/todo/:id', (req, res) => {
    TodoItem
      .findByIdAndRemove(req.params.id)
      .then((item) => {
        if (item) res.json(item);
        else res.status(404).json('not found');
      })
      .catch(err => res.status(400).json(err.toString()));
  });

  return app;
};

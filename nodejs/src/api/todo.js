const TodoItem = require('../model/TodoItem');

module.exports = (app) => {
  app.get('/todo', (req, res) => {
    TodoItem
      .find()
      .then(items => res.json(items))
      .catch(err => res.status(400).send(err.toString()));
  });

  app.get('/todo/:id', (req, res) => {
    TodoItem
      .findById(req.params.id)
      .then((item) => {
        if (item) res.json(item);
        else res.status(404).send('not found');
      })
      .catch(err => res.status(400).send(err.toString()));
  });

  app.post('/todo', (req, res) => {
    new TodoItem(req.body)
      .save()
      .then(item => res.json({ id: item._id }))
      .catch(err => res.status(400).send(err.toString()));
  });

  app.put('/todo/:id', (req, res) => {
    TodoItem
      .findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
      .then((item) => {
        if (item) res.json();
        else res.status(404).send('not found');
      })
      .catch(err => res.status(400).send(err.toString()));
  });

  app.delete('/todo/:id', (req, res) => {
    TodoItem
      .findByIdAndRemove(req.params.id)
      .then((item) => {
        if (item) res.json();
        else res.status(404).send('not found');
      })
      .catch(err => res.status(400).send(err.toString()));
  });

  return app;
};

const express = require('express');
const bodyParser = require('body-parser');

const todo = require('./api/todo');

const app = express();

app.use(bodyParser.json());

app.use('/api', todo(new express.Router()));

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');

const health = require('./api/health');
const todo = require('./api/todo');

const app = express();

app.use(bodyParser.json());

app.use('/_health', health(new express.Router()));
app.use('/api', todo(new express.Router()));

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');

const users = require('./users');

const app = express();

app.use(bodyParser.json());

app.use('/users', users(new express.Router()));

module.exports = app;

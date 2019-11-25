require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const messagesRouter = require('./messages-router');
const messagesServices = require('./messages-service');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/messages/', messagesRouter);

//make test pass by adding basic endpoints to app.js
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/send-message', (req, res) => {
  console.log(req.body);
  res.send('Got it');
});

app.get('/receive-message', (req, res) => {
  res.send('received message');
});

//provide error messages
app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
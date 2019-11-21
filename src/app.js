//exports the app ready for integration testing
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json());

//make test pass by adding basic endpoints to app.js
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/send-message', (req, res) => {
  console.log(req.body);
  res.send('Got it');
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

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });
module.exports = app;
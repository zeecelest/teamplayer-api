/* eslint-disable indent */
require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});

const SendMessages = {
  getSendMessages() {
    return 'all the messages';
  }
};

module.exports = SendMessages;
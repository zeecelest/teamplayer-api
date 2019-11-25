require('dotenv').config();
const knex = require('knex');
const SendMessages = require('./send-messages');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});

console.log(SendMessages.getSendMessages());



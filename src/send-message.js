/* eslint-disable indent */
require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});

const SendMessages = {
  getSendMessages() {
    return knex.select('*').from('team_player_messages');
    },
  
  insertMessage(knex, newMessage) {
    return knex
      .insert(newMessage)
      .into('team_player_messages')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

module.exports = SendMessages;
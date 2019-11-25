const messagesService = {
  getAllMessages(knex) {
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
  
  getById(knex, id) {
    return knex
      .from('team_player_messages')
      .select('*')
      .where('id', id)
      .first();
  },
  
  deleteMessage(knex, id) {
    return knex('team_player_messages')
      .where({ id })
      .delete();
  },

  updateMessage(knex, id, newMessageFields) {
    return knex('team_player_messages')
      .where({ id })
      .update(newMessageFields);
  },

};
  
module.exports = messagesService;
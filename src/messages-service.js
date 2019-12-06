const messagesService = {
  getAllMessages(knex) {
    return knex.select('*').from('messages').orderBy('id', 'desc');
  },
  
  insertMessage(knex, newMessage) {
    return knex
      .insert(newMessage)
      .into('messages')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  insertMessageReply(knex, newMessage) {
    return knex
      .insert(newMessage)
      .into('messages')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  
  getById(knex, id) {
    return knex
      .from('messages')
      .select('*')
      .where('id', id)
      .first();
  },
  
  deleteMessage(knex, id) {
    return knex('messages')
      .where({ id })
      .delete();
  },

  updateMessage(knex, id, newMessageFields) {
    return knex('messages')
      .where({ id })
      .update(newMessageFields);
  },

};
  
module.exports = messagesService;
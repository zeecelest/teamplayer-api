const path = require('path');
const express = require('express');
const xss = require('xss');
const MessagesService = require('./messages-service');

const messagesRouter = express.Router();
const jsonParser = express.json();

const serializeMessage = message => ({
  id: message.id,
  message: xss(message.message),
  recipient: xss(message.recipient),
  date_published: message.date_published,
});

messagesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    MessagesService.getAllMessages(knexInstance)
      .then(messages => {
        res.json(messages.map(serializeMessage));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { message, recipient, date_published } = req.body;
    const newMessage = { message, recipient };

    for (const [key, value] of Object.entries(newMessage)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });
      }
    }

    newMessage.date_published = date_published;

    console.log(req.app.get('db'));
    
    MessagesService.insertMessage(
      req.app.get('db'),
      newMessage
    )
      .then(message => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${message.id}`))
          .json(serializeMessage(message));
      })
      .catch(next);
  });

messagesRouter
  .route('/:message_id')
  .all((req, res, next) => {
    MessagesService.getById(
      req.app.get('db'),
      req.params.message_id
    )
      .then(message => {
        if (!message) {
          return res.status(404).json({
            error: { message: 'Message doesn\'t exist' }
          });
        }
        res.message = message;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeMessage(res.message));
  })
  .delete((req, res, next) => {
    MessagesService.deleteMessage(
      req.app.get('db'),
      req.params.message_id
    )
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { text, date_commented } = req.body;
    const commentToUpdate = { text, date_commented };

    const numberOfValues = Object.values(commentToUpdate).filter(Boolean).length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: 'Request body must contain either \'text\' or \'date_commented\''
        }
      });

    MessagesService.updateMessage(
      req.app.get('db'),
      req.params.message_id,
      messageToUpdate,
      )

      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = messagesRouter;
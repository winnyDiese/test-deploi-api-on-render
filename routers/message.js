const express = require('express');
const { all_messages, add_message, message_by_id, delete_message, update_message } = require('../controllers/message');
const router = express.Router();

// Route to get all messages
router.get('/message', all_messages);

// Route to add a new message
router.post('/message', add_message);

// Route to get a specific message by ID
router.get('/message/:id', message_by_id);

// Route to update a message by ID
router.put('/message/:id', update_message);

// Route to delete a message by ID
router.delete('/message/:id', delete_message);

module.exports = router;

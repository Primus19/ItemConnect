const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const auth = require('../middleware/auth.middleware');

// All chat routes are protected
router.use(auth);

router.post('/', chatController.createOrGetChat);
router.get('/', chatController.getUserChats);
router.get('/:id', chatController.getChatById);
router.post('/:id/messages', chatController.addMessage);
router.put('/:id/status', chatController.updateChatStatus);

module.exports = router;
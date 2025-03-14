const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');
const auth = require('../middleware/auth.middleware');

// Public routes
router.get('/', itemController.getItems);
router.get('/:id', itemController.getItemById);

// Protected routes
router.post('/', auth, itemController.createItem);
router.put('/:id', auth, itemController.updateItem);
router.delete('/:id', auth, itemController.deleteItem);
router.post('/:id/watch', auth, itemController.watchItem);
router.delete('/:id/watch', auth, itemController.unwatchItem);

module.exports = router;
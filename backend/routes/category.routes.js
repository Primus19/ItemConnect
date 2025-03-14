const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const auth = require('../middleware/auth.middleware');

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/hierarchical', categoryController.getHierarchicalCategories);
router.get('/:id', categoryController.getCategoryById);

// Admin routes - these would typically have admin middleware
// For simplicity, we're just using auth middleware
router.post('/', auth, categoryController.createCategory);
router.put('/:id', auth, categoryController.updateCategory);
router.delete('/:id', auth, categoryController.deleteCategory);

module.exports = router;
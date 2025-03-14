const Category = require('../models/category.model');

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .sort({ name: 1 });
    
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get category by id
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const category = await Category.findById(id);
    
    if (!category || !category.isActive) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get hierarchical categories
exports.getHierarchicalCategories = async (req, res) => {
  try {
    // Get all root categories (level 0)
    const rootCategories = await Category.find({ 
      level: 0,
      isActive: true 
    }).sort({ name: 1 });
    
    // Function to recursively get subcategories
    const getSubcategories = async (parentId) => {
      const subcategories = await Category.find({ 
        parent: parentId,
        isActive: true 
      }).sort({ name: 1 });
      
      const result = [];
      
      for (const subcategory of subcategories) {
        const children = await getSubcategories(subcategory._id);
        
        result.push({
          ...subcategory.toObject(),
          children: children
        });
      }
      
      return result;
    };
    
    // Build hierarchical structure
    const hierarchicalCategories = [];
    
    for (const rootCategory of rootCategories) {
      const children = await getSubcategories(rootCategory._id);
      
      hierarchicalCategories.push({
        ...rootCategory.toObject(),
        children: children
      });
    }
    
    res.status(200).json(hierarchicalCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create category (admin only)
exports.createCategory = async (req, res) => {
  try {
    const { name, description, icon, parent } = req.body;
    
    // Check if category with the same name already exists
    const existingCategory = await Category.findOne({ name });
    
    if (existingCategory) {
      return res.status(400).json({ message: 'Category with this name already exists' });
    }
    
    // Determine level based on parent
    let level = 0;
    
    if (parent) {
      const parentCategory = await Category.findById(parent);
      
      if (!parentCategory) {
        return res.status(404).json({ message: 'Parent category not found' });
      }
      
      level = parentCategory.level + 1;
    }
    
    // Create new category
    const category = new Category({
      name,
      description,
      icon,
      parent,
      level
    });
    
    await category.save();
    
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update category (admin only)
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Find category
    const category = await Category.findById(id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    // Check if updating name and if name already exists
    if (updates.name && updates.name !== category.name) {
      const existingCategory = await Category.findOne({ 
        name: updates.name,
        _id: { $ne: id }
      });
      
      if (existingCategory) {
        return res.status(400).json({ message: 'Category with this name already exists' });
      }
    }
    
    // If updating parent, update level
    if (updates.parent && updates.parent !== category.parent) {
      const parentCategory = await Category.findById(updates.parent);
      
      if (!parentCategory) {
        return res.status(404).json({ message: 'Parent category not found' });
      }
      
      updates.level = parentCategory.level + 1;
    }
    
    // Update category
    Object.assign(category, updates);
    await category.save();
    
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete category (admin only) - mark as inactive
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find category
    const category = await Category.findById(id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    // Check if category has active subcategories
    const subcategories = await Category.find({ 
      parent: id,
      isActive: true 
    });
    
    if (subcategories.length > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete category with active subcategories. Deactivate subcategories first.' 
      });
    }
    
    // Mark as inactive
    category.isActive = false;
    await category.save();
    
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
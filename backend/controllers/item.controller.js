const Item = require('../models/item.model');
const User = require('../models/user.model');
const Category = require('../models/category.model');

// Create a new item
exports.createItem = async (req, res) => {
  try {
    const { title, description, categories, condition, price, isFree, isNegotiable, location, tags } = req.body;
    const owner = req.user._id;
    
    // Validate categories
    if (categories && categories.length > 0) {
      const validCategories = await Category.find({ _id: { $in: categories }, isActive: true });
      
      if (validCategories.length !== categories.length) {
        return res.status(400).json({ message: 'One or more categories are invalid' });
      }
    }
    
    // Create the item
    const item = new Item({
      title,
      description,
      categories,
      owner,
      condition,
      price: isFree ? 0 : price,
      isFree,
      isNegotiable,
      location,
      tags,
      images: req.body.images || [],
      videos: req.body.videos || []
    });
    
    await item.save();
    
    // Add item to user's listed items
    await User.findByIdAndUpdate(owner, {
      $addToSet: { itemsListed: item._id }
    });
    
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all items with filtering and pagination
exports.getItems = async (req, res) => {
  try {
    let { 
      page = 1, 
      limit = 10, 
      sortBy = 'createdAt', 
      sortOrder = 'desc',
      categories,
      condition,
      minPrice,
      maxPrice,
      isFree,
      location,
      search
    } = req.query;
    
    // Convert to numbers
    page = parseInt(page);
    limit = parseInt(limit);
    
    // Build query
    const query = { status: 'available' };
    
    // Text search
    if (search) {
      query.$text = { $search: search };
      
      // Increment search count for matched items
      await Item.updateMany(
        { $text: { $search: search } },
        { $inc: { searchCount: 1 } }
      );
    }
    
    // Filter by categories
    if (categories) {
      const categoryIds = categories.split(',');
      query.categories = { $in: categoryIds };
    }
    
    // Filter by condition
    if (condition) {
      query.condition = condition;
    }
    
    // Filter by price range
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      
      if (minPrice !== undefined) {
        query.price.$gte = parseInt(minPrice);
      }
      
      if (maxPrice !== undefined) {
        query.price.$lte = parseInt(maxPrice);
      }
    }
    
    // Filter by free items
    if (isFree !== undefined) {
      query.isFree = isFree === 'true';
    }
    
    // Filter by location
    if (location) {
      query['location.country'] = location;
    }
    
    // Execute query with pagination
    const items = await Item.find(query)
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('owner', 'username avatar rating')
      .populate('categories', 'name');
    
    // Get total count
    const totalItems = await Item.countDocuments(query);
    
    res.status(200).json({
      items,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      totalItems
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single item by id
exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const item = await Item.findById(id)
      .populate('owner', 'username avatar rating location')
      .populate('categories', 'name');
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    // Increment view count
    item.viewCount += 1;
    await item.save();
    
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an item
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user._id;
    
    // Find the item
    const item = await Item.findById(id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    // Check if user is the owner
    if (item.owner.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You are not authorized to update this item' });
    }
    
    // Validate categories if provided
    if (updates.categories && updates.categories.length > 0) {
      const validCategories = await Category.find({ _id: { $in: updates.categories }, isActive: true });
      
      if (validCategories.length !== updates.categories.length) {
        return res.status(400).json({ message: 'One or more categories are invalid' });
      }
    }
    
    // Update the item
    Object.assign(item, updates);
    
    // If marking as free, set price to 0
    if (updates.isFree === true) {
      item.price = 0;
    }
    
    await item.save();
    
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an item (mark as inactive)
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    
    // Find the item
    const item = await Item.findById(id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    // Check if user is the owner
    if (item.owner.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this item' });
    }
    
    // Update status to inactive
    item.status = 'inactive';
    await item.save();
    
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add item to user's watchlist
exports.watchItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    
    // Check if item exists
    const item = await Item.findById(id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    // Add to watchlist
    await User.findByIdAndUpdate(userId, {
      $addToSet: { itemsWatching: id }
    });
    
    // Increment favorite count
    item.favoriteCount += 1;
    await item.save();
    
    res.status(200).json({ message: 'Item added to watchlist' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from user's watchlist
exports.unwatchItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    
    // Check if item exists
    const item = await Item.findById(id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    // Remove from watchlist
    await User.findByIdAndUpdate(userId, {
      $pull: { itemsWatching: id }
    });
    
    // Decrement favorite count
    if (item.favoriteCount > 0) {
      item.favoriteCount -= 1;
      await item.save();
    }
    
    res.status(200).json({ message: 'Item removed from watchlist' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
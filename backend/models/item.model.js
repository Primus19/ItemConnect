const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Item title is required'],
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  description: {
    type: String,
    required: [true, 'Item description is required'],
    trim: true,
    minlength: 10
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'At least one category is required']
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  condition: {
    type: String,
    enum: ['New', 'Like New', 'Good', 'Fair', 'Poor'],
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  isFree: {
    type: Boolean,
    default: false
  },
  isNegotiable: {
    type: Boolean,
    default: true
  },
  location: {
    type: {
      country: String,
      city: String,
      address: String
    },
    required: true
  },
  images: [{
    url: String,
    caption: String
  }],
  videos: [{
    url: String,
    caption: String
  }],
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['available', 'pending', 'sold', 'inactive'],
    default: 'available'
  },
  viewCount: {
    type: Number,
    default: 0
  },
  favoriteCount: {
    type: Number,
    default: 0
  },
  searchCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for text search
itemSchema.index({
  title: 'text',
  description: 'text',
  'tags': 'text'
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
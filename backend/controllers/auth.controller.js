const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: `User already exists with this ${existingUser.email === email ? 'email' : 'username'}` 
      });
    }
    
    // Create new user
    const user = new User({
      username,
      email,
      password,
      ...req.body
    });
    
    await user.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        location: user.location
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    if (!user.isActive) {
      return res.status(401).json({ message: 'Account is inactive' });
    }
    
    // Check password
    const isMatch = await user.isValidPassword(password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Update last active
    user.lastActive = Date.now();
    await user.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        location: user.location
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('itemsListed', 'title description images status');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = req.user;
    
    // Don't allow password update through this endpoint
    delete updates.password;
    
    // Don't allow email/username change if it already exists
    if (updates.email || updates.username) {
      const existingUser = await User.findOne({
        $or: [
          { email: updates.email, _id: { $ne: user._id } },
          { username: updates.username, _id: { $ne: user._id } }
        ]
      });
      
      if (existingUser) {
        return res.status(400).json({ 
          message: `User already exists with this ${existingUser.email === updates.email ? 'email' : 'username'}` 
        });
      }
    }
    
    // Update user
    Object.assign(user, updates);
    await user.save();
    
    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        location: user.location,
        bio: user.bio
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
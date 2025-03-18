const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const auth = require('../middleware/auth.middleware');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/profile', auth, authController.getProfile);
router.put('/profile', auth, authController.updateProfile);

module.exports = router;
const upload = require('../middleware/upload.middleware');

// Upload avatar
router.post('/upload-avatar', auth, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    req.user.avatar = `/uploads/${req.file.filename}`;
    await req.user.save();

    res.status(200).json({
      message: 'Avatar uploaded successfully',
      avatar: req.user.avatar
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to upload avatar' });
  }
});

// DEBUG: Manual endpoint to create test user for login verification
router.get('/debug/create-test-user', async (req, res) => {
  const bcrypt = require('bcryptjs');
  const User = require('../models/user.model');

  const existing = await User.findOne({ email: 'testuser@example.com' });
  if (existing) {
    return res.status(200).json({ message: 'Test user already exists' });
  }

  const hashedPassword = await bcrypt.hash('password123', 10);

  const user = new User({
    username: 'testuser',
    email: 'testuser@example.com',
    password: hashedPassword,
    firstName: 'Test',
    lastName: 'User',
    isActive: true
  });

  await user.save();
  res.status(201).json({ message: '✅ Test user created successfully' });
});

router.get('/debug/users', async (req, res) => {
  const User = require('../models/user.model');
  const users = await User.find({}, '-password'); // Don't return passwords
  res.json(users);
});

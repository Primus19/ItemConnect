
const User = require('../models/user.model');

async function createTestUser() {
  const email = 'testuser@example.com';

  await User.deleteOne({ email }); // Clean up any existing user

  const user = new User({
    username: 'testuser',
    email,
    password: 'password123', // Let pre('save') hook hash this
    firstName: 'Test',
    lastName: 'User',
    isActive: true
  });

  await user.save();
  console.log('✅ Test user created with hashed password via schema hook.');
}

module.exports = createTestUser;

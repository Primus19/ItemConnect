
<<<<<<< HEAD
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
=======
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
require('dotenv').config();

async function createTestUsers() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const users = [
    { username: 'alice', email: 'alice@example.com', password: 'password123' },
    { username: 'bob', email: 'bob@example.com', password: 'password123' },
    { username: 'charlie', email: 'charlie@example.com', password: 'password123' },
  ];

  for (let userData of users) {
    const exists = await User.findOne({ email: userData.email });
    if (!exists) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      await User.create({ ...userData, password: hashedPassword });
      console.log(`✅ Created test user: ${userData.email}`);
    } else {
      console.log(`⚠️ User already exists: ${userData.email}`);
    }
  }

  await mongoose.disconnect();
  console.log('✅ Test users created.');
}

createTestUsers();
>>>>>>> 30fa407adb45d2d7f3db9506a9c95df6cd7ecaa2

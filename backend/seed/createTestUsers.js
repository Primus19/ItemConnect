
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

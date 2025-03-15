const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Item = require('../models/item.model');
require('dotenv').config();

async function seedInitialData() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const testUsers = [
    { username: 'alice', email: 'alice@example.com', password: 'password123' },
    { username: 'bob', email: 'bob@example.com', password: 'password123' },
    { username: 'charlie', email: 'charlie@example.com', password: 'password123' }
  ];

  for (const userData of testUsers) {
    const exists = await User.findOne({ email: userData.email });
    if (!exists) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      await User.create({ ...userData, password: hashedPassword, isActive: true });
      console.log('✅ Created user:', userData.username);
    }
  }

  const existingItems = await Item.find({});
  if (existingItems.length === 0) {
    const users = await User.find({});
    const demoItems = [
      {
        title: "Bose Headphones",
        description: "High-quality noise-cancelling headphones",
        price: 249,
        imageUrl: "/static/images/items/headphones.jpg",
        seller: users[0]._id,
        shipping: "Nationwide",
        location: { city: "Austin", country: "USA" }
      },
      {
        title: "Gaming Laptop",
        description: "RTX 3070, Intel i7, 16GB RAM",
        price: 1299,
        imageUrl: "/static/images/items/laptop.jpg",
        seller: users[1]._id,
        shipping: "FedEx",
        location: { city: "Houston", country: "USA" }
      },
      {
        title: "Kitchen Mixer",
        description: "Perfect for baking and everyday use",
        price: 199,
        imageUrl: "/static/images/items/mixer.jpg",
        seller: users[2]._id,
        shipping: "UPS",
        location: { city: "Dallas", country: "USA" }
      }
    ];
    await Item.insertMany(demoItems);
    console.log('✅ Seeded items with images.');
  }

  await mongoose.disconnect();
}

seedInitialData();
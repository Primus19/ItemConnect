const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');
const Category = require('./models/category.model');
const Item = require('./models/item.model');

async function seedDatabase() {
  try {
    // Create categories
    console.log('Creating categories...');
    const categories = await Category.create([
      {
        name: 'Electronics',
        description: 'Electronic devices and gadgets',
        icon: '📱',
        level: 0
      },
      {
        name: 'Furniture',
        description: 'Home and office furniture',
        icon: '🪑',
        level: 0
      },
      {
        name: 'Clothing',
        description: 'Clothes and accessories',
        icon: '👕',
        level: 0
      },
      {
        name: 'Books',
        description: 'Books, textbooks, and literature',
        icon: '📚',
        level: 0
      }
    ]);

    console.log(`Created ${categories.length} categories`);

    // Create users
    console.log('Creating users...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const users = await User.create([
      {
        username: 'johndoe',
        email: 'john@example.com',
        password: hashedPassword,
        firstName: 'John',
        lastName: 'Doe',
        location: {
          country: 'United States',
          city: 'New York',
          address: '123 Main St'
        }
      },
      {
        username: 'janedoe',
        email: 'jane@example.com',
        password: hashedPassword,
        firstName: 'Jane',
        lastName: 'Doe',
        location: {
          country: 'United States',
          city: 'Los Angeles',
          address: '456 Oak St'
        }
      }
    ]);

    console.log(`Created ${users.length} users`);

    // Create items
    console.log('Creating items...');
    const items = await Item.create([
      {
        title: 'iPhone 13 Pro',
        description: 'Like new iPhone 13 Pro, 256GB storage, Pacific Blue color. Used for 6 months, no scratches or damage.',
        categories: [categories[0]._id], // Electronics
        owner: users[0]._id, // John
        condition: 'Like New',
        price: 800,
        isFree: false,
        isNegotiable: true,
        location: users[0].location,
        images: [
          {
            url: 'https://via.placeholder.com/400?text=iPhone+13+Pro',
            caption: 'iPhone 13 Pro front view'
          }
        ],
        tags: ['iphone', 'smartphone', 'apple', 'mobile']
      },
      {
        title: 'IKEA MALM Desk',
        description: 'IKEA MALM desk in black-brown color. Great condition, 2 years old. Must pick up from my location.',
        categories: [categories[1]._id], // Furniture
        owner: users[1]._id, // Jane
        condition: 'Good',
        price: 75,
        isFree: false,
        isNegotiable: true,
        location: users[1].location,
        images: [
          {
            url: 'https://via.placeholder.com/400?text=IKEA+MALM+Desk',
            caption: 'IKEA MALM desk'
          }
        ],
        tags: ['desk', 'ikea', 'furniture', 'malm']
      },
      {
        title: 'JavaScript: The Good Parts',
        description: 'Classic JavaScript book by Douglas Crockford. In excellent condition, like new.',
        categories: [categories[3]._id], // Books
        owner: users[0]._id, // John
        condition: 'Like New',
        price: 0,
        isFree: true,
        isNegotiable: false,
        location: users[0].location,
        images: [
          {
            url: 'https://via.placeholder.com/400?text=JavaScript+The+Good+Parts',
            caption: 'JavaScript: The Good Parts book cover'
          }
        ],
        tags: ['book', 'javascript', 'programming', 'coding']
      }
    ]);

    console.log(`Created ${items.length} items`);

    // Update users with itemsListed
    await User.findByIdAndUpdate(users[0]._id, {
      $set: { itemsListed: [items[0]._id, items[2]._id] }
    });

    await User.findByIdAndUpdate(users[1]._id, {
      $set: { itemsListed: [items[1]._id] }
    });

    console.log('Updated users with their listed items');
    console.log('Database seeded successfully!');
    
    return { categories, users, items };
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Export for use in server.js
module.exports = seedDatabase;
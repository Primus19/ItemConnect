require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const itemRoutes = require('./routes/item.routes');
const chatRoutes = require('./routes/chat.routes');
const categoryRoutes = require('./routes/category.routes');
const stripeRoutes = require('./routes/stripe.routes');
const paypalRoutes = require('./routes/paypal.routes');
const seedDatabase = require('./seed');

// Initialize express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/payment', stripeRoutes);
app.use('/api/payment', paypalRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'ItemConnect API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/categories', categoryRoutes);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  // Join a chat room
  socket.on('join_chat', (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat: ${chatId}`);
  });
  
  // Send a message
  socket.on('send_message', (data) => {
    io.to(data.chatId).emit('receive_message', data);
  });
  
  // Item ping notification
  socket.on('item_search', (data) => {
    io.to(data.ownerId).emit('item_ping', data);
  });
  
  // Disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Seed the database with initial data
    console.log('Seeding database with initial data...');
    await seedDatabase();
    
    // Start server
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Server is running at http://localhost:${PORT}`);
      console.log(`API is available at http://localhost:${PORT}/api`);
      console.log('\nTest user credentials:');
      console.log('Email: john@example.com');
      console.log('Password: password123');
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

startServer();
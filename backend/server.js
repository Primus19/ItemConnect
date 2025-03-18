
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const itemRoutes = require('./routes/item.routes');
const chatRoutes = require('./routes/chat.routes');
<<<<<<< HEAD
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
=======
const categoryRoutes = require('./routes/category.routes');
const stripeRoutes = require('./routes/stripe.routes');
const paypalRoutes = require('./routes/paypal.routes');
const seedDatabase = require('./seed');
>>>>>>> 30fa407adb45d2d7f3db9506a9c95df6cd7ecaa2

const app = express();
require('./seed/startupSeeder');
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

<<<<<<< HEAD
io.on('connection', (socket) => {
  console.log('🟢 Socket connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('🔴 Socket disconnected:', socket.id);
  });
=======
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/payment', stripeRoutes);
app.use('/api/payment', paypalRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'ItemConnect API is running' });
>>>>>>> 30fa407adb45d2d7f3db9506a9c95df6cd7ecaa2
});

connectDB();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Debug logging
const logStream = fs.createWriteStream(path.join(__dirname, 'logs/debug.log'), { flags: 'a' });
app.use(morgan(':date[iso] :method :url :status :response-time ms', { stream: logStream }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/chat', chatRoutes);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

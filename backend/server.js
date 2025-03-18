
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const itemRoutes = require('./routes/item.routes');
const chatRoutes = require('./routes/chat.routes');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('🟢 Socket connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('🔴 Socket disconnected:', socket.id);
  });
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

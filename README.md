# ItemConnect

A global marketplace platform where users can list items they have and search for items they need.

![ItemConnect](https://via.placeholder.com/1200x600?text=ItemConnect+Marketplace)

## Features

- **Global Item Search**: Search for items by keywords, categories, location, price range, and condition
- **Item Listing**: Create detailed item listings with images, videos, descriptions, and pricing options
- **Real-time Chat**: Communicate with item owners and interested parties in real time
- **Categories**: Browse items by hierarchical categories
- **User Authentication**: Secure account creation and login
- **Watch Items**: Save items to your watchlist
- **Item Status Tracking**: Track items through different states (available, pending, sold)
- **Price Negotiation**: Negotiate prices through the integrated chat system
- **Free Item Exchange**: Option to list items for free

## Tech Stack

### Backend
- **Node.js & Express**: Server framework
- **MongoDB & Mongoose**: Database and ODM
- **Socket.IO**: Real-time communication
- **JWT**: Authentication
- **Bcrypt**: Password security

### Frontend
- **React**: UI library
- **Redux Toolkit**: State management
- **React Router**: Client-side routing
- **Material-UI**: Component library
- **Socket.IO Client**: Real-time communication
- **Formik & Yup**: Form handling and validation

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/itemconnect.git
cd itemconnect
```

2. Install backend dependencies:
```
cd backend
npm install
```

3. Create a `.env` file in the backend directory (use `.env.example` as a template):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/itemconnect
JWT_SECRET=your_secret_key
```

4. Install frontend dependencies:
```
cd ../frontend
npm install
```

### Running the Application

1. Start MongoDB (if using local installation):
```
mongod
```

2. Start the backend server:
```
cd backend
npm run dev
```

3. Start the frontend development server:
```
cd ../frontend
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
itemconnect/
├── backend/               # Node.js server
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Express middleware
│   ├── models/            # Mongoose models
│   └── routes/            # Express routes
│
├── frontend/              # React client
│   ├── public/            # Static files
│   └── src/               # React source files
│       ├── assets/        # Images, fonts, etc.
│       ├── components/    # Reusable components
│       ├── contexts/      # React contexts
│       ├── hooks/         # Custom React hooks
│       ├── pages/         # Page components
│       ├── redux/         # Redux state management
│       ├── services/      # API services
│       └── utils/         # Utility functions
│
└── docs/                  # Documentation
```

## Documentation

- [Architecture Overview](./docs/architecture.md)
- [API Documentation](./docs/api.md)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [https://github.com/yourusername/itemconnect](https://github.com/yourusername/itemconnect)
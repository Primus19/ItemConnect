# ItemConnect

ItemConnect is a modern marketplace application that allows users to find what they need and share what they have. This platform enables users to list items, search for items, and connect with others through a user-friendly interface.

## Features

- **User Authentication**: Secure login and registration system
- **Item Listing**: Multi-step form for listing items with image uploads
- **Search Functionality**: Advanced search with filters for categories, price range, and condition
- **Item Details**: Detailed item views with image gallery and seller information
- **Responsive Design**: Optimized for both mobile and desktop devices
- **Real-time Communication**: Connect with sellers through messaging

## Tech Stack

- **Frontend**: React, Material-UI, React Router, Formik
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time Communication**: Socket.io
- **Containerization**: Docker, Docker Compose

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your system
- Git for cloning the repository

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ItemConnect.git
   cd ItemConnect
   ```

2. Start the development environment:
   ```bash
   docker-compose up
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - MongoDB: localhost:27017

### Production Deployment

1. Build the Docker images:
   ```bash
   ./build-images.sh
   ```

2. Start the production environment:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. Access the application:
   - Frontend: http://localhost (port 80)
   - Backend API: http://localhost:5000/api

## Project Structure

```
ItemConnect/
├── backend/                # Node.js backend
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Express middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── Dockerfile          # Backend Docker configuration
│   └── server.js           # Entry point
├── frontend/               # React frontend
│   ├── public/             # Static files
│   ├── src/                # Source code
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── theme/          # Material-UI theme
│   │   ├── App.js          # Main component
│   │   └── index.js        # Entry point
│   ├── Dockerfile          # Production Docker configuration
│   ├── Dockerfile.dev      # Development Docker configuration
│   └── nginx.conf          # Nginx configuration for production
├── docker-compose.yml      # Development Docker Compose
├── docker-compose.prod.yml # Production Docker Compose
└── build-images.sh         # Script to build Docker images
```

## Environment Variables

### Backend

| Variable | Description | Default (Development) |
|----------|-------------|----------------------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| MONGODB_URI | MongoDB connection string | mongodb://mongo:27017/itemconnect |
| JWT_SECRET | Secret for JWT signing | itemconnect_jwt_secret_dev_environment_only |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:3000 |

### Frontend

| Variable | Description | Default (Development) |
|----------|-------------|----------------------|
| REACT_APP_API_URL | Backend API URL | http://localhost:5000/api |
| REACT_APP_SOCKET_URL | WebSocket URL | http://localhost:5000 |

## User Guide

### Registration and Login

1. Navigate to the registration page by clicking "Register" in the navigation bar
2. Complete the multi-step registration form with your information
3. Once registered, log in with your email and password

### Listing an Item

1. Log in to your account
2. Click "List an Item" in the navigation bar
3. Complete the multi-step form:
   - Basic Information: Title, description, and price
   - Details & Location: Condition, categories, and location
   - Images & Review: Upload images and review your listing
4. Submit your listing

### Searching for Items

1. Use the search bar on the homepage or navigate to the search page
2. Apply filters as needed:
   - Categories
   - Price range
   - Condition
   - Location
3. Browse through the search results
4. Click on an item to view details

### Viewing Item Details

1. Click on an item from the search results or homepage
2. View detailed information about the item
3. See seller information and ratings
4. Contact the seller or add the item to your watchlist

### Contacting a Seller

1. Navigate to an item's detail page
2. Click "Contact Seller"
3. Send a message to the seller about the item

## Troubleshooting

### Common Issues

1. **Docker containers not starting**
   - Check if ports 3000, 5000, or 27017 are already in use
   - Ensure Docker is running on your system

2. **Database connection issues**
   - Verify MongoDB container is running
   - Check MongoDB connection string in environment variables

3. **Login issues**
   - Clear browser cookies and cache
   - Ensure you're using the correct email and password

### Getting Help

If you encounter any issues not covered here, please:
1. Check the console logs for error messages
2. Refer to the documentation for the specific component
3. Contact support at support@itemconnect.example.com

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the component library
- React team for the frontend framework
- Node.js and Express.js for the backend framework
- MongoDB for the database
- Docker for containerization

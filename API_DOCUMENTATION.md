# ItemConnect API Documentation

This document provides detailed information about the ItemConnect API endpoints, request/response formats, and authentication requirements.

## Base URL

- Development: `http://localhost:5000/api`
- Production: `https://your-domain.com/api`

## Authentication

Most API endpoints require authentication using JSON Web Tokens (JWT).

### Headers

Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Getting a Token

To obtain a JWT token, use the login endpoint.

## API Endpoints

### Authentication

#### Register a new user

```
POST /auth/register
```

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "username": "johndoe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### Login

```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "username": "johndoe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### Get Current User

```
GET /auth/user
```

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "username": "johndoe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "createdAt": "2023-06-18T14:30:00.000Z"
  }
}
```

### Items

#### Get All Items

```
GET /items
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `keyword` (optional): Search term
- `category` (optional): Category ID
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price
- `condition` (optional): Item condition
- `isFree` (optional): Boolean for free items
- `sortBy` (optional): Field to sort by (default: createdAt)
- `order` (optional): Sort order (asc/desc, default: desc)

**Response:**
```json
{
  "success": true,
  "count": 50,
  "pagination": {
    "current": 1,
    "total": 5,
    "hasMore": true
  },
  "items": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "title": "iPhone 13 Pro",
      "description": "Excellent condition, barely used.",
      "price": 699,
      "isFree": false,
      "condition": "Like New",
      "images": ["https://example.com/image1.jpg"],
      "categories": [
        {
          "_id": "60d21b4667d0d8992e610c85",
          "name": "Electronics"
        }
      ],
      "owner": {
        "_id": "60d21b4667d0d8992e610c85",
        "username": "techuser",
        "rating": 4.8
      },
      "createdAt": "2023-06-18T14:30:00.000Z"
    }
    // More items...
  ]
}
```

#### Get Item by ID

```
GET /items/:id
```

**Response:**
```json
{
  "success": true,
  "item": {
    "_id": "60d21b4667d0d8992e610c85",
    "title": "iPhone 13 Pro",
    "description": "Excellent condition, barely used.",
    "price": 699,
    "isFree": false,
    "condition": "Like New",
    "status": "available",
    "images": ["https://example.com/image1.jpg"],
    "categories": [
      {
        "_id": "60d21b4667d0d8992e610c85",
        "name": "Electronics"
      }
    ],
    "location": {
      "country": "United States",
      "city": "San Francisco"
    },
    "owner": {
      "_id": "60d21b4667d0d8992e610c85",
      "username": "techuser",
      "firstName": "Tech",
      "lastName": "User",
      "rating": 4.8
    },
    "createdAt": "2023-06-18T14:30:00.000Z",
    "viewCount": 245,
    "favoriteCount": 18
  }
}
```

#### Create Item

```
POST /items
```

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: multipart/form-data
```

**Request Body:**
```
title: iPhone 13 Pro
description: Excellent condition, barely used.
price: 699
isFree: false
condition: Like New
categories: ["60d21b4667d0d8992e610c85"]
location[country]: United States
location[city]: San Francisco
location[address]: Mission District
images: [file1, file2, ...]
```

**Response:**
```json
{
  "success": true,
  "item": {
    "_id": "60d21b4667d0d8992e610c85",
    "title": "iPhone 13 Pro",
    "description": "Excellent condition, barely used.",
    "price": 699,
    "isFree": false,
    "condition": "Like New",
    "images": ["https://example.com/image1.jpg"],
    "categories": [
      {
        "_id": "60d21b4667d0d8992e610c85",
        "name": "Electronics"
      }
    ],
    "location": {
      "country": "United States",
      "city": "San Francisco",
      "address": "Mission District"
    },
    "owner": "60d21b4667d0d8992e610c85",
    "createdAt": "2023-06-18T14:30:00.000Z"
  }
}
```

#### Update Item

```
PUT /items/:id
```

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: multipart/form-data
```

**Request Body:**
Same as Create Item, but fields are optional.

**Response:**
```json
{
  "success": true,
  "item": {
    "_id": "60d21b4667d0d8992e610c85",
    "title": "iPhone 13 Pro Max",
    "description": "Updated description.",
    "price": 799,
    "isFree": false,
    "condition": "Like New",
    "images": ["https://example.com/image1.jpg"],
    "categories": [
      {
        "_id": "60d21b4667d0d8992e610c85",
        "name": "Electronics"
      }
    ],
    "location": {
      "country": "United States",
      "city": "San Francisco",
      "address": "Mission District"
    },
    "owner": "60d21b4667d0d8992e610c85",
    "updatedAt": "2023-06-19T10:15:00.000Z"
  }
}
```

#### Delete Item

```
DELETE /items/:id
```

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Item deleted successfully"
}
```

### Categories

#### Get All Categories

```
GET /categories
```

**Response:**
```json
{
  "success": true,
  "categories": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "Electronics",
      "description": "Electronic devices and gadgets"
    },
    {
      "_id": "60d21b4667d0d8992e610c86",
      "name": "Furniture",
      "description": "Home and office furniture"
    }
    // More categories...
  ]
}
```

### User Profile

#### Get User Profile

```
GET /users/:id
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "username": "johndoe",
    "firstName": "John",
    "lastName": "Doe",
    "rating": 4.7,
    "itemsCount": 12,
    "joinedDate": "2023-01-15T10:00:00.000Z"
  }
}
```

#### Get User Items

```
GET /users/:id/items
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "count": 12,
  "pagination": {
    "current": 1,
    "total": 2,
    "hasMore": true
  },
  "items": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "title": "iPhone 13 Pro",
      "description": "Excellent condition, barely used.",
      "price": 699,
      "isFree": false,
      "condition": "Like New",
      "images": ["https://example.com/image1.jpg"],
      "createdAt": "2023-06-18T14:30:00.000Z"
    }
    // More items...
  ]
}
```

### Watchlist

#### Get Watchlist

```
GET /watchlist
```

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "items": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "title": "iPhone 13 Pro",
      "description": "Excellent condition, barely used.",
      "price": 699,
      "isFree": false,
      "condition": "Like New",
      "images": ["https://example.com/image1.jpg"],
      "owner": {
        "_id": "60d21b4667d0d8992e610c85",
        "username": "techuser"
      },
      "createdAt": "2023-06-18T14:30:00.000Z"
    }
    // More items...
  ]
}
```

#### Add Item to Watchlist

```
POST /watchlist/:itemId
```

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Item added to watchlist"
}
```

#### Remove Item from Watchlist

```
DELETE /watchlist/:itemId
```

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Item removed from watchlist"
}
```

### Messages

#### Get Conversations

```
GET /messages/conversations
```

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "conversations": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "participant": {
        "_id": "60d21b4667d0d8992e610c85",
        "username": "johndoe",
        "firstName": "John",
        "lastName": "Doe"
      },
      "item": {
        "_id": "60d21b4667d0d8992e610c85",
        "title": "iPhone 13 Pro"
      },
      "lastMessage": {
        "content": "Is this still available?",
        "sender": "60d21b4667d0d8992e610c85",
        "createdAt": "2023-06-18T14:30:00.000Z"
      },
      "unreadCount": 2
    }
    // More conversations...
  ]
}
```

#### Get Messages for Conversation

```
GET /messages/conversations/:conversationId
```

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Response:**
```json
{
  "success": true,
  "conversation": {
    "_id": "60d21b4667d0d8992e610c85",
    "participant": {
      "_id": "60d21b4667d0d8992e610c85",
      "username": "johndoe",
      "firstName": "John",
      "lastName": "Doe"
    },
    "item": {
      "_id": "60d21b4667d0d8992e610c85",
      "title": "iPhone 13 Pro",
      "price": 699,
      "images": ["https://example.com/image1.jpg"]
    }
  },
  "messages": [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "content": "Is this still available?",
      "sender": "60d21b4667d0d8992e610c85",
      "createdAt": "2023-06-18T14:30:00.000Z"
    },
    {
      "_id": "60d21b4667d0d8992e610c86",
      "content": "Yes, it is! Are you interested?",
      "sender": "60d21b4667d0d8992e610c87",
      "createdAt": "2023-06-18T14:35:00.000Z"
    }
    // More messages...
  ]
}
```

#### Send Message

```
POST /messages
```

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Request Body:**
```json
{
  "recipient": "60d21b4667d0d8992e610c85",
  "content": "Is this still available?",
  "item": "60d21b4667d0d8992e610c85"
}
```

**Response:**
```json
{
  "success": true,
  "message": {
    "_id": "60d21b4667d0d8992e610c85",
    "content": "Is this still available?",
    "sender": "60d21b4667d0d8992e610c86",
    "recipient": "60d21b4667d0d8992e610c85",
    "conversation": "60d21b4667d0d8992e610c87",
    "item": "60d21b4667d0d8992e610c85",
    "createdAt": "2023-06-18T14:30:00.000Z"
  }
}
```

## Error Responses

All API endpoints return standard error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

### Common Error Codes

- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Missing or invalid authentication token
- `403 Forbidden`: Not authorized to perform the action
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Rate Limiting

API requests are limited to 100 requests per IP address per hour. When the limit is exceeded, you'll receive a 429 Too Many Requests response.

## Websocket Events

The application uses Socket.IO for real-time communication.

### Connection

Connect to the WebSocket server:

```javascript
const socket = io('http://localhost:5000', {
  query: {
    token: 'your_jwt_token'
  }
});
```

### Events

#### Message Events

- `message:new`: Emitted when a new message is received
  ```javascript
  socket.on('message:new', (message) => {
    console.log('New message:', message);
  });
  ```

- `message:read`: Emitted when a message is marked as read
  ```javascript
  socket.on('message:read', (data) => {
    console.log('Message read:', data);
  });
  ```

#### Item Events

- `item:update`: Emitted when an item is updated
  ```javascript
  socket.on('item:update', (item) => {
    console.log('Item updated:', item);
  });
  ```

- `item:statusChange`: Emitted when an item's status changes
  ```javascript
  socket.on('item:statusChange', (data) => {
    console.log('Item status changed:', data);
  });
  ```

## Pagination

Most endpoints that return lists support pagination:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

The response includes pagination information:

```json
{
  "pagination": {
    "current": 1,
    "total": 5,
    "hasMore": true
  }
}
```

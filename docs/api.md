# ItemConnect API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer {token}
```

### Register a New User
```
POST /auth/register
```

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "location": {
    "country": "United States",
    "city": "New York",
    "address": "123 Main St"
  }
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "avatar": null,
    "location": {
      "country": "United States",
      "city": "New York",
      "address": "123 Main St"
    }
  }
}
```

### Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "avatar": null,
    "location": {
      "country": "United States",
      "city": "New York",
      "address": "123 Main St"
    }
  }
}
```

### Get User Profile
```
GET /auth/profile
```

**Response:**
```json
{
  "id": "user_id",
  "username": "johndoe",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "avatar": "avatar_url",
  "location": {
    "country": "United States",
    "city": "New York",
    "address": "123 Main St"
  },
  "bio": "User bio here",
  "rating": 4.5,
  "reviews": [],
  "itemsListed": [
    {
      "id": "item_id",
      "title": "Item Title",
      "description": "Item Description",
      "images": [
        {
          "url": "image_url",
          "caption": "Image Caption"
        }
      ],
      "status": "available"
    }
  ]
}
```

### Update User Profile
```
PUT /auth/profile
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Updated bio",
  "location": {
    "country": "United States",
    "city": "New York",
    "address": "456 New St"
  }
}
```

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "avatar": null,
    "location": {
      "country": "United States",
      "city": "New York",
      "address": "456 New St"
    },
    "bio": "Updated bio"
  }
}
```

## Items

### Get All Items
```
GET /items
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Number of items per page (default: 10)
- `sortBy`: Field to sort by (default: createdAt)
- `sortOrder`: Sort order (asc or desc, default: desc)
- `categories`: Comma-separated list of category IDs
- `condition`: Item condition
- `minPrice`: Minimum price
- `maxPrice`: Maximum price
- `isFree`: Boolean for free items
- `location`: Country name
- `search`: Text search query

**Response:**
```json
{
  "items": [
    {
      "_id": "item_id",
      "title": "Item Title",
      "description": "Item Description",
      "price": 100,
      "isFree": false,
      "isNegotiable": true,
      "condition": "Good",
      "images": [
        {
          "url": "image_url",
          "caption": "Image Caption"
        }
      ],
      "owner": {
        "_id": "user_id",
        "username": "johndoe",
        "avatar": "avatar_url",
        "rating": 4.5
      },
      "categories": [
        {
          "_id": "category_id",
          "name": "Category Name"
        }
      ],
      "location": {
        "country": "United States",
        "city": "New York",
        "address": "123 Main St"
      },
      "createdAt": "2023-01-01T00:00:00.000Z",
      "status": "available",
      "viewCount": 10,
      "favoriteCount": 5
    }
  ],
  "totalPages": 5,
  "currentPage": 1,
  "totalItems": 50
}
```

### Get Item by ID
```
GET /items/:id
```

**Response:**
```json
{
  "_id": "item_id",
  "title": "Item Title",
  "description": "Item Description",
  "price": 100,
  "isFree": false,
  "isNegotiable": true,
  "condition": "Good",
  "images": [
    {
      "url": "image_url",
      "caption": "Image Caption"
    }
  ],
  "videos": [
    {
      "url": "video_url",
      "caption": "Video Caption"
    }
  ],
  "owner": {
    "_id": "user_id",
    "username": "johndoe",
    "avatar": "avatar_url",
    "rating": 4.5,
    "location": {
      "country": "United States",
      "city": "New York"
    }
  },
  "categories": [
    {
      "_id": "category_id",
      "name": "Category Name"
    }
  ],
  "location": {
    "country": "United States",
    "city": "New York",
    "address": "123 Main St"
  },
  "createdAt": "2023-01-01T00:00:00.000Z",
  "status": "available",
  "viewCount": 10,
  "favoriteCount": 5,
  "tags": ["tag1", "tag2"]
}
```

### Create Item
```
POST /items
```

**Request Body:**
```json
{
  "title": "New Item",
  "description": "Item Description",
  "categories": ["category_id1", "category_id2"],
  "condition": "New",
  "price": 200,
  "isFree": false,
  "isNegotiable": true,
  "location": {
    "country": "United States",
    "city": "New York",
    "address": "123 Main St"
  },
  "images": [
    {
      "url": "image_url",
      "caption": "Image Caption"
    }
  ],
  "videos": [
    {
      "url": "video_url",
      "caption": "Video Caption"
    }
  ],
  "tags": ["tag1", "tag2"]
}
```

**Response:**
```json
{
  "_id": "new_item_id",
  "title": "New Item",
  "description": "Item Description",
  "categories": ["category_id1", "category_id2"],
  "owner": "user_id",
  "condition": "New",
  "price": 200,
  "isFree": false,
  "isNegotiable": true,
  "location": {
    "country": "United States",
    "city": "New York",
    "address": "123 Main St"
  },
  "images": [
    {
      "url": "image_url",
      "caption": "Image Caption"
    }
  ],
  "videos": [
    {
      "url": "video_url",
      "caption": "Video Caption"
    }
  ],
  "tags": ["tag1", "tag2"],
  "status": "available",
  "viewCount": 0,
  "favoriteCount": 0,
  "searchCount": 0,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### Update Item
```
PUT /items/:id
```

**Request Body:**
```json
{
  "title": "Updated Item",
  "description": "Updated Description",
  "price": 250,
  "condition": "Like New"
}
```

**Response:**
```json
{
  "_id": "item_id",
  "title": "Updated Item",
  "description": "Updated Description",
  "price": 250,
  "condition": "Like New",
  "isFree": false,
  "isNegotiable": true,
  "location": {
    "country": "United States",
    "city": "New York",
    "address": "123 Main St"
  },
  "images": [
    {
      "url": "image_url",
      "caption": "Image Caption"
    }
  ],
  "videos": [
    {
      "url": "video_url",
      "caption": "Video Caption"
    }
  ],
  "tags": ["tag1", "tag2"],
  "status": "available",
  "viewCount": 10,
  "favoriteCount": 5,
  "searchCount": 2,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### Delete Item
```
DELETE /items/:id
```

**Response:**
```json
{
  "message": "Item deleted successfully"
}
```

### Watch Item
```
POST /items/:id/watch
```

**Response:**
```json
{
  "message": "Item added to watchlist"
}
```

### Unwatch Item
```
DELETE /items/:id/watch
```

**Response:**
```json
{
  "message": "Item removed from watchlist"
}
```

## Categories

### Get All Categories
```
GET /categories
```

**Response:**
```json
[
  {
    "_id": "category_id",
    "name": "Electronics",
    "description": "Electronic devices",
    "icon": "icon_name",
    "parent": null,
    "level": 0,
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

### Get Hierarchical Categories
```
GET /categories/hierarchical
```

**Response:**
```json
[
  {
    "_id": "category_id",
    "name": "Electronics",
    "description": "Electronic devices",
    "icon": "icon_name",
    "parent": null,
    "level": 0,
    "isActive": true,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z",
    "children": [
      {
        "_id": "subcategory_id",
        "name": "Smartphones",
        "description": "Mobile phones",
        "icon": "icon_name",
        "parent": "category_id",
        "level": 1,
        "isActive": true,
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z",
        "children": []
      }
    ]
  }
]
```

### Get Category by ID
```
GET /categories/:id
```

**Response:**
```json
{
  "_id": "category_id",
  "name": "Electronics",
  "description": "Electronic devices",
  "icon": "icon_name",
  "parent": null,
  "level": 0,
  "isActive": true,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

## Chats

### Create or Get Chat
```
POST /chats
```

**Request Body:**
```json
{
  "itemId": "item_id"
}
```

**Response:**
```json
{
  "_id": "chat_id",
  "item": {
    "_id": "item_id",
    "title": "Item Title",
    "images": [
      {
        "url": "image_url"
      }
    ],
    "price": 100,
    "status": "available"
  },
  "owner": {
    "_id": "owner_id",
    "username": "itemowner",
    "avatar": "avatar_url"
  },
  "inquirer": {
    "_id": "inquirer_id",
    "username": "johndoe",
    "avatar": "avatar_url"
  },
  "messages": [],
  "isActive": true,
  "status": "open",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### Get User Chats
```
GET /chats
```

**Response:**
```json
[
  {
    "_id": "chat_id",
    "item": {
      "_id": "item_id",
      "title": "Item Title",
      "images": [
        {
          "url": "image_url"
        }
      ],
      "price": 100,
      "status": "available"
    },
    "owner": {
      "_id": "owner_id",
      "username": "itemowner",
      "avatar": "avatar_url"
    },
    "inquirer": {
      "_id": "inquirer_id",
      "username": "johndoe",
      "avatar": "avatar_url"
    },
    "messages": [
      {
        "_id": "message_id",
        "sender": "user_id",
        "content": "Message content",
        "isRead": false,
        "createdAt": "2023-01-01T00:00:00.000Z"
      }
    ],
    "isActive": true,
    "status": "open",
    "lastMessage": "2023-01-01T00:00:00.000Z",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

### Get Chat by ID
```
GET /chats/:id
```

**Response:**
```json
{
  "_id": "chat_id",
  "item": {
    "_id": "item_id",
    "title": "Item Title",
    "description": "Item Description",
    "images": [
      {
        "url": "image_url"
      }
    ],
    "price": 100,
    "status": "available"
  },
  "owner": {
    "_id": "owner_id",
    "username": "itemowner",
    "avatar": "avatar_url"
  },
  "inquirer": {
    "_id": "inquirer_id",
    "username": "johndoe",
    "avatar": "avatar_url"
  },
  "messages": [
    {
      "_id": "message_id",
      "sender": "user_id",
      "content": "Message content",
      "isRead": true,
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "isActive": true,
  "status": "open",
  "lastMessage": "2023-01-01T00:00:00.000Z",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### Add Message to Chat
```
POST /chats/:id/messages
```

**Request Body:**
```json
{
  "content": "Message content",
  "attachments": []
}
```

**Response:**
```json
{
  "_id": "message_id",
  "sender": {
    "_id": "user_id",
    "username": "johndoe",
    "avatar": "avatar_url"
  },
  "content": "Message content",
  "isRead": false,
  "attachments": [],
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

### Update Chat Status
```
PUT /chats/:id/status
```

**Request Body:**
```json
{
  "status": "negotiating",
  "finalPrice": 90
}
```

**Response:**
```json
{
  "_id": "chat_id",
  "status": "negotiating",
  "finalPrice": 90,
  "item": "item_id",
  "owner": "owner_id",
  "inquirer": "inquirer_id",
  "isActive": true,
  "lastMessage": "2023-01-01T00:00:00.000Z",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

## WebSocket Events

### Connection
```javascript
// Connect to WebSocket
const socket = io('http://localhost:5000');
```

### Join Chat Room
```javascript
// Join a specific chat room
socket.emit('join_chat', chatId);
```

### Send Message
```javascript
// Send a message to a chat
socket.emit('send_message', {
  chatId: 'chat_id',
  content: 'Message content',
  sender: 'user_id'
});
```

### Receive Message
```javascript
// Listen for incoming messages
socket.on('receive_message', (message) => {
  console.log('New message:', message);
});
```

### Item Search Notification
```javascript
// Notify item owner when someone searches for their item
socket.emit('item_search', {
  ownerId: 'owner_id',
  itemId: 'item_id',
  searcherId: 'searcher_id'
});
```

### Item Ping Notification
```javascript
// Listen for item search notifications
socket.on('item_ping', (data) => {
  console.log('Your item was searched:', data);
});
```
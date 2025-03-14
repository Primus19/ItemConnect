import api from './api';

const itemService = {
  // Get all items with filtering and pagination
  getItems: (params) => {
    return api.get('/items', { params });
  },
  
  // Get item by id
  getItemById: (id) => {
    return api.get(`/items/${id}`);
  },
  
  // Create new item
  createItem: (itemData) => {
    return api.post('/items', itemData);
  },
  
  // Update item
  updateItem: (id, itemData) => {
    return api.put(`/items/${id}`, itemData);
  },
  
  // Delete item
  deleteItem: (id) => {
    return api.delete(`/items/${id}`);
  },
  
  // Add item to watchlist
  watchItem: (id) => {
    return api.post(`/items/${id}/watch`);
  },
  
  // Remove item from watchlist
  unwatchItem: (id) => {
    return api.delete(`/items/${id}/watch`);
  },
  
  // Upload item image
  uploadImage: (formData) => {
    return api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

export default itemService;
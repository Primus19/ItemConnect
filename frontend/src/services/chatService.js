import api from './api';

const chatService = {
  // Create or get a chat
  createOrGetChat: (itemId) => {
    return api.post('/chats', { itemId });
  },
  
  // Get all user chats
  getUserChats: () => {
    return api.get('/chats');
  },
  
  // Get chat by id
  getChatById: (id) => {
    return api.get(`/chats/${id}`);
  },
  
  // Add message to chat
  addMessage: (id, messageData) => {
    return api.post(`/chats/${id}/messages`, messageData);
  },
  
  // Update chat status
  updateChatStatus: (id, statusData) => {
    return api.put(`/chats/${id}/status`, statusData);
  }
};

export default chatService;
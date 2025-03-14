import api from './api';

const authService = {
  // Register new user
  register: (userData) => {
    return api.post('/auth/register', userData);
  },
  
  // Login user
  login: (credentials) => {
    return api.post('/auth/login', credentials);
  },
  
  // Get current user profile
  getProfile: () => {
    return api.get('/auth/profile');
  },
  
  // Update user profile
  updateProfile: (userData) => {
    return api.put('/auth/profile', userData);
  }
};

export default authService;
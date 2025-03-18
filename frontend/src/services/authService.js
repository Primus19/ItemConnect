import api from './api';

const authService = {
  // Register new user
  register: (userData) => {
    return api.post('/auth/register', userData)
      .then(response => {
        // Ensure we're returning the data in a consistent format
        return {
          data: response.data,
          token: response.data.token,
          user: response.data.user
        };
      });
  },
  
  // Login user
  login: (credentials) => {
    // Ensure we're using email for authentication as expected by backend
    return api.post('/auth/login', credentials)
      .then(response => {
        // Ensure we're returning the data in a consistent format
        return {
          data: response.data,
          token: response.data.token,
          user: response.data.user
        };
      });
  },
  
  // Get current user profile
  getProfile: () => {
    return api.get('/auth/profile');
  },
  
  // Update user profile
  updateProfile: (userData) => {
    return api.put('/auth/profile', userData);
  },
  
  // Refresh token if needed
  refreshToken: () => {
    const token = localStorage.getItem('token');
    if (!token) return Promise.reject('No token found');
    
    return api.post('/auth/refresh-token');
  }
};

export default authService;

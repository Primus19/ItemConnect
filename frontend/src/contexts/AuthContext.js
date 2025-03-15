import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Function to fetch user profile
  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await authService.getProfile();
      setCurrentUser(response.data);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setCurrentUser(null);
      throw error;
    }
  }, []);

  // Check authentication status on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile()
        .catch(() => {
          // Token might be invalid or expired
          setAuthError('Session expired. Please login again.');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [fetchUserProfile]);

  // Login function
  const login = async (credentials) => {
    try {
      setAuthError(null);
      const response = await authService.login(credentials);
      const { token, user } = response.data;
      
      // Save token to localStorage
      localStorage.setItem('token', token);
      
      // Update state
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      return user;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      setAuthError(errorMessage);
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setAuthError(null);
      const response = await authService.register(userData);
      const { token, user } = response.data;
      
      // Save token to localStorage
      localStorage.setItem('token', token);
      
      // Update state
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      return user;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      setAuthError(errorMessage);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Update profile function
  const updateProfile = async (userData) => {
    try {
      setAuthError(null);
      const response = await authService.updateProfile(userData);
      setCurrentUser(response.data.user);
      return response.data.user;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update profile.';
      setAuthError(errorMessage);
      throw error;
    }
  };

  // Clear auth errors
  const clearAuthError = () => {
    setAuthError(null);
  };

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    authError,
    login,
    register,
    logout,
    updateProfile,
    clearAuthError,
    refreshUser: fetchUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

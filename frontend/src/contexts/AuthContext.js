import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Computed property to check if user is authenticated
  const isAuthenticated = Boolean(user);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData && userData !== "undefined") {
        try {
          // Safely parse the user data with error handling
          const parsedUserData = JSON.parse(userData);
          setUser(parsedUserData);
        } catch (error) {
          console.error('Failed to parse user data from localStorage:', error);
          // Clear invalid data from localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  const clearAuthError = () => {
    setAuthError(null);
  };

  const login = async (credentials) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const response = await authService.login(credentials);
      
      // Access token and user directly from the response
      const { token, user } = response;
      
      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      } else {
        throw new Error('Invalid response format from login');
      }
      
      return response;
    } catch (err) {
      console.error('❌ Login failed:', err);
      setAuthError(err.response?.data?.message || 'Failed to login. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const response = await authService.register(userData);
      
      // Access token and user directly from the response
      const { token, user } = response;
      
      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      } else {
        throw new Error('Invalid response format from register');
      }
      
      return response;
    } catch (err) {
      console.error('❌ Registration failed:', err);
      setAuthError(err.response?.data?.message || 'Failed to register. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        currentUser: user, // Add currentUser alias for consistency
        login, 
        logout, 
        register,
        isLoading, 
        authError,
        clearAuthError,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

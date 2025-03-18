<<<<<<< HEAD
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
=======
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
>>>>>>> 30fa407adb45d2d7f3db9506a9c95df6cd7ecaa2
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

<<<<<<< HEAD
  // Computed property to check if user is authenticated
  const isAuthenticated = Boolean(user);
=======
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(null);
>>>>>>> 30fa407adb45d2d7f3db9506a9c95df6cd7ecaa2

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
<<<<<<< HEAD
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
=======
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
>>>>>>> 30fa407adb45d2d7f3db9506a9c95df6cd7ecaa2
    }
  }, [fetchUserProfile]);

  const clearAuthError = () => {
    setAuthError(null);
  };

  const login = async (credentials) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      setAuthError(null);
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
      
<<<<<<< HEAD
      return response;
    } catch (err) {
      console.error('❌ Login failed:', err);
      setAuthError(err.response?.data?.message || 'Failed to login. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
=======
      return user;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      setAuthError(errorMessage);
      throw error;
>>>>>>> 30fa407adb45d2d7f3db9506a9c95df6cd7ecaa2
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      setAuthError(null);
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
      
<<<<<<< HEAD
      return response;
    } catch (err) {
      console.error('❌ Registration failed:', err);
      setAuthError(err.response?.data?.message || 'Failed to register. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
=======
      return user;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      setAuthError(errorMessage);
      throw error;
>>>>>>> 30fa407adb45d2d7f3db9506a9c95df6cd7ecaa2
    }
  };

  const logout = () => {
    try {
<<<<<<< HEAD
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

=======
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

>>>>>>> 30fa407adb45d2d7f3db9506a9c95df6cd7ecaa2
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
<<<<<<< HEAD
};

export const useAuth = () => useContext(AuthContext);
=======
}
>>>>>>> 30fa407adb45d2d7f3db9506a9c95df6cd7ecaa2

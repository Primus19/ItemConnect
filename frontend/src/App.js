import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
<<<<<<< HEAD

import theme from './theme';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import ItemDetailPage from './pages/ItemDetailPage';
import NewItemPage from './pages/NewItemPage';
=======
import theme from './theme';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import NewItemPage from './pages/NewItemPage';
import ItemDetailPage from './pages/ItemDetailPage';
>>>>>>> 30fa407adb45d2d7f3db9506a9c95df6cd7ecaa2

// Protected route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
<<<<<<< HEAD
      <Router>
        <AuthProvider>
          <SocketProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
=======
      <AuthProvider>
        <Router>
          <SocketProvider>
            <Routes>
>>>>>>> 30fa407adb45d2d7f3db9506a9c95df6cd7ecaa2
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/items/:id" element={<ItemDetailPage />} />
<<<<<<< HEAD
              
              {/* Protected routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
=======
>>>>>>> 30fa407adb45d2d7f3db9506a9c95df6cd7ecaa2
              <Route 
                path="/items/new" 
                element={
                  <ProtectedRoute>
                    <NewItemPage />
                  </ProtectedRoute>
                } 
              />
<<<<<<< HEAD
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </SocketProvider>
        </AuthProvider>
      </Router>
=======
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </SocketProvider>
        </Router>
      </AuthProvider>
>>>>>>> 30fa407adb45d2d7f3db9506a9c95df6cd7ecaa2
    </ThemeProvider>
  );
}

export default App;

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const { isAuthenticated, currentUser } = useAuth();

  useEffect(() => {
    // Only connect to socket if user is authenticated
    if (isAuthenticated && currentUser) {
      // Replace with prod socket URL if needed
      const SOCKET_URL = 'http://localhost:5000';
      console.log('Socket URL:', SOCKET_URL); // Debug log
      
      // Create socket connection
      const newSocket = io(SOCKET_URL, {
        auth: {
          token: localStorage.getItem('token')
        }
      });

      // Socket event listeners
      newSocket.on('connect', () => {
        console.log('Socket connected');
        setConnected(true);
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
        setConnected(false);
      });

      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        setConnected(false);
      });

      // Set socket in state
      setSocket(newSocket);

      // Clean up on unmount
      return () => {
        newSocket.disconnect();
      };
    } else if (socket) {
      // Disconnect socket if user logs out
      socket.disconnect();
      setSocket(null);
      setConnected(false);
    }
  }, [isAuthenticated, currentUser, socket]);

  // Join a specific chat room
  const joinChat = (chatId) => {
    if (socket && chatId) {
      socket.emit('join_chat', chatId);
    }
  };

  // Send a message
  const sendMessage = (data) => {
    if (socket) {
      socket.emit('send_message', data);
    }
  };

  // Item search notification
  const pingItemOwner = (data) => {
    if (socket) {
      socket.emit('item_search', data);
    }
  };

  const value = {
    socket,
    connected,
    joinChat,
    sendMessage,
    pingItemOwner
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}

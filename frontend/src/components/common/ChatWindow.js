
import React, { useEffect, useRef, useState } from 'react';
import {
  Avatar, Box, Typography, TextField, IconButton, Paper
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from '../../contexts/AuthContext';
import { io } from 'socket.io-client';

const ChatWindow = ({ recipient, onClose }) => {
  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_API_URL);
    socketRef.current.emit('join', currentUser._id);

    socketRef.current.on('chat message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => socketRef.current.disconnect();
  }, [currentUser]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const msg = {
      from: currentUser._id,
      to: recipient._id,
      text: message,
      avatar: currentUser.avatar,
      createdAt: new Date()
    };
    socketRef.current.emit('chat message', msg);
    setMessages(prev => [...prev, msg]);
    setMessage('');
  };

  return (
    <Paper elevation={4} sx={{ position: 'fixed', bottom: 0, right: 0, width: 360, height: 400, zIndex: 9999, p: 2, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Avatar src={recipient.avatar} sx={{ mr: 1 }} />
        <Typography variant="subtitle1">{recipient.username}</Typography>
        <IconButton sx={{ ml: 'auto' }} onClick={onClose}>✖️</IconButton>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', mb: 1 }}>
        {messages.map((msg, idx) => (
          <Box key={idx} sx={{ display: 'flex', mb: 1, flexDirection: msg.from === currentUser._id ? 'row-reverse' : 'row' }}>
            <Avatar src={msg.avatar} sx={{ mx: 1, width: 28, height: 28 }} />
            <Paper sx={{ px: 1.5, py: 0.5, backgroundColor: '#f5f5f5' }}>{msg.text}</Paper>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex' }}>
        <TextField
          size="small"
          fullWidth
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <IconButton onClick={sendMessage}><SendIcon /></IconButton>
      </Box>
    </Paper>
  );
};

export default ChatWindow;

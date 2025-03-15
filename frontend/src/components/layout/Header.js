
import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar, Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" color="default" elevation={2}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
          ItemConnect
        </Typography>

        <Box>
          {currentUser ? (
            <>
              <IconButton onClick={handleMenuOpen} color="inherit">
                <Avatar
                  src={(currentUser && currentUser.avatar) ? currentUser.avatar : '/static/images/avatar/default.jpg'}
                  alt={(currentUser && currentUser.username) ? currentUser.username : 'User'}
                  sx={{ width: 40, height: 40, border: `2px solid ${theme.palette.primary.main}` }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Box>
              <Button onClick={() => navigate('/login')} color="inherit">Login</Button>
              <Button onClick={() => navigate('/register')} color="inherit">Sign Up</Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

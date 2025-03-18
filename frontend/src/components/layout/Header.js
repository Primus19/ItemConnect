<<<<<<< HEAD
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar, Button, Menu, MenuItem, Badge, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, useMediaQuery, Container } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '@mui/material/styles';
import { 
  Menu as MenuIcon, 
  Notifications as NotificationsIcon,
  Dashboard as DashboardIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Message as MessageIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
=======

import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar, Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '@mui/material/styles';
>>>>>>> 30fa407adb45d2d7f3db9506a9c95df6cd7ecaa2

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
<<<<<<< HEAD
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  
  const handleNotificationsOpen = (event) => setNotificationsAnchorEl(event.currentTarget);
  const handleNotificationsClose = () => setNotificationsAnchorEl(null);
  
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  
  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
    setMobileOpen(false);
  };
  
  const handleLogout = () => {
    logout();
    handleMenuClose();
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          ItemConnect
        </Typography>
      </Box>
      <Divider />
      <List>
        {currentUser ? (
          <>
            <ListItem button onClick={() => handleNavigation('/dashboard')}>
              <ListItemIcon><DashboardIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/search')}>
              <ListItemIcon><SearchIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Browse Items" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/items/new')}>
              <ListItemIcon><AddIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Add Item" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/messages')}>
              <ListItemIcon><MessageIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Messages" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => handleNavigation('/profile')}>
              <ListItemIcon><PersonIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/settings')}>
              <ListItemIcon><SettingsIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon><LogoutIcon color="error" /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button onClick={() => handleNavigation('/login')}>
              <ListItemIcon><PersonIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/register')}>
              <ListItemIcon><AddIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Sign Up" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" color="default" elevation={2} sx={{ backgroundColor: 'background.paper' }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2 } }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography 
            variant="h6" 
            onClick={() => navigate('/')} 
            sx={{ 
              cursor: 'pointer', 
              fontWeight: 'bold',
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            ItemConnect
          </Typography>

          {!isMobile && currentUser && (
            <Box sx={{ display: 'flex', mx: 2, flexGrow: 1 }}>
              <Button 
                color="inherit" 
                onClick={() => navigate('/dashboard')}
                sx={{ mx: 1 }}
              >
                Dashboard
              </Button>
              <Button 
                color="inherit" 
                onClick={() => navigate('/search')}
                sx={{ mx: 1 }}
              >
                Browse Items
              </Button>
              <Button 
                color="inherit" 
                onClick={() => navigate('/items/new')}
                sx={{ mx: 1 }}
              >
                Add Item
              </Button>
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {currentUser ? (
              <>
                <IconButton 
                  color="inherit" 
                  aria-label="notifications"
                  onClick={handleNotificationsOpen}
                  sx={{ mr: 1 }}
                >
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <Menu
                  anchorEl={notificationsAnchorEl}
                  open={Boolean(notificationsAnchorEl)}
                  onClose={handleNotificationsClose}
                  PaperProps={{
                    sx: { width: 320, maxHeight: 400, mt: 1.5 }
                  }}
                >
                  <MenuItem onClick={handleNotificationsClose}>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>New message from Alex</Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        Hey, I'm interested in your vintage camera...
                      </Typography>
                    </Box>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleNotificationsClose}>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Item price updated</Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        The price for "Mountain Bike" has been updated
                      </Typography>
                    </Box>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleNotificationsClose}>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>New item match</Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        We found a match for your wishlist item "Hiking Boots"
                      </Typography>
                    </Box>
                  </MenuItem>
                </Menu>
                
                <IconButton 
                  onClick={handleMenuOpen} 
                  color="inherit"
                  aria-label="account menu"
                >
                  <Avatar
                    src={(currentUser && currentUser.avatar) ? currentUser.avatar : '/images/avatar/default.jpg'}
                    alt={(currentUser && currentUser.username) ? currentUser.username : 'User'}
                    sx={{ width: 40, height: 40, border: `2px solid ${theme.palette.primary.main}` }}
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: { width: 200, mt: 1.5 }
                  }}
                >
                  <MenuItem onClick={() => handleNavigation('/profile')}>Profile</MenuItem>
                  <MenuItem onClick={() => handleNavigation('/settings')}>Settings</MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Box>
                {!isMobile ? (
                  <>
                    <Button 
                      onClick={() => navigate('/login')} 
                      color="inherit"
                      sx={{ mr: 1 }}
                    >
                      Login
                    </Button>
                    <Button 
                      onClick={() => navigate('/register')} 
                      variant="contained" 
                      color="primary"
                    >
                      Sign Up
                    </Button>
                  </>
                ) : (
                  <IconButton
                    color="inherit"
                    aria-label="account"
                    edge="end"
                    onClick={handleDrawerToggle}
                  >
                    <PersonIcon />
                  </IconButton>
                )}
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
      
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
=======

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
>>>>>>> 30fa407adb45d2d7f3db9506a9c95df6cd7ecaa2
    </AppBar>
  );
};

export default Header;

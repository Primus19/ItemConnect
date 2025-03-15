import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'flex-start' },
          }}
        >
          <Box sx={{ mb: { xs: 4, md: 0 }, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: 700, mb: 1 }}
            >
              ItemConnect
            </Typography>
            <Typography variant="body2" color="text.secondary">
              The global marketplace to find what you need and share what you have.
            </Typography>
          </Box>
          
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 4, sm: 8 },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Box>
              <Typography variant="subtitle1" color="text.primary" gutterBottom>
                Explore
              </Typography>
              <Link component={RouterLink} to="/search" color="inherit" display="block" sx={{ mb: 1 }}>
                Search Items
              </Link>
              <Link component={RouterLink} to="/categories" color="inherit" display="block" sx={{ mb: 1 }}>
                Categories
              </Link>
              <Link component={RouterLink} to="/items/new" color="inherit" display="block">
                List an Item
              </Link>
            </Box>
            
            <Box>
              <Typography variant="subtitle1" color="text.primary" gutterBottom>
                Account
              </Typography>
              <Link component={RouterLink} to="/login" color="inherit" display="block" sx={{ mb: 1 }}>
                Login
              </Link>
              <Link component={RouterLink} to="/register" color="inherit" display="block" sx={{ mb: 1 }}>
                Register
              </Link>
              <Link component={RouterLink} to="/profile" color="inherit" display="block">
                My Profile
              </Link>
            </Box>
            
            <Box>
              <Typography variant="subtitle1" color="text.primary" gutterBottom>
                Support
              </Typography>
              <Link component={RouterLink} to="/help" color="inherit" display="block" sx={{ mb: 1 }}>
                Help Center
              </Link>
              <Link component={RouterLink} to="/contact" color="inherit" display="block" sx={{ mb: 1 }}>
                Contact Us
              </Link>
              <Link component={RouterLink} to="/privacy" color="inherit" display="block">
                Privacy Policy
              </Link>
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} ItemConnect. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

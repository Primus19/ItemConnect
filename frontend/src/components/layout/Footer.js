import React from 'react';
import { Box, Container, Typography, Link, Grid, Divider } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.background.paper,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 'bold' }}>
              ItemConnect
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Connecting people through items they love.
              Share, trade, and discover unique items in your community.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Link href="/" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link href="/search" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Browse Items
            </Link>
            <Link href="/dashboard" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Dashboard
            </Link>
            <Link href="/about" color="text.secondary" display="block">
              About Us
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 'bold' }}>
              Support
            </Typography>
            <Link href="/help" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Help Center
            </Link>
            <Link href="/contact" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Contact Us
            </Link>
            <Link href="/privacy" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Privacy Policy
            </Link>
            <Link href="/terms" color="text.secondary" display="block">
              Terms of Service
            </Link>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} ItemConnect. All rights reserved.
          </Typography>
          <Box>
            <Link href="#" color="text.secondary" sx={{ ml: 2 }}>
              Privacy
            </Link>
            <Link href="#" color="text.secondary" sx={{ ml: 2 }}>
              Terms
            </Link>
            <Link href="#" color="text.secondary" sx={{ ml: 2 }}>
              Cookies
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

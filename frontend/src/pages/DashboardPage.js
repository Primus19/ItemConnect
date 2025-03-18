import React, { useEffect } from 'react';
import { Container, Typography, Grid, Paper, Box, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/layout/Layout';

const DashboardPage = () => {
  const { currentUser, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <Layout>
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Welcome, {currentUser?.username || 'User'}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your items and connections from your personal dashboard
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 2,
                height: '100%',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                Your Recent Items
              </Typography>
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary" paragraph>
                  You haven't added any items yet.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => navigate('/items/new')}
                  sx={{ 
                    mt: 2,
                    borderRadius: 2,
                    px: 3,
                    py: 1
                  }}
                >
                  Add Your First Item
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Activity Summary
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Items Listed
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                          0
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Active Chats
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                          0
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Quick Actions
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      color="primary"
                      onClick={() => navigate('/profile')}
                      sx={{ 
                        mb: 2,
                        borderRadius: 2,
                        py: 1
                      }}
                    >
                      Edit Profile
                    </Button>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      color="primary"
                      onClick={() => navigate('/search')}
                      sx={{ 
                        borderRadius: 2,
                        py: 1
                      }}
                    >
                      Browse Items
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default DashboardPage;

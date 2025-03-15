import React, { useState } from 'react';
import { Container, Typography, Box, Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ItemForm from '../components/common/ItemForm';
import { useAuth } from '../contexts/AuthContext';

import { MenuItem } from "@mui/material";

const NewItemPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Sample categories for demonstration
  const sampleCategories = [
    { id: '1', name: 'Electronics' },
    { id: '2', name: 'Furniture' },
    { id: '3', name: 'Clothing' },
    { id: '4', name: 'Books' },
    { id: '5', name: 'Sports' },
    { id: '6', name: 'Toys' },
    { id: '7', name: 'Tools' },
    { id: '8', name: 'Vehicles' }
  ];

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real application, we would send the data to the backend
      // For now, we'll simulate a successful submission
      console.log('Submitting item:', values);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccessMessage('Item successfully listed!');
      
      // Redirect to home page after success
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (err) {
      setError(err.message || 'Failed to create item. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            List a New Item
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            Fill out the form below to list your item on ItemConnect. Be sure to include clear images and detailed descriptions to attract potential buyers.
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          <ItemForm 
            onSubmit={handleSubmit} 
            categories={sampleCategories}
            isLoading={isLoading}
          />
        </Box>
        
        <Snackbar
          open={Boolean(successMessage)}
          autoHideDuration={6000}
          onClose={() => setSuccessMessage(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setSuccessMessage(null)} 
            severity="success" 
            variant="filled"
            sx={{ width: '100%' }}
          >
            {successMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Layout>
  );
};

export default NewItemPage;

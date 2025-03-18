import React, { useState } from 'react';
<<<<<<< HEAD
import { Container, Typography, Grid, Paper, Box, Button, TextField, InputAdornment, IconButton, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { PhotoCamera as PhotoCameraIcon, Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';
import itemService from '../services/itemService';
import categoryService from '../services/categoryService';

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .max(100, 'Title must be at most 100 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be positive'),
  category: Yup.string()
    .required('Category is required'),
  condition: Yup.string()
    .required('Condition is required'),
  location: Yup.string()
    .required('Location is required')
});

const NewItemPage = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([
    { id: '1', name: 'Electronics' },
    { id: '2', name: 'Clothing' },
    { id: '3', name: 'Home & Garden' },
    { id: '4', name: 'Sports & Outdoors' },
    { id: '5', name: 'Toys & Games' },
    { id: '6', name: 'Books & Media' },
    { id: '7', name: 'Vehicles' },
    { id: '8', name: 'Other' }
  ]);
  const [images, setImages] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getCategories();
        if (response.data && response.data.length > 0) {
          setCategories(response.data);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    
    fetchCategories();
  }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      category: '',
      condition: '',
      location: '',
      isAvailable: true
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError(null);
        
        // Create form data for file upload
        const formData = new FormData();
        Object.keys(values).forEach(key => {
          formData.append(key, values[key]);
        });
        
        // Append images
        images.forEach(image => {
          formData.append('images', image);
        });
        
        const response = await itemService.createItem(formData);
        navigate(`/items/${response.data.id}`);
      } catch (err) {
        console.error('Error creating item:', err);
        setError(err.response?.data?.message || 'Failed to create item. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  });

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    
    if (files.length > 0) {
      setImages([...images, ...files]);
      
      // Create preview URLs
      const newImagePreviewUrls = files.map(file => URL.createObjectURL(file));
      setImagePreviewUrls([...imagePreviewUrls, ...newImagePreviewUrls]);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newImagePreviewUrls = [...imagePreviewUrls];
    
    newImages.splice(index, 1);
    newImagePreviewUrls.splice(index, 1);
    
    setImages(newImages);
    setImagePreviewUrls(newImagePreviewUrls);
  };

  return (
    <Layout>
      <Container maxWidth="md" sx={{ mt: 2, mb: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            List a New Item
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Share your item with the community
          </Typography>
        </Box>

        {error && (
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              mb: 4, 
              bgcolor: 'error.light', 
              color: 'error.dark',
              borderRadius: 2
            }}
          >
            <Typography>{error}</Typography>
          </Paper>
        )}

        <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="Title"
                  placeholder="Enter a descriptive title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                  disabled={loading}
                  InputProps={{
                    sx: { borderRadius: 2 }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="price"
                  name="price"
                  label="Price"
                  type="number"
                  placeholder="0.00"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                  disabled={loading}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    sx: { borderRadius: 2 }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={formik.touched.category && Boolean(formik.errors.category)}>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Category"
                    disabled={loading}
                    sx={{ borderRadius: 2 }}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.category && formik.errors.category && (
                    <Typography variant="caption" color="error">
                      {formik.errors.category}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={formik.touched.condition && Boolean(formik.errors.condition)}>
                  <InputLabel id="condition-label">Condition</InputLabel>
                  <Select
                    labelId="condition-label"
                    id="condition"
                    name="condition"
                    value={formik.values.condition}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Condition"
                    disabled={loading}
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="new">New</MenuItem>
                    <MenuItem value="like-new">Like New</MenuItem>
                    <MenuItem value="good">Good</MenuItem>
                    <MenuItem value="fair">Fair</MenuItem>
                    <MenuItem value="poor">Poor</MenuItem>
                  </Select>
                  {formik.touched.condition && formik.errors.condition && (
                    <Typography variant="caption" color="error">
                      {formik.errors.condition}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="location"
                  name="location"
                  label="Location"
                  placeholder="City, State"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.location && Boolean(formik.errors.location)}
                  helperText={formik.touched.location && formik.errors.location}
                  disabled={loading}
                  InputProps={{
                    sx: { borderRadius: 2 }
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Description"
                  placeholder="Describe your item in detail"
                  multiline
                  rows={4}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                  disabled={loading}
                  InputProps={{
                    sx: { borderRadius: 2 }
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Item Images
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Add up to 5 images of your item
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                  {imagePreviewUrls.map((url, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: 'relative',
                        width: 100,
                        height: 100,
                        borderRadius: 2,
                        overflow: 'hidden'
                      }}
                    >
                      <img
                        src={url}
                        alt={`Preview ${index}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <IconButton
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          bgcolor: 'rgba(0, 0, 0, 0.5)',
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.7)'
                          }
                        }}
                        onClick={() => removeImage(index)}
                      >
                        <AddIcon sx={{ transform: 'rotate(45deg)' }} />
                      </IconButton>
                    </Box>
                  ))}
                  
                  {imagePreviewUrls.length < 5 && (
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<PhotoCameraIcon />}
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: 2,
                        borderStyle: 'dashed'
                      }}
                      disabled={loading}
                    >
                      Add
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                        multiple={imagePreviewUrls.length === 0}
                      />
                    </Button>
                  )}
                </Box>
              </Grid>
              
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(-1)}
                    disabled={loading}
                    sx={{ borderRadius: 2 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    sx={{ 
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                      fontWeight: 600
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'List Item'
                    )}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
=======
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
>>>>>>> 30fa407adb45d2d7f3db9506a9c95df6cd7ecaa2
      </Container>
    </Layout>
  );
};

export default NewItemPage;

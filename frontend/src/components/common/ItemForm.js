import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  Paper,
  Chip,
  FormControlLabel,
  Switch,
  InputAdornment,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  IconButton
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  price: Yup.number()
    .when('isFree', {
      is: false,
      then: Yup.number()
        .required('Price is required')
        .min(0, 'Price must be at least 0')
    }),
  condition: Yup.string()
    .required('Condition is required'),
  categories: Yup.array()
    .min(1, 'At least one category is required'),
  shipping: Yup.string().required("Shipping method is required"),
  location: Yup.object({
    country: Yup.string().required('Country is required'),
    city: Yup.string().required('City is required'),
  })
});

const conditions = [
  'New',
  'Like New',
  'Good',
  'Fair',
  'Poor'
];

const ItemForm = ({ onSubmit, initialValues, categories, isLoading }) => {
  const shippingOptions = ["Local Pickup", "Nationwide", "UPS", "FedEx", "USPS"];
  const [activeStep, setActiveStep] = useState(0);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  
  const steps = ['Basic Information', 'Details & Location', 'Images & Review'];
  
  const defaultValues = {
    title: '',
    description: '',
    price: '',
    isFree: false,
    condition: '',
    categories: [],
    images: [],
    location: {
      country: '',
      city: '',
      address: ''
    }
  };
  
  const formik = useFormik({
    initialValues: initialValues || defaultValues,
    validationSchema,
    onSubmit: async (values) => {
      // If item is free, set price to 0
      if (values.isFree) {
        values.price = 0;
      }
      
      await onSubmit(values);
    }
  });
  
  const handleNext = () => {
    if (activeStep === 0) {
      // Validate first step fields
      formik.setTouched({
        title: true,
        description: true,
        price: !formik.values.isFree,
        isFree: true
      });
      
      const hasErrors = Boolean(
        formik.errors.title || 
        formik.errors.description || 
        (!formik.values.isFree && formik.errors.price)
      );
      
      if (hasErrors) {
        return;
      }
    } else if (activeStep === 1) {
      // Validate second step fields
      formik.setTouched({
        condition: true,
        categories: true,
        'location.country': true,
        'location.city': true
      });
      
      const hasErrors = Boolean(
        formik.errors.condition || 
        formik.errors.categories || 
        formik.errors.location?.country ||
        formik.errors.location?.city
      );
      
      if (hasErrors) {
        return;
      }
    }
    
    setActiveStep((prevStep) => prevStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    
    if (files.length === 0) return;
    
    // Create URLs for preview
    const newImagePreviewUrls = files.map(file => URL.createObjectURL(file));
    
    setImagePreviewUrls([...imagePreviewUrls, ...newImagePreviewUrls]);
    
    // Update form values
    formik.setFieldValue('images', [...formik.values.images, ...files]);
  };
  
  const handleRemoveImage = (index) => {
    const newImagePreviewUrls = [...imagePreviewUrls];
    newImagePreviewUrls.splice(index, 1);
    setImagePreviewUrls(newImagePreviewUrls);
    
    const newImages = [...formik.values.images];
    newImages.splice(index, 1);
    formik.setFieldValue('images', newImages);
  };
  
  const handleFreeItemToggle = (event) => {
    const isFree = event.target.checked;
    formik.setFieldValue('isFree', isFree);
    
    if (isFree) {
      formik.setFieldValue('price', 0);
    }
  };
  
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box component="form" onSubmit={formik.handleSubmit}>
        {activeStep === 0 && (
          // Step 1: Basic Information
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Title"
                placeholder="e.g. iPhone 13 Pro Max 256GB"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formik.values.isFree}
                    onChange={handleFreeItemToggle}
                    name="isFree"
                    color="secondary"
                    disabled={isLoading}
                  />
                }
                label="List as free item"
              />
            </Grid>
            {!formik.values.isFree && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="price"
                  name="price"
                  label="Price"
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                  disabled={isLoading || formik.values.isFree}
                />
              </Grid>
            )}
          </Grid>
        )}
        
        {activeStep === 1 && (
          // Step 2: Details & Location
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Item Details & Location
              </Typography>
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
                  disabled={isLoading}
                >
                  {conditions.map((condition) => (
                    <MenuItem key={condition} value={condition}>
                      {condition}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.condition && formik.errors.condition && (
                  <Typography color="error" variant="caption">
                    {formik.errors.condition}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={formik.touched.categories && Boolean(formik.errors.categories)}>
                <InputLabel id="categories-label">Categories</InputLabel>
                <Select
                  labelId="categories-label"
                  id="categories"
                  name="categories"
                  multiple
                  value={formik.values.categories}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Categories"
                  disabled={isLoading}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => {
                        const category = categories.find(cat => cat.id === value);
                        return (
                          <Chip key={value} label={category ? category.name : value} />
                        );
                      })}
                    </Box>
                  )}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.categories && formik.errors.categories && (
                  <Typography color="error" variant="caption">
                    {formik.errors.categories}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="location.country"
                name="location.country"
                label="Country"
                value={formik.values.location.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.location?.country && Boolean(formik.errors.location?.country)}
                helperText={formik.touched.location?.country && formik.errors.location?.country}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="location.city"
                name="location.city"
                label="City"
                value={formik.values.location.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.location?.city && Boolean(formik.errors.location?.city)}
                helperText={formik.touched.location?.city && formik.errors.location?.city}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="location.address"
                name="location.address"
                label="Address (Optional)"
                value={formik.values.location.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.location?.address && Boolean(formik.errors.location?.address)}
                helperText={formik.touched.location?.address && formik.errors.location?.address}
                disabled={isLoading}
              />
            </Grid>
          </Grid>
        )}
        
        {activeStep === 2 && (
          // Step 3: Images & Review
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Add Images
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: 'primary.main',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  mb: 3,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
                component="label"
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  disabled={isLoading}
                />
                <AddPhotoAlternateIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="body1" gutterBottom>
                  Click to add images
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  You can add multiple images
                </Typography>
              </Box>
            </Grid>
            
            {imagePreviewUrls.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Image Preview
                </Typography>
                <Grid container spacing={2}>
                  {imagePreviewUrls.map((url, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                      <Box
                        sx={{
                          position: 'relative',
                          height: 150,
                          borderRadius: 2,
                          overflow: 'hidden',
                          boxShadow: 1
                        }}
                      >
                        <img
                          src={url}
                          alt={`Preview ${index}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                        <IconButton
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 5,
                            right: 5,
                            bgcolor: 'rgba(255, 255, 255, 0.8)',
                            '&:hover': {
                              bgcolor: 'rgba(255, 255, 255, 0.9)',
                            }
                          }}
                          onClick={() => handleRemoveImage(index)}
                          disabled={isLoading}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
            
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Review Your Item
              </Typography>
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {formik.values.title || 'No title provided'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      {formik.values.description || 'No description provided'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      <strong>Price:</strong> {formik.values.isFree ? 'Free' : `$${formik.values.price || 0}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      <strong>Condition:</strong> {formik.values.condition || 'Not specified'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>Location:</strong> {formik.values.location.city && formik.values.location.country 
                        ? `${formik.values.location.city}, ${formik.values.location.country}` 
                        : 'Not specified'}
                    </Typography>
                  </Grid>
                  {formik.values.categories.length > 0 && (
                    <Grid item xs={12}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Categories:</strong>
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {formik.values.categories.map((categoryId) => {
                          const category = categories.find(cat => cat.id === categoryId);
                          return (
                            <Chip 
                              key={categoryId} 
                              label={category ? category.name : categoryId} 
                              size="small" 
                            />
                          );
                        })}
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          {activeStep > 0 ? (
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={isLoading}
            >
              Back
            </Button>
          ) : (
            <Box /> // Empty box for spacing
          )}
          
          {activeStep < steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={isLoading}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Submit Item'
              )}
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default ItemForm;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Paper,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { PersonAdd as PersonAddIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/layout/Layout';

// Validation schema
const validationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  firstName: Yup.string(),
  lastName: Yup.string()
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, authError, clearAuthError, isAuthenticated } = useAuth();
  const [localError, setLocalError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = ['Account Details', 'Personal Information'];

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    
    // Clear any auth errors when component mounts
    clearAuthError();
  }, [isAuthenticated, navigate, clearAuthError]);
  
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLocalError(null);
        setIsSubmitting(true);
        
        // Remove confirmPassword as it's not needed in the API call
        const { confirmPassword, ...userData } = values;
        
        await register(userData);
        navigate('/');
      } catch (err) {
        setLocalError(err.response?.data?.message || 'Failed to register. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  });
  
  // Display either local error or auth context error
  const errorMessage = localError || authError;
  
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  const handleNext = () => {
    // Validate current step fields
    if (activeStep === 0) {
      formik.setTouched({
        username: true,
        email: true,
        password: true,
        confirmPassword: true
      });
      
      const hasErrors = Boolean(
        formik.errors.username || 
        formik.errors.email || 
        formik.errors.password || 
        formik.errors.confirmPassword
      );
      
      const hasEmptyFields = !formik.values.username || 
                            !formik.values.email || 
                            !formik.values.password || 
                            !formik.values.confirmPassword;
      
      if (hasErrors || hasEmptyFields) {
        return;
      }
    }
    
    setActiveStep((prevStep) => prevStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  
  return (
    <Layout>
      <Container component="main" maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            mt: 8,
            mb: 8,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 3,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
            <PersonAddIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h4" sx={{ mt: 1, fontWeight: 700 }}>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3, textAlign: 'center' }}>
            Join ItemConnect to start finding and sharing items
          </Typography>
          
          <Stepper activeStep={activeStep} sx={{ width: '100%', mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {errorMessage && (
            <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
              {errorMessage}
            </Alert>
          )}
          
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%' }}>
            {activeStep === 0 ? (
              // Step 1: Account Details
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                  disabled={isSubmitting}
                  InputProps={{
                    sx: { borderRadius: 2 }
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  disabled={isSubmitting}
                  InputProps={{
                    sx: { borderRadius: 2 }
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  disabled={isSubmitting}
                  InputProps={{
                    sx: { borderRadius: 2 },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  disabled={isSubmitting}
                  InputProps={{
                    sx: { borderRadius: 2 },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={handleToggleConfirmPasswordVisibility}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleNext}
                  sx={{ 
                    mt: 4, 
                    mb: 2, 
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: '1rem',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
                  }}
                  disabled={isSubmitting}
                >
                  Continue
                </Button>
              </>
            ) : (
              // Step 2: Personal Information
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="firstName"
                      label="First Name"
                      name="firstName"
                      autoComplete="given-name"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                      helperText={formik.touched.firstName && formik.errors.firstName}
                      disabled={isSubmitting}
                      InputProps={{
                        sx: { borderRadius: 2 }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                      helperText={formik.touched.lastName && formik.errors.lastName}
                      disabled={isSubmitting}
                      InputProps={{
                        sx: { borderRadius: 2 }
                      }}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <Button
                    onClick={handleBack}
                    variant="outlined"
                    sx={{ 
                      py: 1.5,
                      px: 4,
                      borderRadius: 2,
                      fontWeight: 600
                    }}
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ 
                      py: 1.5,
                      px: 4,
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: '1rem',
                      boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </Box>
              </>
            )}
            
            <Grid container justifyContent="center" sx={{ mt: 3 }}>
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default RegisterPage;

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Button,
  Chip,
  Divider,
  Avatar,
  Rating,
  CircularProgress,
  Alert,
  IconButton,
  Card,
  CardMedia,
  Dialog,
  DialogContent,
  Snackbar
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Share as ShareIcon,
  LocationOn as LocationIcon,
  AccessTime as AccessTimeIcon,
  ArrowBack as ArrowBackIcon,
  Chat as ChatIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import { useAuth } from '../contexts/AuthContext';

const ItemDetailPage = () => {
const handlePayPalBuy = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/payment/create-paypal-transaction`, {
        item: {
          name: item.name,
          price: item.price
        }
      });
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (err) {
      console.error("PayPal Checkout error:", err);
      alert("Failed to initiate PayPal checkout.");
    }
  };

const handleBuyNow = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/payment/create-checkout-session`, {
        item: {
          name: item.name,
          price: item.price,
        }
      });
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to initiate checkout.");
    }
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWatching, setIsWatching] = useState(false);
  const [mainImage, setMainImage] = useState(0);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch item data
  useEffect(() => {
    const fetchItem = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock item data
        const mockItem = {
          _id: id,
          title: 'iPhone 13 Pro Max',
          description: 'Excellent condition iPhone 13 Pro Max, 256GB storage, Pacific Blue color. Used for only 6 months, no scratches or dents. Comes with original box, charger, and unused earphones. Battery health at 98%. Selling because I upgraded to the latest model.',
          price: 699,
          isFree: false,
          condition: 'Like New',
          status: 'available',
          images: [
            'https://via.placeholder.com/800x600?text=iPhone+13+Pro+Max+1',
            'https://via.placeholder.com/800x600?text=iPhone+13+Pro+Max+2',
            'https://via.placeholder.com/800x600?text=iPhone+13+Pro+Max+3',
            'https://via.placeholder.com/800x600?text=iPhone+13+Pro+Max+4'
          ],
          categories: [
            { id: '1', name: 'Electronics' },
            { id: '9', name: 'Mobile Phones' }
          ],
          location: {
            country: 'United States',
            city: 'San Francisco',
            address: 'Mission District'
          },
          owner: {
            _id: '123',
            username: 'techuser',
            firstName: 'Alex',
            lastName: 'Johnson',
            avatar: 'https://via.placeholder.com/150?text=AJ',
            rating: 4.8,
            joinedDate: '2022-03-15T00:00:00.000Z',
            itemsListed: 12
          },
          createdAt: '2023-06-10T14:30:00.000Z',
          viewCount: 245,
          favoriteCount: 18
        };
        
        setItem(mockItem);
        
      } catch (err) {
        setError('Failed to load item details. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchItem();
  }, [id]);

  const handleWatchToggle = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIsWatching(!isWatching);
      
      setSuccessMessage(isWatching 
        ? 'Item removed from your watchlist' 
        : 'Item added to your watchlist');
      
    } catch (err) {
      setError('Failed to update watchlist. Please try again.');
    }
  };

  const handleContactSeller = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Navigate to chat page or open chat modal
    navigate(`/messages/new/${item.owner._id}?itemId=${item._id}`);
  };

  const handleShareItem = () => {
    // Copy current URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    setSuccessMessage('Link copied to clipboard');
  };

  const handleImageClick = (index) => {
    setMainImage(index);
    setOpenImageDialog(true);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <Layout>
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <CircularProgress size={60} />
          </Box>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleBuyNow}>
  Buy Now
</Button>
<Button variant="outlined" color="secondary" sx={{ mt: 2 }} onClick={handlePayPalBuy}>
  Pay with PayPal
</Button>
<Button variant="outlined" color="secondary" sx={{ mt: 2 }} onClick={handlePayPalBuy}>
  Pay with PayPal
</Button>
</Container>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container>
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
          </Alert>
          <Box sx={{ mt: 2 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </Box>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleBuyNow}>
  Buy Now
</Button>
<Button variant="outlined" color="secondary" sx={{ mt: 2 }} onClick={handlePayPalBuy}>
  Pay with PayPal
</Button>
<Button variant="outlined" color="secondary" sx={{ mt: 2 }} onClick={handlePayPalBuy}>
  Pay with PayPal
</Button>
</Container>
      </Layout>
    );
  }

  if (!item) {
    return (
      <Layout>
        <Container>
          <Alert severity="warning" sx={{ mt: 4 }}>
            Item not found.
          </Alert>
          <Box sx={{ mt: 2 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </Box>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleBuyNow}>
  Buy Now
</Button>
<Button variant="outlined" color="secondary" sx={{ mt: 2 }} onClick={handlePayPalBuy}>
  Pay with PayPal
</Button>
<Button variant="outlined" color="secondary" sx={{ mt: 2 }} onClick={handlePayPalBuy}>
  Pay with PayPal
</Button>
</Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ mb: 2 }}
          >
            Back to Search
          </Button>
          
          <Grid container spacing={4}>
            {/* Left column - Images */}
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative' }}>
                <Card 
                  onClick={() => setOpenImageDialog(true)}
                  sx={{ 
                    cursor: 'pointer',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 3,
                    '&:hover': {
                      boxShadow: 6
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="400"
                    image={item.images[mainImage]}
                    alt={item.title}
                    sx={{ objectFit: 'cover' }}
                  />
                </Card>
                
                {item.status === 'sold' && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      borderRadius: 2
                    }}
                  >
                    <Typography variant="h4" color="white" fontWeight="bold">
                      SOLD
                    </Typography>
                  </Box>
                )}
                
                {item.status === 'pending' && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      borderRadius: 2
                    }}
                  >
                    <Typography variant="h4" color="white" fontWeight="bold">
                      PENDING
                    </Typography>
                  </Box>
                )}
              </Box>
              
              {/* Thumbnail images */}
              {item.images.length > 1 && (
                <Grid container spacing={1} sx={{ mt: 2 }}>
                  {item.images.map((image, index) => (
                    <Grid item xs={3} key={index}>
                      <Card 
                        onClick={() => setMainImage(index)}
                        sx={{ 
                          cursor: 'pointer',
                          borderRadius: 1,
                          overflow: 'hidden',
                          border: mainImage === index ? '2px solid' : 'none',
                          borderColor: 'primary.main',
                          opacity: mainImage === index ? 1 : 0.7,
                          '&:hover': {
                            opacity: 1
                          }
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="80"
                          image={image}
                          alt={`${item.title} - Image ${index + 1}`}
                          sx={{ objectFit: 'cover' }}
                        />
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
            
            {/* Right column - Item details */}
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                    {item.title}
                  </Typography>
                  
                  <Box>
                    <IconButton 
                      color={isWatching ? "primary" : "default"}
                      onClick={handleWatchToggle}
                      aria-label={isWatching ? "Remove from watchlist" : "Add to watchlist"}
                    >
                      {isWatching ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <IconButton onClick={handleShareItem} aria-label="Share item">
                      <ShareIcon />
                    </IconButton>
                  </Box>
                </Box>
                
                <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
                  {item.isFree ? 'Free' : `$${item.price}`}
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Chip
                    label={item.condition}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                  {item.categories.map((category) => (
                    <Chip
                      key={category.id}
                      label={category.name}
                      size="small"
                      component={RouterLink}
                      to={`/search?category=${category.id}`}
                      clickable
                    />
                  ))}
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {item.location.city}, {item.location.country}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <AccessTimeIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Posted on {formatDate(item.createdAt)}
                  </Typography>
                </Box>
                
                <Divider sx={{ mb: 3 }} />
                
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body1" paragraph>
                  {item.description}
                </Typography>
                
                <Divider sx={{ my: 3 }} />
                
                {/* Seller information */}
                <Typography variant="h6" gutterBottom>
                  Seller Information
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar
                    src={item.owner.avatar}
                    alt={item.owner.username}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {item.owner.firstName} {item.owner.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      @{item.owner.username}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Rating value={item.owner.rating} precision={0.1} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({item.owner.rating})
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                {/* Action buttons */}
                <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<ChatIcon />}
                    fullWidth
                    onClick={handleContactSeller}
                    disabled={item.status !== 'available'}
                  >
                    Contact Seller
                  </Button>
                  
                  <Button
                    variant={isWatching ? "outlined" : "contained"}
                    color={isWatching ? "primary" : "secondary"}
                    size="large"
                    startIcon={isWatching ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    fullWidth
                    onClick={handleWatchToggle}
                  >
                    {isWatching ? 'Watching' : 'Add to Watchlist'}
                  </Button>
                </Box>
                
                {item.status !== 'available' && (
                  <Alert severity={item.status === 'sold' ? 'error' : 'warning'} sx={{ mt: 2 }}>
                    This item is {item.status === 'sold' ? 'sold' : 'pending sale'} and no longer available.
                  </Alert>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
        
        {/* Image dialog */}
        <Dialog
          open={openImageDialog}
          onClose={() => setOpenImageDialog(false)}
          maxWidth="lg"
          fullWidth
        >
          <DialogContent sx={{ p: 0, position: 'relative' }}>
            <IconButton
              onClick={() => setOpenImageDialog(false)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'white',
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.7)',
                }
              }}
            >
              <CloseIcon />
            </IconButton>
            <img
              src={item.images[mainImage]}
              alt={item.title}
              style={{ width: '100%', height: 'auto', maxHeight: '80vh', objectFit: 'contain' }}
            />
          </DialogContent>
        </Dialog>
        
        {/* Success message snackbar */}
        <Snackbar
          open={Boolean(successMessage)}
          autoHideDuration={3000}
          onClose={() => setSuccessMessage(null)}
          message={successMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleBuyNow}>
  Buy Now
</Button>
<Button variant="outlined" color="secondary" sx={{ mt: 2 }} onClick={handlePayPalBuy}>
  Pay with PayPal
</Button>
<Button variant="outlined" color="secondary" sx={{ mt: 2 }} onClick={handlePayPalBuy}>
  Pay with PayPal
</Button>
</Container>
    </Layout>
  );
};

export default ItemDetailPage;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Container,
  Paper,
  Divider,
  CircularProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  AddCircleOutline as AddIcon,
  Category as CategoryIcon
} from '@mui/icons-material';

import { fetchItems } from '../redux/slices/itemsSlice';
import { fetchCategories } from '../redux/slices/categoriesSlice';
import { useAuth } from '../contexts/AuthContext';

// Hero Section Component
const Hero = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: 'url(https://source.unsplash.com/random?marketplace)',
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.6)',
        }}
      />
      <Box
        sx={{
          position: 'relative',
          p: { xs: 3, md: 6 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 400
        }}
      >
        <Typography component="h1" variant="h3" color="inherit" gutterBottom align="center">
          Find Items You Need, Share Items You Have
        </Typography>
        <Typography variant="h5" color="inherit" paragraph align="center" sx={{ maxWidth: 600 }}>
          Connect with people worldwide to find, share, and discuss items. 
          Search for anything you need or list items you want to share.
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            size="large" 
            startIcon={<SearchIcon />}
            component={RouterLink}
            to="/search"
          >
            Search Items
          </Button>
          {isAuthenticated && (
            <Button 
              variant="outlined" 
              color="inherit" 
              size="large" 
              startIcon={<AddIcon />}
              component={RouterLink}
              to="/add-item"
            >
              Add Item
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

// Item Card Component
const ItemCard = ({ item }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={item.images[0]?.url || 'https://source.unsplash.com/random?item'}
        alt={item.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {item.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Typography variant="subtitle2" color="primary">
            {item.isFree ? 'Free' : `$${item.price}`}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            • {item.condition}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" component={RouterLink} to={`/items/${item._id}`}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

// Category Section Component
const CategorySection = ({ categories }) => {
  return (
    <Box sx={{ mt: 6, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <CategoryIcon sx={{ mr: 1 }} />
        <Typography variant="h5" component="h2">
          Browse Categories
        </Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={6} sm={4} md={3} key={category._id}>
            <Button
              component={RouterLink}
              to={`/search?categories=${category._id}`}
              variant="outlined"
              sx={{ 
                width: '100%', 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: 2,
                textAlign: 'center',
                textTransform: 'none'
              }}
            >
              {category.icon && (
                <Box sx={{ fontSize: '2rem', mb: 1 }}>
                  {category.icon}
                </Box>
              )}
              <Typography variant="subtitle1">{category.name}</Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const HomePage = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.items);
  const { categories, loading: categoriesLoading } = useSelector((state) => state.categories);
  
  useEffect(() => {
    // Fetch recent items
    dispatch(fetchItems({ page: 1, limit: 8, sortBy: 'createdAt', sortOrder: 'desc' }));
    
    // Fetch categories
    dispatch(fetchCategories());
  }, [dispatch]);
  
  return (
    <Container>
      <Hero />
      
      {/* Recent Items Section */}
      <Box sx={{ mt: 6, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Recently Added Items
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {items.map((item) => (
              <Grid item key={item._id} xs={12} sm={6} md={3}>
                <ItemCard item={item} />
              </Grid>
            ))}
          </Grid>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            component={RouterLink}
            to="/search"
            endIcon={<SearchIcon />}
          >
            View All Items
          </Button>
        </Box>
      </Box>
      
      {/* Categories Section */}
      {!categoriesLoading && categories.length > 0 && (
        <CategorySection categories={categories} />
      )}
      
      {/* How It Works Section */}
      <Box sx={{ mt: 6, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          How It Works
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" gutterBottom>
                1. Search or List Items
              </Typography>
              <Typography variant="body1">
                Find items you need or list items you want to share with others.
                Add images and detailed descriptions.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" gutterBottom>
                2. Connect with Others
              </Typography>
              <Typography variant="body1">
                Get notified when someone is interested in your items
                or start a conversation about items you need.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h6" gutterBottom>
                3. Exchange or Negotiate
              </Typography>
              <Typography variant="body1">
                Give items away for free, set a fixed price, or
                negotiate with interested parties through our chat system.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
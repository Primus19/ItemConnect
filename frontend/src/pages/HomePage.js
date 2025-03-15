import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
  CircularProgress,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Category as CategoryIcon
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import ItemCard from '../components/common/ItemCard';
import { useAuth } from '../contexts/AuthContext';

// Hero Component with improved design
const Hero = () => {
  const { currentUser } = useAuth() || {};
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'primary.main',
        color: '#fff',
        mb: 6,
        borderRadius: 3,
        overflow: 'hidden',
        backgroundImage: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.2)',
          backgroundImage: 'url("https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      />
      <Grid container>
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 4, md: 6 },
              pr: { md: 0 },
              minHeight: { xs: '300px', md: '400px' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Typography 
              component="h1" 
              variant="h2" 
              color="inherit" 
              gutterBottom
              sx={{ 
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '3rem' },
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}
            >
              Find What You Need,<br />
              Share What You Have
            </Typography>
            <Typography 
              variant="h5" 
              color="inherit" 
              paragraph
              sx={{ 
                maxWidth: '600px',
                mb: 4,
                textShadow: '0 1px 5px rgba(0,0,0,0.2)'
              }}
            >
              {currentUser 
                ? `Welcome back, ${currentUser.firstName || currentUser.username}! Discover items near you or list something today.`
                : 'Join our global marketplace to connect with others, find great deals, and give items a second life.'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                color="secondary" 
                component={RouterLink} 
                to="/search"
                startIcon={<SearchIcon />}
                size={isMobile ? "medium" : "large"}
                sx={{ 
                  px: 3, 
                  py: isMobile ? 1 : 1.5,
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
                }}
              >
                Find Items
              </Button>
              <Button 
                variant="outlined" 
                color="inherit" 
                component={RouterLink} 
                to="/items/new"
                startIcon={<AddIcon />}
                size={isMobile ? "medium" : "large"}
                sx={{ 
                  px: 3, 
                  py: isMobile ? 1 : 1.5,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2
                  }
                }}
              >
                List an Item
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

// Category Section Component with improved design
const CategorySection = ({ categories }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ mt: 8, mb: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h4" component="h2" fontWeight="bold">
          Browse Categories
        </Typography>
      </Box>
      <Divider sx={{ mb: 4 }} />
      <Grid container spacing={3}>
        {categories && categories.map((category) => (
          <Grid item xs={6} sm={4} md={3} key={category._id || category.id}>
            <Button
              component={RouterLink}
              to={`/search?categories=${category._id || category.id}`}
              variant="outlined"
              sx={{ 
                width: '100%', 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                textAlign: 'center',
                textTransform: 'none',
                borderRadius: 2,
                borderWidth: 2,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                  borderWidth: 2
                }
              }}
            >
              {category.icon && (
                <Box sx={{ fontSize: '2.5rem', mb: 2 }}>
                  {category.icon}
                </Box>
              )}
              <Typography variant="h6">{category.name}</Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// How It Works Section with improved design
const HowItWorksSection = () => {
  return (
    <Box sx={{ mt: 8, mb: 6 }}>
      <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
        How ItemConnect Works
      </Typography>
      <Divider sx={{ mb: 4 }} />
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 4, 
              height: '100%',
              borderRadius: 3,
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography 
                variant="h1" 
                component="div" 
                sx={{ 
                  color: 'primary.main', 
                  fontWeight: 800,
                  fontSize: '3rem',
                  mb: 2
                }}
              >
                1
              </Typography>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Search or List Items
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" align="center">
              Find items you need or list items you want to share with others.
              Add high-quality images and detailed descriptions to get noticed.
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 4, 
              height: '100%',
              borderRadius: 3,
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography 
                variant="h1" 
                component="div" 
                sx={{ 
                  color: 'primary.main', 
                  fontWeight: 800,
                  fontSize: '3rem',
                  mb: 2
                }}
              >
                2
              </Typography>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Connect with Others
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" align="center">
              Get notified when someone is interested in your items
              or start a conversation about items you need through our
              real-time messaging system.
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 4, 
              height: '100%',
              borderRadius: 3,
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography 
                variant="h1" 
                component="div" 
                sx={{ 
                  color: 'primary.main', 
                  fontWeight: 800,
                  fontSize: '3rem',
                  mb: 2
                }}
              >
                3
              </Typography>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Exchange or Negotiate
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" align="center">
              Give items away for free, set a fixed price, or
              negotiate with interested parties through our chat system.
              Complete transactions safely and easily.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

const HomePage = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [items, setItems] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [categoriesLoading, setCategoriesLoading] = React.useState(true);
  
  // Sample categories for demonstration
  const sampleCategories = [
    { id: '1', name: 'Electronics', icon: '💻' },
    { id: '2', name: 'Furniture', icon: '🪑' },
    { id: '3', name: 'Clothing', icon: '👕' },
    { id: '4', name: 'Books', icon: '📚' },
    { id: '5', name: 'Sports', icon: '⚽' },
    { id: '6', name: 'Toys', icon: '🧸' },
    { id: '7', name: 'Tools', icon: '🔧' },
    { id: '8', name: 'Vehicles', icon: '🚗' }
  ];
  
  // Sample items for demonstration
  const sampleItems = [
    {
      _id: '1',
      title: 'iPhone 13 Pro',
      description: 'Excellent condition, barely used. Comes with original box and accessories.',
      price: 699,
      isFree: false,
      condition: 'Like New',
      images: ['https://via.placeholder.com/300x200?text=iPhone+13'],
      categories: [{ id: '1', name: 'Electronics' }],
      owner: { username: 'techuser', rating: 4.8 }
    },
    {
      _id: '2',
      title: 'Wooden Desk',
      description: 'Solid oak desk, perfect for home office. Some minor scratches but overall good condition.',
      price: 150,
      isFree: false,
      condition: 'Good',
      images: ['https://via.placeholder.com/300x200?text=Wooden+Desk'],
      categories: [{ id: '2', name: 'Furniture' }],
      owner: { username: 'homedesign', rating: 4.5 }
    },
    {
      _id: '3',
      title: 'Programming Books',
      description: 'Collection of JavaScript and React books. Free to a good home for aspiring developers.',
      price: 0,
      isFree: true,
      condition: 'Good',
      images: ['https://via.placeholder.com/300x200?text=Programming+Books'],
      categories: [{ id: '4', name: 'Books' }],
      owner: { username: 'codemaster', rating: 5.0 }
    },
    {
      _id: '4',
      title: 'Mountain Bike',
      description: 'Trek mountain bike, 21 speed. Recently serviced with new brakes and tires.',
      price: 250,
      isFree: false,
      condition: 'Used',
      images: ['https://via.placeholder.com/300x200?text=Mountain+Bike'],
      categories: [{ id: '5', name: 'Sports' }],
      owner: { username: 'bikelife', rating: 4.2 }
    }
  ];
  
  React.useEffect(() => {
    // Simulate fetching items
    setTimeout(() => {
      setItems(sampleItems);
      setLoading(false);
    }, 1000);
    
    // Simulate fetching categories
    setTimeout(() => {
      setCategories(sampleCategories);
      setCategoriesLoading(false);
    }, 800);
  }, []);
  
  const handleWatchToggle = (itemId) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item._id === itemId 
          ? { ...item, isWatching: !item.isWatching }
          : item
      )
    );
  };
  
  return (
    <Layout>
      <Container maxWidth="lg">
        <Hero />
        
        {/* Recent Items Section */}
        <Box sx={{ mt: 8, mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
            Recently Added Items
          </Typography>
          <Divider sx={{ mb: 4 }} />
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
              <CircularProgress size={60} />
            </Box>
          ) : (
            <Grid container spacing={4}>
              {items.map((item) => (
                <Grid item key={item._id} xs={12} sm={6} md={3}>
                  <ItemCard item={item} onWatchToggle={handleWatchToggle} />
                </Grid>
              ))}
            </Grid>
          )}
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/search"
              endIcon={<SearchIcon />}
              size="large"
              sx={{ px: 4, py: 1.2 }}
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
        <HowItWorksSection />
      </Container>
    </Layout>
  );
};

export default HomePage;

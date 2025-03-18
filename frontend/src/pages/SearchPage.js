import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Container, Typography, Grid, Paper, Box, Button, TextField, InputAdornment, IconButton, Chip, CircularProgress } from '@mui/material';
import { Search as SearchIcon, FilterList as FilterListIcon, Clear as ClearIcon } from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import ItemCard from '../components/common/ItemCard';
import SearchFilters from '../components/common/SearchFilters';
import { useAuth } from '../contexts/AuthContext';
import itemService from '../services/itemService';
import categoryService from '../services/categoryService';

const SearchPage = () => {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    condition: '',
    location: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [itemsResponse, categoriesResponse] = await Promise.all([
          itemService.getItems(),
          categoryService.getCategories()
        ]);
        setItems(itemsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
=======
import { Container, Typography, Box, Grid, CircularProgress, Pagination, Paper, Alert } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import SearchFilters from '../components/common/SearchFilters';
import ItemCard from '../components/common/ItemCard';

const SearchPage = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    condition: '',
    minPrice: 0,
    maxPrice: 1000,
    isFree: false,
    sortBy: 'createdAt'
  });

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

  // Sample items for demonstration
  const generateSampleItems = (page, filters) => {
    // Create a base set of items
    const baseItems = [
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
      },
      {
        _id: '5',
        title: 'Gaming Laptop',
        description: 'MSI gaming laptop with RTX 3070, 16GB RAM, 1TB SSD. Great for gaming and design work.',
        price: 1200,
        isFree: false,
        condition: 'Good',
        images: ['https://via.placeholder.com/300x200?text=Gaming+Laptop'],
        categories: [{ id: '1', name: 'Electronics' }],
        owner: { username: 'gamer123', rating: 4.7 }
      },
      {
        _id: '6',
        title: 'Dining Table with Chairs',
        description: 'Beautiful dining set with 6 chairs. Solid wood construction, minimal wear.',
        price: 350,
        isFree: false,
        condition: 'Good',
        images: ['https://via.placeholder.com/300x200?text=Dining+Table'],
        categories: [{ id: '2', name: 'Furniture' }],
        owner: { username: 'interiordesign', rating: 4.9 }
      },
      {
        _id: '7',
        title: 'Vintage Vinyl Records',
        description: 'Collection of classic rock vinyl records from the 70s and 80s. All in great condition.',
        price: 120,
        isFree: false,
        condition: 'Good',
        images: ['https://via.placeholder.com/300x200?text=Vinyl+Records'],
        categories: [{ id: '4', name: 'Books' }],
        owner: { username: 'musiclover', rating: 4.6 }
      },
      {
        _id: '8',
        title: 'Tennis Racket',
        description: 'Wilson Pro tennis racket, barely used. Comes with carrying case.',
        price: 80,
        isFree: false,
        condition: 'Like New',
        images: ['https://via.placeholder.com/300x200?text=Tennis+Racket'],
        categories: [{ id: '5', name: 'Sports' }],
        owner: { username: 'tennispro', rating: 4.3 }
      },
      {
        _id: '9',
        title: 'LEGO Star Wars Set',
        description: 'Complete LEGO Star Wars Millennium Falcon set. All pieces included with original box.',
        price: 200,
        isFree: false,
        condition: 'Good',
        images: ['https://via.placeholder.com/300x200?text=LEGO+Star+Wars'],
        categories: [{ id: '6', name: 'Toys' }],
        owner: { username: 'legofan', rating: 4.8 }
      },
      {
        _id: '10',
        title: 'Power Tools Set',
        description: 'Complete set of DeWalt power tools. Includes drill, saw, sander, and more.',
        price: 300,
        isFree: false,
        condition: 'Used',
        images: ['https://via.placeholder.com/300x200?text=Power+Tools'],
        categories: [{ id: '7', name: 'Tools' }],
        owner: { username: 'handyman', rating: 4.9 }
      },
      {
        _id: '11',
        title: 'Vintage Bicycle',
        description: 'Restored vintage Schwinn bicycle from the 1960s. Perfect working condition.',
        price: 350,
        isFree: false,
        condition: 'Good',
        images: ['https://via.placeholder.com/300x200?text=Vintage+Bicycle'],
        categories: [{ id: '8', name: 'Vehicles' }],
        owner: { username: 'vintagecollector', rating: 5.0 }
      },
      {
        _id: '12',
        title: 'Free Plants',
        description: 'Various houseplants looking for a new home. All healthy and well-maintained.',
        price: 0,
        isFree: true,
        condition: 'Good',
        images: ['https://via.placeholder.com/300x200?text=Houseplants'],
        categories: [{ id: '3', name: 'Home & Garden' }],
        owner: { username: 'plantlover', rating: 4.7 }
      }
    ];

    // Filter items based on search criteria
    let filteredItems = [...baseItems];

    // Apply keyword filter
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filteredItems = filteredItems.filter(item => 
        item.title.toLowerCase().includes(keyword) || 
        item.description.toLowerCase().includes(keyword)
      );
    }

    // Apply category filter
    if (filters.category) {
      filteredItems = filteredItems.filter(item => 
        item.categories.some(cat => cat.id === filters.category)
      );
    }

    // Apply condition filter
    if (filters.condition) {
      filteredItems = filteredItems.filter(item => 
        item.condition === filters.condition
      );
    }

    // Apply price range filter
    filteredItems = filteredItems.filter(item => 
      (item.price >= filters.minPrice && item.price <= filters.maxPrice)
    );

    // Apply free items filter
    if (filters.isFree) {
      filteredItems = filteredItems.filter(item => item.isFree);
    }

    // Apply sorting
    if (filters.sortBy === 'price_asc') {
      filteredItems.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price_desc') {
      filteredItems.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'title') {
      filteredItems.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Calculate total pages
    const itemsPerPage = 8;
    const totalFilteredItems = filteredItems.length;
    const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);

    // Paginate results
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredItems.slice(startIndex, endIndex);

    return {
      items: paginatedItems,
      totalItems: totalFilteredItems,
      totalPages
    };
  };

  // Parse query parameters from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newFilters = { ...filters };
    
    if (searchParams.has('keyword')) {
      newFilters.keyword = searchParams.get('keyword');
    }
    
    if (searchParams.has('category')) {
      newFilters.category = searchParams.get('category');
    }
    
    if (searchParams.has('condition')) {
      newFilters.condition = searchParams.get('condition');
    }
    
    if (searchParams.has('minPrice')) {
      newFilters.minPrice = parseInt(searchParams.get('minPrice'), 10);
    }
    
    if (searchParams.has('maxPrice')) {
      newFilters.maxPrice = parseInt(searchParams.get('maxPrice'), 10);
    }
    
    if (searchParams.has('isFree')) {
      newFilters.isFree = searchParams.get('isFree') === 'true';
    }
    
    if (searchParams.has('sortBy')) {
      newFilters.sortBy = searchParams.get('sortBy');
    }
    
    if (searchParams.has('page')) {
      setCurrentPage(parseInt(searchParams.get('page'), 10));
    }
    
    setFilters(newFilters);
  }, [location.search]);

  // Fetch items when filters or page changes
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get sample data
        const result = generateSampleItems(currentPage, filters);
        
        setItems(result.items);
        setTotalItems(result.totalItems);
        setTotalPages(result.totalPages);
        
      } catch (err) {
        setError('Failed to fetch items. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchItems();
  }, [filters, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  };

  const handleApplyFilters = () => {
    // Reset to first page when applying new filters
    setCurrentPage(1);
>>>>>>> 30fa407adb45d2d7f3db9506a9c95df6cd7ecaa2
  };

  const handleClearFilters = () => {
    setFilters({
<<<<<<< HEAD
      category: '',
      minPrice: '',
      maxPrice: '',
      condition: '',
      location: ''
    });
  };

  const applyFilters = (items) => {
    return items.filter(item => {
      // Search query filter
      if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Category filter
      if (filters.category && item.category !== filters.category) {
        return false;
      }
      
      // Price range filter
      if (filters.minPrice && item.price < parseFloat(filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice && item.price > parseFloat(filters.maxPrice)) {
        return false;
      }
      
      // Condition filter
      if (filters.condition && item.condition !== filters.condition) {
        return false;
      }
      
      // Location filter
      if (filters.location && !item.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  };

  const filteredItems = applyFilters(items);
  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length;

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Find Items
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Discover unique items from sellers in your community
          </Typography>
        </Box>

        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search for items..."
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClearSearch} edge="end" size="small">
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2 }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  onClick={handleToggleFilters}
                  sx={{ borderRadius: 2 }}
                >
                  Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </Button>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="text"
                    onClick={handleClearFilters}
                    sx={{ borderRadius: 2 }}
                  >
                    Clear All
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>

          {showFilters && (
            <Box sx={{ mt: 3 }}>
              <SearchFilters 
                filters={filters} 
                onFilterChange={handleFilterChange} 
                categories={categories} 
              />
            </Box>
          )}

          {Object.values(filters).some(value => value !== '') && (
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {filters.category && (
                <Chip 
                  label={`Category: ${filters.category}`} 
                  onDelete={() => handleFilterChange('category', '')}
                  sx={{ borderRadius: 2 }}
                />
              )}
              {filters.minPrice && (
                <Chip 
                  label={`Min Price: $${filters.minPrice}`} 
                  onDelete={() => handleFilterChange('minPrice', '')}
                  sx={{ borderRadius: 2 }}
                />
              )}
              {filters.maxPrice && (
                <Chip 
                  label={`Max Price: $${filters.maxPrice}`} 
                  onDelete={() => handleFilterChange('maxPrice', '')}
                  sx={{ borderRadius: 2 }}
                />
              )}
              {filters.condition && (
                <Chip 
                  label={`Condition: ${filters.condition}`} 
                  onDelete={() => handleFilterChange('condition', '')}
                  sx={{ borderRadius: 2 }}
                />
              )}
              {filters.location && (
                <Chip 
                  label={`Location: ${filters.location}`} 
                  onDelete={() => handleFilterChange('location', '')}
                  sx={{ borderRadius: 2 }}
                />
              )}
            </Box>
          )}
        </Paper>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Paper elevation={2} sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
            <Typography color="error">{error}</Typography>
            <Button 
              variant="contained" 
              onClick={() => window.location.reload()} 
              sx={{ mt: 2, borderRadius: 2 }}
            >
              Try Again
            </Button>
          </Paper>
        ) : filteredItems.length === 0 ? (
          <Paper elevation={2} sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
            <Typography variant="h6">No items found</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try adjusting your search or filters to find what you're looking for.
            </Typography>
            {!isAuthenticated && (
              <Button 
                variant="contained" 
                onClick={() => navigate('/login')} 
                sx={{ mt: 3, borderRadius: 2 }}
              >
                Sign in to list your own items
              </Button>
            )}
          </Paper>
        ) : (
          <>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" component="h2">
                {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
              </Typography>
              {isAuthenticated && (
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => navigate('/items/new')}
                  sx={{ borderRadius: 2 }}
                >
                  List an Item
                </Button>
              )}
            </Box>
            
            <Grid container spacing={3}>
              {filteredItems.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                  <ItemCard item={item} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
=======
      keyword: '',
      category: '',
      condition: '',
      minPrice: 0,
      maxPrice: 1000,
      isFree: false,
      sortBy: 'createdAt'
    });
    setCurrentPage(1);
  };

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
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Search Items
          </Typography>
          
          <SearchFilters 
            filters={filters} 
            setFilters={setFilters}
            categories={sampleCategories}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
              <CircularProgress size={60} />
            </Box>
          ) : items.length > 0 ? (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="subtitle1" color="text.secondary">
                  Showing {items.length} of {totalItems} items
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                {items.map((item) => (
                  <Grid item key={item._id} xs={12} sm={6} md={3}>
                    <ItemCard item={item} onWatchToggle={handleWatchToggle} />
                  </Grid>
                ))}
              </Grid>
              
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                  <Pagination 
                    count={totalPages} 
                    page={currentPage} 
                    onChange={handlePageChange} 
                    color="primary" 
                    size="large"
                  />
                </Box>
              )}
            </>
          ) : (
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                No items found
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Try adjusting your search filters or check back later for new listings.
              </Typography>
            </Paper>
          )}
        </Box>
>>>>>>> 30fa407adb45d2d7f3db9506a9c95df6cd7ecaa2
      </Container>
    </Layout>
  );
};

export default SearchPage;

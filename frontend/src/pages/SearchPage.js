import React, { useState, useEffect } from 'react';
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
  };

  const handleClearFilters = () => {
    setFilters({
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
      </Container>
    </Layout>
  );
};

export default SearchPage;

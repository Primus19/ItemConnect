import React from 'react';
import { Container, Grid, Typography, TextField, InputAdornment, Box, Button, Chip, FormControl, InputLabel, Select, MenuItem, Slider, FormControlLabel, Checkbox } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import TuneIcon from '@mui/icons-material/Tune';

const SearchFilters = ({ 
  filters, 
  setFilters, 
  categories,
  onApplyFilters,
  onClearFilters
}) => {
  const [expanded, setExpanded] = React.useState(false);
  
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <Box sx={{ mb: 4, p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Search items..."
          value={filters.keyword || ''}
          onChange={(e) => handleFilterChange('keyword', e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mr: 2 }}
        />
        <Button 
          variant="contained" 
          onClick={onApplyFilters}
          sx={{ minWidth: 100 }}
        >
          Search
        </Button>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button 
          startIcon={<TuneIcon />}
          onClick={() => setExpanded(!expanded)}
          color="inherit"
          size="small"
        >
          {expanded ? 'Hide Filters' : 'Show Filters'}
        </Button>
        
        {Object.keys(filters).some(key => key !== 'keyword' && filters[key]) && (
          <Button 
            color="inherit" 
            size="small"
            onClick={onClearFilters}
          >
            Clear Filters
          </Button>
        )}
      </Box>
      
      {expanded && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={filters.category || ''}
                label="Category"
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Condition</InputLabel>
              <Select
                value={filters.condition || ''}
                label="Condition"
                onChange={(e) => handleFilterChange('condition', e.target.value)}
              >
                <MenuItem value="">Any Condition</MenuItem>
                <MenuItem value="New">New</MenuItem>
                <MenuItem value="Like New">Like New</MenuItem>
                <MenuItem value="Good">Good</MenuItem>
                <MenuItem value="Fair">Fair</MenuItem>
                <MenuItem value="Poor">Poor</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Sort By</InputLabel>
              <Select
                value={filters.sortBy || 'createdAt'}
                label="Sort By"
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                <MenuItem value="createdAt">Newest First</MenuItem>
                <MenuItem value="price_asc">Price: Low to High</MenuItem>
                <MenuItem value="price_desc">Price: High to Low</MenuItem>
                <MenuItem value="title">Name: A-Z</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={filters.isFree || false}
                  onChange={(e) => handleFilterChange('isFree', e.target.checked)}
                />
              }
              label="Free Items Only"
            />
          </Grid>
          
          <Grid item xs={12}>
            <Typography gutterBottom>Price Range</Typography>
            <Slider
              value={[filters.minPrice || 0, filters.maxPrice || 1000]}
              onChange={(e, newValue) => {
                handleFilterChange('minPrice', newValue[0]);
                handleFilterChange('maxPrice', newValue[1]);
              }}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              step={10}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">$0</Typography>
              <Typography variant="body2">$1000+</Typography>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default SearchFilters;

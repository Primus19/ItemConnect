import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box, Chip, Rating } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';

const ItemCard = ({ item, onWatchToggle }) => {
  const { _id, title, description, price, isFree, condition, images, favoriteCount, categories, owner } = item;
  
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible'
      }}
    >
      {isFree && (
        <Chip 
          label="FREE" 
          color="secondary" 
          sx={{ 
            position: 'absolute', 
            top: -10, 
            right: 10, 
            fontWeight: 'bold',
            zIndex: 1
          }} 
        />
      )}
      
      <CardMedia
        component="img"
        height="200"
        image={images && images.length > 0 
          ? images[0] 
          : 'https://via.placeholder.com/300x200?text=No+Image'}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2" noWrap>
          {title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          mb: 1
        }}>
          {description}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" color="primary" fontWeight="bold">
            {isFree ? 'Free' : `$${price}`}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            • {condition}
          </Typography>
        </Box>
        
        {categories && categories.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
            {categories.slice(0, 2).map((category) => (
              <Chip 
                key={category._id || category.id} 
                label={category.name} 
                size="small" 
                sx={{ fontSize: '0.7rem' }}
              />
            ))}
            {categories.length > 2 && (
              <Chip 
                label={`+${categories.length - 2}`} 
                size="small" 
                variant="outlined" 
                sx={{ fontSize: '0.7rem' }}
              />
            )}
          </Box>
        )}
        
        {owner && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Listed by {owner.username}
            </Typography>
            {owner.rating > 0 && (
              <Rating value={owner.rating} readOnly size="small" sx={{ ml: 1 }} />
            )}
          </Box>
        )}
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button 
          size="small" 
          component={RouterLink} 
          to={`/items/${_id}`}
          variant="outlined"
        >
          View Details
        </Button>
        
        {onWatchToggle && (
          <IconButton 
            size="small" 
            onClick={() => onWatchToggle(_id)}
            color="primary"
            aria-label={item.isWatching ? "Remove from watchlist" : "Add to watchlist"}
          >
            {item.isWatching ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default ItemCard;

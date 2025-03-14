import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import itemService from '../../services/itemService';

// Async thunks
export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (params, { rejectWithValue }) => {
    try {
      const response = await itemService.getItems(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchItemById = createAsyncThunk(
  'items/fetchItemById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await itemService.getItemById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createItem = createAsyncThunk(
  'items/createItem',
  async (itemData, { rejectWithValue }) => {
    try {
      const response = await itemService.createItem(itemData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateItem = createAsyncThunk(
  'items/updateItem',
  async ({ id, itemData }, { rejectWithValue }) => {
    try {
      const response = await itemService.updateItem(id, itemData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async (id, { rejectWithValue }) => {
    try {
      await itemService.deleteItem(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const watchItem = createAsyncThunk(
  'items/watchItem',
  async (id, { rejectWithValue }) => {
    try {
      await itemService.watchItem(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const unwatchItem = createAsyncThunk(
  'items/unwatchItem',
  async (id, { rejectWithValue }) => {
    try {
      await itemService.unwatchItem(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  items: [],
  currentItem: null,
  totalItems: 0,
  totalPages: 0,
  currentPage: 1,
  loading: false,
  error: null,
  success: false,
  watching: []
};

// Slice
const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearCurrentItem: (state) => {
      state.currentItem = null;
    },
    clearItemsState: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPages = 0;
      state.currentPage = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch items
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.success = true;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch items';
      })
      
      // Fetch item by id
      .addCase(fetchItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload;
        state.success = true;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch item';
      })
      
      // Create item
      .addCase(createItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
        state.success = true;
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create item';
        state.success = false;
      })
      
      // Update item
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.loading = false;
        
        // Update item in items array
        const index = state.items.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        
        // Update current item if it's the same
        if (state.currentItem && state.currentItem._id === action.payload._id) {
          state.currentItem = action.payload;
        }
        
        state.success = true;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update item';
        state.success = false;
      })
      
      // Delete item
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item._id !== action.payload);
        
        if (state.currentItem && state.currentItem._id === action.payload) {
          state.currentItem = null;
        }
        
        state.success = true;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete item';
        state.success = false;
      })
      
      // Watch item
      .addCase(watchItem.fulfilled, (state, action) => {
        state.watching.push(action.payload);
        
        // Update favorite count in current item
        if (state.currentItem && state.currentItem._id === action.payload) {
          state.currentItem.favoriteCount += 1;
        }
      })
      
      // Unwatch item
      .addCase(unwatchItem.fulfilled, (state, action) => {
        state.watching = state.watching.filter(id => id !== action.payload);
        
        // Update favorite count in current item
        if (state.currentItem && state.currentItem._id === action.payload) {
          state.currentItem.favoriteCount = Math.max(0, state.currentItem.favoriteCount - 1);
        }
      });
  }
});

export const { clearCurrentItem, clearItemsState } = itemsSlice.actions;

export default itemsSlice.reducer;
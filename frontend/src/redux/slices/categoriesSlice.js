import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from '../../services/categoryService';

// Async thunks
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryService.getAllCategories();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchHierarchicalCategories = createAsyncThunk(
  'categories/fetchHierarchicalCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryService.getHierarchicalCategories();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  categories: [],
  hierarchicalCategories: [],
  loading: false,
  error: null
};

// Slice
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch categories';
      })
      
      // Fetch hierarchical categories
      .addCase(fetchHierarchicalCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHierarchicalCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.hierarchicalCategories = action.payload;
      })
      .addCase(fetchHierarchicalCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch hierarchical categories';
      });
  }
});

export default categoriesSlice.reducer;
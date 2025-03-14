import api from './api';

const categoryService = {
  // Get all categories
  getAllCategories: () => {
    return api.get('/categories');
  },
  
  // Get hierarchical categories
  getHierarchicalCategories: () => {
    return api.get('/categories/hierarchical');
  },
  
  // Get category by id
  getCategoryById: (id) => {
    return api.get(`/categories/${id}`);
  }
};

export default categoryService;
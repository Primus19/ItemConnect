import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './slices/itemsSlice';
import categoriesReducer from './slices/categoriesSlice';
import chatsReducer from './slices/chatsSlice';
import notificationsReducer from './slices/notificationsSlice';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    categories: categoriesReducer,
    chats: chatsReducer,
    notifications: notificationsReducer
  }
});
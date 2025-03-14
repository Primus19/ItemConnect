import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import chatService from '../../services/chatService';

// Async thunks
export const fetchUserChats = createAsyncThunk(
  'chats/fetchUserChats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await chatService.getUserChats();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchChatById = createAsyncThunk(
  'chats/fetchChatById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await chatService.getChatById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createOrGetChat = createAsyncThunk(
  'chats/createOrGetChat',
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await chatService.createOrGetChat(itemId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addMessage = createAsyncThunk(
  'chats/addMessage',
  async ({ chatId, messageData }, { rejectWithValue }) => {
    try {
      const response = await chatService.addMessage(chatId, messageData);
      return { chatId, message: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateChatStatus = createAsyncThunk(
  'chats/updateChatStatus',
  async ({ chatId, statusData }, { rejectWithValue }) => {
    try {
      const response = await chatService.updateChatStatus(chatId, statusData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  chats: [],
  currentChat: null,
  loading: false,
  error: null,
  success: false,
  unreadCount: 0
};

// Slice
const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    clearCurrentChat: (state) => {
      state.currentChat = null;
    },
    receiveMessage: (state, action) => {
      const { chatId, message } = action.payload;
      
      // Add message to current chat if it matches
      if (state.currentChat && state.currentChat._id === chatId) {
        state.currentChat.messages.push(message);
        state.currentChat.lastMessage = new Date();
      }
      
      // Update chat in chats array
      const chatIndex = state.chats.findIndex(chat => chat._id === chatId);
      if (chatIndex !== -1) {
        state.chats[chatIndex].lastMessage = new Date();
        
        // Increment unread count if message is from other user
        if (!message.isRead && message.sender !== state.currentChat?.user?._id) {
          state.unreadCount += 1;
        }
        
        // Move chat to top of list
        const chat = state.chats[chatIndex];
        state.chats.splice(chatIndex, 1);
        state.chats.unshift(chat);
      }
    },
    resetUnreadCount: (state) => {
      state.unreadCount = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch user chats
      .addCase(fetchUserChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
        
        // Calculate unread count
        state.unreadCount = action.payload.reduce((count, chat) => {
          const unreadMessages = chat.messages.filter(
            msg => !msg.isRead && msg.sender !== action.meta.arg
          );
          return count + unreadMessages.length;
        }, 0);
        
        state.success = true;
      })
      .addCase(fetchUserChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch chats';
      })
      
      // Fetch chat by id
      .addCase(fetchChatById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChat = action.payload;
        
        // Update chat in chats array
        const chatIndex = state.chats.findIndex(chat => chat._id === action.payload._id);
        if (chatIndex !== -1) {
          state.chats[chatIndex] = {
            ...state.chats[chatIndex],
            messages: action.payload.messages,
            status: action.payload.status,
            finalPrice: action.payload.finalPrice
          };
        }
        
        state.success = true;
      })
      .addCase(fetchChatById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch chat';
      })
      
      // Create or get chat
      .addCase(createOrGetChat.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createOrGetChat.fulfilled, (state, action) => {
        state.loading = false;
        
        // Add chat to list if it doesn't exist
        const chatExists = state.chats.some(chat => chat._id === action.payload._id);
        if (!chatExists) {
          state.chats.unshift(action.payload);
        }
        
        state.currentChat = action.payload;
        state.success = true;
      })
      .addCase(createOrGetChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create chat';
        state.success = false;
      })
      
      // Add message
      .addCase(addMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        state.loading = false;
        
        const { chatId, message } = action.payload;
        
        // Add message to current chat
        if (state.currentChat && state.currentChat._id === chatId) {
          state.currentChat.messages.push(message);
          state.currentChat.lastMessage = new Date();
        }
        
        // Update chat in chats array
        const chatIndex = state.chats.findIndex(chat => chat._id === chatId);
        if (chatIndex !== -1) {
          state.chats[chatIndex].lastMessage = new Date();
          
          // Move chat to top of list
          const chat = state.chats[chatIndex];
          state.chats.splice(chatIndex, 1);
          state.chats.unshift(chat);
        }
        
        state.success = true;
      })
      .addCase(addMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to send message';
      })
      
      // Update chat status
      .addCase(updateChatStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateChatStatus.fulfilled, (state, action) => {
        state.loading = false;
        
        // Update current chat if it matches
        if (state.currentChat && state.currentChat._id === action.payload._id) {
          state.currentChat.status = action.payload.status;
          state.currentChat.finalPrice = action.payload.finalPrice;
        }
        
        // Update chat in chats array
        const chatIndex = state.chats.findIndex(chat => chat._id === action.payload._id);
        if (chatIndex !== -1) {
          state.chats[chatIndex].status = action.payload.status;
          state.chats[chatIndex].finalPrice = action.payload.finalPrice;
        }
        
        state.success = true;
      })
      .addCase(updateChatStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update chat status';
      });
  }
});

export const { clearCurrentChat, receiveMessage, resetUnreadCount } = chatsSlice.actions;

export default chatsSlice.reducer;
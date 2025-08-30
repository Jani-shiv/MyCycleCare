import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import ApiService from '../../services/api';

interface User {
  id: number;
  email: string;
  full_name: string;
  student_id?: string;
  university?: string;
  major?: string;
  year?: number;
  is_verified: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({email, password}: {email: string; password: string}) => {
    const response = await ApiService.login(email, password);
    return response;
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: any) => {
    const response = await ApiService.register(userData);
    return response.data;
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async () => {
    const response = await ApiService.getCurrentUser();
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      ApiService.logout();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Registration failed';
      })
      // Get current user
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const {logout, clearError} = authSlice.actions;
export default authSlice.reducer;

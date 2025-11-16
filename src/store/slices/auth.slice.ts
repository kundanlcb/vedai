/**
 * Auth Redux Slice
 * Manages authentication state and token persistence
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Storage } from '../../utils/storage';
import { authAPI } from '../../api/endpoints/auth';
import { AuthLoginRequest } from '../../types/api';
import { AuthState } from '../../types/domain';

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user_id: null,
  loading: false,
  error: null,
};

/**
 * Async thunk for login
 */
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: AuthLoginRequest, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);
      if (response.success) {
        // Store token and user ID securely
        await Storage.Auth.setToken(response.data.access_token);
        await Storage.Auth.setUserId(response.data.user_id);
        return {
          token: response.data.access_token,
          user_id: response.data.user_id,
        };
      }
      return rejectWithValue('Login failed');
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
    }
  }
);

/**
 * Async thunk to restore auth state from storage
 */
export const restoreAuth = createAsyncThunk('auth/restore', async (_, { rejectWithValue }) => {
  try {
    const token = await Storage.Auth.getToken();
    const userId = await Storage.Auth.getUserId();

    if (token && userId) {
      return { token, user_id: userId };
    }
    return rejectWithValue('No stored auth');
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Restore failed');
  }
});

/**
 * Async thunk for logout
 */
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await Storage.Auth.clearAuthData();
    return null;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Logout failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user_id = action.payload.user_id;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = (action.payload as string) || 'Login failed';
      });

    // Restore Auth
    builder
      .addCase(restoreAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(restoreAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user_id = action.payload.user_id;
        state.error = null;
      })
      .addCase(restoreAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user_id = null;
      });

    // Logout
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user_id = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Logout failed';
      });
  },
});

export const { setToken, clearError } = authSlice.actions;
export default authSlice.reducer;


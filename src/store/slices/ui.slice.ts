/**
 * UI Redux Slice
 * Manages general UI state (loading, errors, theme, etc.)
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColorMode } from '../../theme/colors';

interface UIState {
  colorMode: ColorMode;
  loading: boolean;
  error: string | null;
  success: string | null;
  notification: {
    visible: boolean;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
  };
}

const initialState: UIState = {
  colorMode: 'light',
  loading: false,
  error: null,
  success: null,
  notification: {
    visible: false,
    type: 'info',
    message: '',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setColorMode: (state, action: PayloadAction<ColorMode>) => {
      state.colorMode = action.payload;
    },

    toggleColorMode: (state) => {
      state.colorMode = state.colorMode === 'light' ? 'dark' : 'light';
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    setSuccess: (state, action: PayloadAction<string | null>) => {
      state.success = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    clearSuccess: (state) => {
      state.success = null;
    },

    showNotification: (
      state,
      action: PayloadAction<{
        type: 'success' | 'error' | 'info' | 'warning';
        message: string;
      }>
    ) => {
      state.notification = {
        visible: true,
        type: action.payload.type,
        message: action.payload.message,
      };
    },

    hideNotification: (state) => {
      state.notification.visible = false;
    },
  },
});

export const {
  setColorMode,
  toggleColorMode,
  setLoading,
  setError,
  setSuccess,
  clearError,
  clearSuccess,
  showNotification,
  hideNotification,
} = uiSlice.actions;

export default uiSlice.reducer;


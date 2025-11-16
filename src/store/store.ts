/**
 * Redux Store Configuration
 * Combines all slices and configures middleware
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import uiReducer from './slices/ui.slice';
import contentReducer from './slices/content.slice';
import testReducer from './slices/test.slice';
import practiceReducer from './slices/practice.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    content: contentReducer,
    testSession: testReducer,
    practice: practiceReducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types which may contain non-serializable data
        ignoredActions: ['auth/login/fulfilled', 'auth/restoreAuth/fulfilled'],
        // Ignore these paths in the state
        ignoredPaths: [],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


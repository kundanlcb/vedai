/**
 * Authentication API Endpoints
 * Handles login, registration, and token refresh
 */

import { api } from '../client';
import { AuthLoginRequest, AuthLoginResponse } from '../../types/api';

/**
 * Mock login endpoint
 * TODO: Replace with real backend endpoint when available
 */
export const authAPI = {
  /**
   * Login with email and password
   * @param credentials Email and password
   * @returns Access token and user ID
   */
  login: async (_credentials: AuthLoginRequest) => {
    // For Phase 0, return mock response
    // In Phase 1+, call actual backend
    return {
      data: {
        access_token: 'mock_jwt_token_' + Date.now(),
        token_type: 'Bearer',
        user_id: 'student_' + Math.random().toString(36).substr(2, 9),
      } as AuthLoginResponse,
      success: true,
    };
  },

  /**
   * Register new student
   */
  register: async (credentials: AuthLoginRequest) => {
    return api.post<AuthLoginResponse>('/auth/register', credentials);
  },

  /**
   * Refresh access token
   * TODO: Implement when backend provides refresh endpoint
   */
  refreshToken: async (refreshToken: string) => {
    return api.post('/auth/refresh', { refresh_token: refreshToken });
  },
};


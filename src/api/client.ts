/**
 * API Client - Axios instance with interceptors
 * Handles authentication, error handling, and base configuration
 */

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { Storage } from '../utils/storage';
import { ApiErrorResponse } from '../types/api';

// Configuration
const API_BASE_URL = 'http://localhost:8000/api'; // TODO: Use env variable in Phase 1
const REQUEST_TIMEOUT = 30000; // 30 seconds

/**
 * Create and configure axios instance
 */
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /**
   * Request interceptor - Add auth token
   */
  client.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = await Storage.Auth.getToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      console.error('[API] Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  /**
   * Response interceptor - Handle errors and token refresh
   */
  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError<ApiErrorResponse>) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      // Handle 401 Unauthorized
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // TODO: Implement token refresh logic when backend provides refresh endpoint
          // const refreshToken = await Storage.Auth.getRefreshToken();
          // const response = await client.post('/auth/refresh', { refresh_token: refreshToken });
          // await Storage.Auth.setToken(response.data.access_token);
          // return client(originalRequest);

          // For now, clear auth and trigger re-login
          await Storage.Auth.clearAuthData();
          // TODO: Trigger navigation to login screen
          return Promise.reject(error);
        } catch (refreshError) {
          console.error('[API] Token refresh failed:', refreshError);
          await Storage.Auth.clearAuthData();
          return Promise.reject(refreshError);
        }
      }

      // Handle 5xx errors
      if (error.response?.status && error.response.status >= 500) {
        console.error('[API] Server error:', error.response.status, error.response.data);
      }

      // Handle network errors
      if (!error.response) {
        console.error('[API] Network error:', error.message);
      }

      return Promise.reject(error);
    }
  );

  return client;
};

export const apiClient = createApiClient();

/**
 * Type-safe API request wrapper with error handling
 */
export async function apiRequest<T = unknown>(
  config: AxiosRequestConfig
): Promise<{ data: T; success: true } | { error: ApiErrorResponse; success: false }> {
  try {
    const response = await apiClient.request<T>(config);
    return { data: response.data, success: true };
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const errorData: ApiErrorResponse = {
      detail: error.response?.data?.detail || error.message,
      status: error.response?.status,
      timestamp: new Date().toISOString(),
    };
    console.error('[API] Request failed:', errorData);
    return { error: errorData, success: false };
  }
}

/**
 * Helper functions for common HTTP methods
 */
export const api = {
  get<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return apiRequest<T>({ ...config, method: 'GET', url });
  },

  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return apiRequest<T>({ ...config, method: 'POST', url, data });
  },

  put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return apiRequest<T>({ ...config, method: 'PUT', url, data });
  },

  patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return apiRequest<T>({ ...config, method: 'PATCH', url, data });
  },

  delete<T = unknown>(url: string, config?: AxiosRequestConfig) {
    return apiRequest<T>({ ...config, method: 'DELETE', url });
  },
};

export default apiClient;


/**
 * App Configuration
 * Centralized configuration for API, features, and app constants
 */

/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000/api', // TODO: Use env variable in Phase 1
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

/**
 * Feature Flags
 * Control feature availability without code changes
 */
export const FEATURE_FLAGS = {
  ENABLE_OFFLINE_QUEUE: true,
  ENABLE_CHAT: true,
  ENABLE_ANALYTICS: true,
  ENABLE_NOTIFICATIONS: false, // Phase 2
  ENABLE_STUDY_PLAN: false, // Phase 2
  ENABLE_BOOKMARKS: false, // Phase 2
  ENABLE_NOTES: false, // Phase 2
};

/**
 * App Constants
 */
export const APP_CONSTANTS = {
  APP_NAME: 'VedAI',
  APP_VERSION: '0.0.1',
  BUILD_NUMBER: 1,

  // Pagination defaults
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,

  // Question session defaults
  DEFAULT_QUESTIONS_PER_SESSION: 10,
  MAX_QUESTIONS_PER_SESSION: 50,

  // Test defaults
  DEFAULT_TEST_DURATION_MINUTES: 60,
  AUTO_SAVE_INTERVAL_MS: 30000, // 30 seconds

  // Chat defaults
  DEFAULT_CHAT_TOP_K: 5,
  MAX_CHAT_MESSAGE_LENGTH: 1000,

  // Storage keys
  STORAGE_KEYS: {
    AUTH_TOKEN: 'auth_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_ID: 'user_id',
    USER_PROFILE: 'user_profile',
    OFFLINE_QUEUE: 'offline_queue',
  },

  // Network retry config
  NETWORK_RETRY_CONFIG: {
    INITIAL_DELAY: 1000, // 1 second
    MAX_DELAY: 30000, // 30 seconds
    MULTIPLIER: 2,
    MAX_RETRIES: 5,
  },

  // Timeouts
  TIMEOUT_SHORT: 5000, // 5 seconds
  TIMEOUT_NORMAL: 15000, // 15 seconds
  TIMEOUT_LONG: 30000, // 30 seconds

  // Debounce delays
  DEBOUNCE_SEARCH: 300,
  DEBOUNCE_INPUT: 500,

  // Animation durations
  ANIMATION_DURATION_MS: 300,

  // Performance thresholds
  INITIAL_LOAD_TIMEOUT: 3000, // 3 seconds
  SCREEN_TRANSITION_TIMEOUT: 250, // 250ms
};

/**
 * Question Types
 */
export const QUESTION_TYPES = {
  MCQ: 'MCQ',
  SHORT_ANSWER: 'SHORT_ANSWER',
  NUMERICAL: 'NUMERICAL',
};

/**
 * Difficulty Levels
 */
export const DIFFICULTY_LEVELS = {
  EASY: 'EASY',
  MEDIUM: 'MEDIUM',
  HARD: 'HARD',
};

/**
 * Test Attempt Status
 */
export const TEST_ATTEMPT_STATUS = {
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  SUBMITTED: 'SUBMITTED',
};

/**
 * API Endpoints
 * Centralized endpoint definitions for easy refactoring
 */
export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_REFRESH: '/auth/refresh',

  // Profile
  PROFILE_CREATE: '/api/students/register',
  PROFILE_GET: (id: string) => `/api/students/${id}`,
  PROFILE_GET_BY_USER: (userId: string) => `/api/students/user/${userId}`,
  PROFILE_UPDATE: (id: string) => `/api/students/${id}`,
  PROFILE_DELETE: (id: string) => `/api/students/${id}`,

  // Progress
  PROGRESS_CREATE: '/api/progress/',
  PROGRESS_UPDATE: (id: string) => `/api/progress/${id}`,
  PROGRESS_LIST: (studentId: string) => `/api/progress/student/${studentId}`,
  PROGRESS_OVERVIEW: (studentId: string) => `/api/progress/student/${studentId}/overview`,

  // Questions
  QUESTIONS_LIST: '/questions/',
  QUESTIONS_GET: (id: string | number) => `/questions/${id}`,

  // Mock Tests
  TESTS_LIST: '/api/tests/',
  TESTS_GET_BY_SUBJECT: (subject: string, className: string) =>
    `/api/tests/subject/${subject}/class/${className}`,
  TESTS_GET: (id: string | number) => `/api/tests/${id}`,
  TESTS_START: (id: string | number) => `/api/tests/${id}/start`,
  TESTS_SUBMIT: (attemptId: string) => `/api/tests/attempts/${attemptId}/submit`,
  TESTS_ATTEMPT_GET: (id: string) => `/api/tests/attempts/${id}`,
  TESTS_ATTEMPTS_LIST: (studentId: string) => `/api/tests/student/${studentId}/attempts`,
  TESTS_STATS: (studentId: string) => `/api/tests/student/${studentId}/stats`,

  // Chat/RAG
  CHAT_ASK: '/chat/ask',
};

/**
 * UI Configuration
 */
export const UI_CONFIG = {
  TOAST_DURATION: 3000, // 3 seconds
  MODAL_ANIMATION_DURATION: 300,
  DEFAULT_BUTTON_DEBOUNCE: 500,
};

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNAUTHORIZED: 'You are not authorized. Please log in again.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested item was not found.',
  TIMEOUT: 'The request timed out. Please try again.',
  OFFLINE: 'You are offline. Your changes will be synced when online.',
  UNKNOWN_ERROR: 'An unknown error occurred. Please try again.',
};

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Logged in successfully',
  LOGOUT_SUCCESS: 'Logged out successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  PROGRESS_SAVED: 'Progress saved successfully',
  ANSWER_SUBMITTED: 'Answer submitted successfully',
  TEST_SUBMITTED: 'Test submitted successfully',
};


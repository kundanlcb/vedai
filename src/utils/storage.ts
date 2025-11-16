/**
 * Secure Storage Abstraction
 * Handles sensitive data like tokens with encryption on native platforms
 */

import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SECURE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_ID: 'user_id',
};

const REGULAR_KEYS = {
  USER_PROFILE: 'user_profile',
  LAST_VIEWED_CHAPTER: 'last_viewed_chapter',
  OFFLINE_QUEUE: 'offline_queue',
  CHAT_HISTORY: 'chat_history',
};

/**
 * Store sensitive data (tokens) with encryption
 */
export const storeSecure = async (key: string, value: string): Promise<void> => {
  try {
    await EncryptedStorage.setItem(key, value);
  } catch (error) {
    console.error(`[Storage] Error storing secure value for key: ${key}`, error);
    throw error;
  }
};

/**
 * Retrieve sensitive data (tokens) with decryption
 */
export const getSecure = async (key: string): Promise<string | null> => {
  try {
    const value = await EncryptedStorage.getItem(key);
    return value || null;
  } catch (error) {
    console.error(`[Storage] Error retrieving secure value for key: ${key}`, error);
    return null;
  }
};

/**
 * Remove sensitive data
 */
export const removeSecure = async (key: string): Promise<void> => {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    console.error(`[Storage] Error removing secure value for key: ${key}`, error);
    throw error;
  }
};

/**
 * Store regular data (non-sensitive)
 */
export const store = async (key: string, value: string | object): Promise<void> => {
  try {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (error) {
    console.error(`[Storage] Error storing value for key: ${key}`, error);
    throw error;
  }
};

/**
 * Retrieve regular data
 */
export const get = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error(`[Storage] Error retrieving value for key: ${key}`, error);
    return null;
  }
};

/**
 * Retrieve and parse JSON data
 */
export const getJSON = async <T = unknown>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`[Storage] Error retrieving/parsing JSON for key: ${key}`, error);
    return null;
  }
};

/**
 * Remove regular data
 */
export const remove = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`[Storage] Error removing value for key: ${key}`, error);
    throw error;
  }
};

/**
 * Clear all storage (use with caution)
 */
export const clear = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
    // Note: EncryptedStorage doesn't have a clear method, clear keys individually if needed
  } catch (error) {
    console.error('[Storage] Error clearing storage', error);
    throw error;
  }
};

/**
 * Auth-specific helpers
 */
export const Storage = {
  Auth: {
    setToken: (token: string) => storeSecure(SECURE_KEYS.AUTH_TOKEN, token),
    getToken: () => getSecure(SECURE_KEYS.AUTH_TOKEN),
    removeToken: () => removeSecure(SECURE_KEYS.AUTH_TOKEN),

    setRefreshToken: (token: string) => storeSecure(SECURE_KEYS.REFRESH_TOKEN, token),
    getRefreshToken: () => getSecure(SECURE_KEYS.REFRESH_TOKEN),
    removeRefreshToken: () => removeSecure(SECURE_KEYS.REFRESH_TOKEN),

    setUserId: (userId: string) => storeSecure(SECURE_KEYS.USER_ID, userId),
    getUserId: () => getSecure(SECURE_KEYS.USER_ID),
    removeUserId: () => removeSecure(SECURE_KEYS.USER_ID),

    clearAuthData: async () => {
      await Promise.all([
        removeSecure(SECURE_KEYS.AUTH_TOKEN),
        removeSecure(SECURE_KEYS.REFRESH_TOKEN),
        removeSecure(SECURE_KEYS.USER_ID),
      ]);
    },
  },

  Profile: {
    setProfile: (profile: unknown) => store(REGULAR_KEYS.USER_PROFILE, JSON.stringify(profile)),
    getProfile: () => getJSON(REGULAR_KEYS.USER_PROFILE),
    removeProfile: () => remove(REGULAR_KEYS.USER_PROFILE),
  },

  Content: {
    setLastViewedChapter: (chapter: unknown) =>
      store(REGULAR_KEYS.LAST_VIEWED_CHAPTER, JSON.stringify(chapter)),
    getLastViewedChapter: () => getJSON(REGULAR_KEYS.LAST_VIEWED_CHAPTER),
    removeLastViewedChapter: () => remove(REGULAR_KEYS.LAST_VIEWED_CHAPTER),
  },

  OfflineQueue: {
    setQueue: (queue: unknown) => store(REGULAR_KEYS.OFFLINE_QUEUE, JSON.stringify(queue)),
    getQueue: () => getJSON(REGULAR_KEYS.OFFLINE_QUEUE),
    removeQueue: () => remove(REGULAR_KEYS.OFFLINE_QUEUE),
  },

  Chat: {
    setChatHistory: (history: unknown) => store(REGULAR_KEYS.CHAT_HISTORY, JSON.stringify(history)),
    getChatHistory: () => getJSON(REGULAR_KEYS.CHAT_HISTORY),
    removeChatHistory: () => remove(REGULAR_KEYS.CHAT_HISTORY),
  },
};


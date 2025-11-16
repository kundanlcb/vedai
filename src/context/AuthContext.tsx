/**
 * Authentication Context
 * Manages authentication state and operations
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student';
  profileImage?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isSignedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in (e.g., from AsyncStorage)
  const checkAuthStatus = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Implement actual auth check from AsyncStorage or API
      // For now, we'll just set loading to false
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Login function
  const login = useCallback(
    async (email: string, _password: string) => {
      try {
        setIsLoading(true);
        // TODO: Implement actual login API call
        // For demo purposes, we'll simulate a successful login
        await new Promise<void>((resolve) => setTimeout(resolve, 1500));

        const mockUser: User = {
          id: '1',
          email,
          name: email.split('@')[0],
          role: 'student',
        };

        setUser(mockUser);
        // TODO: Save token to AsyncStorage
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Signup function
  const signup = useCallback(
    async (name: string, email: string, _password: string) => {
      try {
        setIsLoading(true);
        // TODO: Implement actual signup API call
        await new Promise<void>((resolve) => setTimeout(resolve, 1500));

        const mockUser: User = {
          id: '1',
          email,
          name,
          role: 'student',
        };

        setUser(mockUser);
        // TODO: Save token to AsyncStorage
      } catch (error) {
        console.error('Signup failed:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Logout function
  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Implement actual logout API call
      await new Promise<void>((resolve) => setTimeout(resolve, 500));
      setUser(null);
      // TODO: Remove token from AsyncStorage
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check auth status on mount
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const value: AuthContextType = {
    user,
    isLoading,
    isSignedIn: !!user,
    login,
    signup,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


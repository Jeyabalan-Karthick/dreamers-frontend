
import { useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, removeStorageItem } from '@/utils/localStorage';

interface User {
  id: number;
  name: string;
  email: string;
  contact?: string;
  role?: string;
  incubationCentre?: string;
  status?: 'pending' | 'approved' | 'rejected';
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: getStorageItem('token'),
    loading: true,
  });

  useEffect(() => {
    const token = getStorageItem('token');
    const userData = getStorageItem('user');
    
    if (token && userData) {
      setAuthState({ user: userData, token, loading: false });
    } else {
      setAuthState({ user: null, token: null, loading: false });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Simulate login for frontend-only version
      const mockUser = {
        id: 1,
        name: "Test User",
        email: email,
        contact: "1234567890",
        role: "user",
        status: 'approved' as const
      };
      
      const mockToken = "mock-jwt-token";
      
      setStorageItem('token', mockToken);
      setStorageItem('user', mockUser);
      
      setAuthState({
        user: mockUser,
        token: mockToken,
        loading: false,
      });

      return { user: mockUser, token: mockToken };
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    contact: string;
    incubationCentre: string;
    incubationEmail: string;
  }) => {
    try {
      // Simulate registration for frontend-only version
      const mockUser = {
        id: 1,
        name: userData.name,
        email: userData.email,
        contact: userData.contact,
        role: "user",
        incubationCentre: userData.incubationCentre,
        status: 'pending' as const
      };
      
      const mockToken = "mock-jwt-token";
      
      setStorageItem('token', mockToken);
      setStorageItem('user', mockUser);
      
      setAuthState({
        user: mockUser,
        token: mockToken,
        loading: false,
      });

      return { user: mockUser, token: mockToken };
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    removeStorageItem('token');
    removeStorageItem('user');
    setAuthState({ user: null, token: null, loading: false });
  };

  return {
    user: authState.user,
    token: authState.token,
    loading: authState.loading,
    login,
    register,
    logout,
    isAuthenticated: !!authState.token,
  };
};

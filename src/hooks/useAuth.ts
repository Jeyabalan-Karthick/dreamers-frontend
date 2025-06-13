
import { useState, useEffect } from 'react';
import { apiRequest, API_ENDPOINTS } from '@/config/api';

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
    token: localStorage.getItem('token'),
    loading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setAuthState({ user, token, loading: false });
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({ user: null, token: null, loading: false });
      }
    } else {
      setAuthState({ user: null, token: null, loading: false });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiRequest(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setAuthState({
        user: response.user,
        token: response.token,
        loading: false,
      });

      return response;
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
      const response = await apiRequest(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setAuthState({
        user: response.user,
        token: response.token,
        loading: false,
      });

      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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

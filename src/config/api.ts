
// API Configuration
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.railway.app/api' 
  : 'http://localhost:5000/api';

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  
  // Application endpoints
  APPLICATIONS: `${API_BASE_URL}/applications`,
  SUBMIT_APPLICATION: `${API_BASE_URL}/applications/submit`,
  
  // Admin endpoints
  ADMIN_LOGIN: `${API_BASE_URL}/admin/login`,
  ADMIN_APPLICATIONS: `${API_BASE_URL}/admin/applications`,
  ADMIN_STATS: `${API_BASE_URL}/admin/stats`,
  APPROVE_APPLICATION: `${API_BASE_URL}/admin/applications/approve`,
  REJECT_APPLICATION: `${API_BASE_URL}/admin/applications/reject`,
};

// API helper functions
export const apiRequest = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || 'API request failed');
  }
  
  return response.json();
};

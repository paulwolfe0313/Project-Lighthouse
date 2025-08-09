import axios from 'axios';
import { ENDPOINTS } from './endpoints';

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor - automatically add auth token
api.interceptors.request.use(
  (config) => {
    const token = tokenManager.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle common errors
api.interceptors.response.use(
  (response) => {
    // Return just the data for successful responses
    return response.data;
  },
  (error) => {
    const { response } = error;

    if (response?.status === 401) {
      // Token is invalid/expired - let auth store handle this
      tokenManager.remove();

      // Import auth store dynamically to avoid circular dependencies
      import('@/stores/authStore').then((module) => {
        const useAuthStore = module.default;
        useAuthStore.getState().clearAuth();
      });
    }

    if (response?.status === 422) {
      // Validation errors - return the error message
      const errorMessage = response.data?.message || 'Validation failed';
      return Promise.reject(new Error(errorMessage));
    }

    // For other errors, return a generic message or the response message
    const errorMessage = response?.data?.message || `HTTP error! status: ${response?.status}` || 'Network error';
    return Promise.reject(new Error(errorMessage));
  }
);

// Token management utilities
export const tokenManager = {
  get: () => localStorage.getItem('auth_token'),
  set: (token) => localStorage.setItem('auth_token', token),
  remove: () => localStorage.removeItem('auth_token'),
  exists: () => !!localStorage.getItem('auth_token'),
};

// Auth API endpoints (using centralized constants)
export const authApi = {
  login: (credentials) => api.post(ENDPOINTS.AUTH.LOGIN, credentials),
  register: (userData) => api.post(ENDPOINTS.AUTH.REGISTER, userData),
  logout: () => api.post(ENDPOINTS.AUTH.LOGOUT),
  getUser: () => api.get(ENDPOINTS.AUTH.USER),
};

// React Query helpers for data fetching (when needed in the future)
export const createApiQuery = (endpoint, options = {}) => ({
  queryKey: [endpoint],
  queryFn: () => api.get(endpoint),
  ...options,
});

export const createApiMutation = (endpoint, method = 'post') => ({
  mutationFn: (data) => api[method](endpoint, data),
});

// Re-export ENDPOINTS for convenience
export { ENDPOINTS };

export default api;
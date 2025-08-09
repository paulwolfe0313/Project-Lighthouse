// Complete auth store with all auth functionality
import { create } from 'zustand';
import { authApi, tokenManager } from '@/lib/api';

const useAuthStore = create((set, get) => ({
  // State
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Actions
  setUser: (user) => set({
    user,
    isAuthenticated: !!user,
    error: null
  }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),

  clearAuth: () => set({
    user: null,
    isAuthenticated: false,
    error: null
  }),

  // Auth actions
  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null });

      const response = await authApi.login(credentials);

      // Store token
      if (response.token) {
        tokenManager.set(response.token);
      }

      // Update state
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });

      return { success: true, message: response.message };
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
        user: null,
        isAuthenticated: false
      });
      return { success: false, message: error.message };
    }
  },

  register: async (userData) => {
    try {
      set({ isLoading: true, error: null });

      const response = await authApi.register(userData);

      // Store token
      if (response.token) {
        tokenManager.set(response.token);
      }

      // Update state
      set({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });

      return { success: true, message: response.message };
    } catch (error) {
      set({
        error: error.message,
        isLoading: false,
        user: null,
        isAuthenticated: false
      });
      return { success: false, message: error.message };
    }
  },

  logout: async () => {
    try {
      // Call logout API (don't wait for it to complete)
      authApi.logout().catch(() => {
        // Ignore logout API errors
      });
    } finally {
      // Always clear local state and token
      tokenManager.remove();
      set({
        user: null,
        isAuthenticated: false,
        error: null
      });
    }
    return { success: true };
  },

  checkAuthStatus: async () => {
    try {
      if (!tokenManager.exists()) {
        set({ user: null, isAuthenticated: false });
        return;
      }

      const response = await authApi.getUser();
      set({
        user: response.data,
        isAuthenticated: true,
        error: null
      });
    } catch {
      // Token is invalid or expired
      tokenManager.remove();
      set({
        user: null,
        isAuthenticated: false,
        error: null
      });
    }
  },

  // Initialize the store
  initialize: async () => {
    // Always start with loading to prevent flicker
    set({ isLoading: true });

    // Small delay to prevent flicker between states
    await new Promise(resolve => setTimeout(resolve, 100));

    const token = tokenManager.get();
    if (!token) {
      // No token, user is definitely not authenticated
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
      return;
    }

    // Token exists, check if it's valid
    try {
      await get().checkAuthStatus();
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
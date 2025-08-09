import React from 'react';
import useAuthStore from '@/stores/authStore';
import { Navigate, useLocation } from 'react-router-dom';
import { FiLoader } from 'react-icons/fi';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading: loading } = useAuthStore();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FiLoader className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
// src/routes/AppRoutes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import HRDashboard from '@/pages/HRDashboard';
import FinanceDashboard from '@/pages/FinanceDashboard';
import GeneralDashboard from '@/pages/GeneralDashboard';
import Dashboard from '@/pages/Dashboard';
import ProtectedRoute from '@/components/ProtectedRoute';

const AppRoutes = () => (
  <Router>
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/hr"
        element={
          <ProtectedRoute>
            <HRDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/finance"
        element={
          <ProtectedRoute>
            <FinanceDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/general"
        element={
          <ProtectedRoute>
            <GeneralDashboard />
          </ProtectedRoute>
        }
      />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </Router>
);

export default AppRoutes;

// src/pages/GeneralDashboard.jsx
import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

const GeneralDashboard = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">Welcome to Your Dashboard</h1>
        <p className="text-gray-700 mt-2">
          This is your general user portal. You can ask the AI agent questions, check on previous tasks, or upload a file to begin a new workflow.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Ask about your PTO balance</li>
          <li>Request a company policy</li>
          <li>Upload documents for review</li>
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default GeneralDashboard;

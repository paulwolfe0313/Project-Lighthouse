// src/pages/HRDashboard.jsx
import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

const HRDashboard = () => {
  return (
    <DashboardLayout>
      {/* Optional: Add custom HR-specific message here */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">HR Dashboard</h1>
        <p className="text-gray-700 mt-2">
          Welcome HR team. You can manage onboarding, track employee requests, and automate policy responses using the AI Agent.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-2">Recent HR Activity</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>3 onboarding flows auto-launched this week</li>
          <li>5 PTO inquiries resolved via AI</li>
          <li>Policy document “Leave Guide” updated</li>
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default HRDashboard;

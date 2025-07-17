import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

const HRDashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-primary mb-2">HR Dashboard</h1>
      <p className="text-gray-700 mb-6">Welcome HR agent. Here's where you can automate onboarding, manage policies, and handle PTO inquiries using the AI agent.</p>

      <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-2">Your HR Tasks</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Send onboarding checklist</li>
          <li>Review PTO requests</li>
          <li>Schedule HR policy reminders</li>
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default HRDashboard;

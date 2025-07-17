import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

const GeneralDashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-primary mb-2">User Dashboard</h1>
      <p className="text-gray-700 mb-6">Welcome! You can use this dashboard to check your AI requests, files, or ask a general question using the agent.</p>

      <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-2">Quick Access</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Ask about your PTO balance</li>
          <li>Download last policy PDF</li>
          <li>View AI agent chat history</li>
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default GeneralDashboard;

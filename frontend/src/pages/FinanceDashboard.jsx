// src/pages/FinanceDashboard.jsx
import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

const FinanceDashboard = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">Finance Dashboard</h1>
        <p className="text-gray-700 mt-2">
          Welcome finance team. Monitor classifications, track flagged items, and collaborate with your AI agent on reports and reclassifications.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-2">Recent Finance Activity</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>expense_q1.xlsx processed successfully</li>
          <li>2 anomalies flagged in April report</li>
          <li>Reclassification model ran at 9:13am today</li>
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default FinanceDashboard;

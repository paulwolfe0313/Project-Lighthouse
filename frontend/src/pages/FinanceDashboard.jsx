import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

const FinanceDashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-primary mb-2">Finance Dashboard</h1>
      <p className="text-gray-700 mb-6">Welcome finance team. This dashboard will show workflows for classification, report generation, and expense audits.</p>

      <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>expense_q1.xlsx processed</li>
          <li>2 anomalies flagged in April report</li>
          <li>Reclassification model ran at 9:13am</li>
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default FinanceDashboard;

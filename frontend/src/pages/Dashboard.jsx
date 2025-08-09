// src/pages/Dashboard.jsx
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">Project Lighthouse Dashboard</h1>
        <p className="text-gray-700 mt-2">
          Welcome to Project Lighthouse! Choose your dashboard below or interact with the AI agent to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* HR Dashboard Card */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-2 text-blue-600">HR Dashboard</h3>
          <p className="text-gray-600 mb-4">
            Manage onboarding, employee requests, and policy automation.
          </p>
          <a
            href="/dashboard/hr"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to HR Dashboard
          </a>
        </div>

        {/* Finance Dashboard Card */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-2 text-green-600">Finance Dashboard</h3>
          <p className="text-gray-600 mb-4">
            Track expenses, manage budgets, and automate financial workflows.
          </p>
          <a
            href="/dashboard/finance"
            className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Go to Finance Dashboard
          </a>
        </div>

        {/* General Dashboard Card */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-2 text-purple-600">General Dashboard</h3>
          <p className="text-gray-600 mb-4">
            General user portal for AI interactions and document workflows.
          </p>
          <a
            href="/dashboard/general"
            className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Go to General Dashboard
          </a>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-3 text-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-blue-600 font-semibold">Upload Document</div>
            <div className="text-sm text-gray-500 mt-1">Start new workflow</div>
          </button>
          <button className="p-3 text-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-green-600 font-semibold">Ask AI Agent</div>
            <div className="text-sm text-gray-500 mt-1">Get instant help</div>
          </button>
          <button className="p-3 text-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-purple-600 font-semibold">View Reports</div>
            <div className="text-sm text-gray-500 mt-1">Check analytics</div>
          </button>
          <button className="p-3 text-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="text-orange-600 font-semibold">Settings</div>
            <div className="text-sm text-gray-500 mt-1">Manage account</div>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

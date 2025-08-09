// src/layouts/DashboardLayout.jsx
import React from 'react';
import useAuthStore from '@/stores/authStore';
import { FiLogOut, FiUser } from 'react-icons/fi';
import ClientLogo from '@/components/ClientLogo';
import Sidebar from '@/components/Sidebar';
import AgentChat from '@/components/AgentChat';
import AutomationStats from '@/components/AutomationStats';
import InsightsCharts from '@/components/InsightsCharts';

const DashboardLayout = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="h-screen bg-[#F8F9FC] text-black flex flex-col">
      {/* Top nav with logo */}
      <div className="flex items-center justify-between bg-white shadow px-6 py-3">
        <ClientLogo />

        <div className="flex items-center space-x-4">
          {/* User info */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FiUser className="h-4 w-4" />
            <span>Welcome, {user?.name || 'User'}</span>
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors"
            title="Logout"
          >
            <FiLogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>

          <div className="text-sm text-gray-400">Development Build • v0.1</div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main grid */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Center: Agent */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <AgentChat />
            </div>

            {/* Right: Stats */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <AutomationStats />
            </div>

            {/* Bottom: Graphs */}
            <div className="col-span-12">
              <InsightsCharts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

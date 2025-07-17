// src/components/Sidebar.jsx
import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#1A1B2F] text-white p-4 flex flex-col">
      <div className="text-xl font-bold mb-6">Project Lighthouse</div>
      <div className="flex-1">
        <h2 className="text-md font-semibold mb-2">Chat / Work History</h2>
        {/* This will be dynamic later */}
        <ul className="space-y-2 text-sm text-gray-300">
          <li>• Uploaded: expense_q1.xlsx</li>
          <li>• Chat: HR Agent</li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

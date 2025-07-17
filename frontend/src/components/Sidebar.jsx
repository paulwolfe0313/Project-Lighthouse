// src/components/Sidebar.jsx
import React from 'react';

const Sidebar = () => {
  return (
    <aside className="bg-background text-white w-64 p-4 border-r border-gray-800">
      <h2 className="text-lg font-semibold mb-4">Chat / Work History</h2>
      <ul className="space-y-2 text-sm">
        <li>• Uploaded: expense_q1.xlsx</li>
        <li>• Chat: HR Agent</li>
        <li>• Chat: Finance Agent</li>
        <li>• File: Q4_budget.xlsx</li>
      </ul>
    </aside>
  );
};

export default Sidebar;

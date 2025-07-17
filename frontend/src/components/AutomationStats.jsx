// src/components/AutomationStats.jsx
import React from 'react';

const AutomationStats = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-2 text-primary">Automated Tasks</h2>
      <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
        <li>Expense classification (every 10 minutes)</li>
        <li>Onboarding workflow (2/hr)</li>
        <li>Monthly compliance checks (daily)</li>
      </ul>
    </div>
  );
};

export default AutomationStats;

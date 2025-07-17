// src/components/InsightsCharts.jsx
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Mon', Uploads: 5 },
  { name: 'Tue', Uploads: 8 },
  { name: 'Wed', Uploads: 2 },
  { name: 'Thu', Uploads: 10 },
  { name: 'Fri', Uploads: 4 },
];

const InsightsCharts = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4 mt-6">
      <h2 className="text-lg font-semibold text-primary mb-4">Weekly Uploads</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="Uploads" stroke="#3A0CA3" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InsightsCharts;

// src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HRDashboard from '../pages/HRDashboard';
import FinanceDashboard from '../pages/FinanceDashboard';
import GeneralDashboard from '../pages/GeneralDashboard';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/dashboard/hr" element={<HRDashboard />} />
      <Route path="/dashboard/finance" element={<FinanceDashboard />} />
      <Route path="/dashboard/general" element={<GeneralDashboard />} />
    </Routes>
  </Router>
);

export default AppRoutes;

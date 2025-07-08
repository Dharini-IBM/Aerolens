import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Traffic from './pages/Traffic';
import Maintenance from './pages/Maintenance';

import PotholeDetection from './components/PotholeDetection';
import ParkingViolation from './components/ParkingViolation';

const App = () => {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/potholes" element={<PotholeDetection />} />
          <Route path="/violations" element={<ParkingViolation />} />
          <Route path="/traffic" element={<Traffic />} />
          <Route path="/maintenance" element={<Maintenance />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
};

export default App;

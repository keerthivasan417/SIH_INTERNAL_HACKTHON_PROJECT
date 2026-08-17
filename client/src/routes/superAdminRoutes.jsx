import React from 'react';
import { Route } from 'react-router-dom';
import SuperAdminLayout from '../components/superAdmin/SuperAdminLayout';
import SuperAdminDashboard from '../pages/superAdmin/SuperAdminDashboard';
import Districts from '../pages/superAdmin/Districts';
import Blocks from '../pages/superAdmin/Blocks';
import Schools from '../pages/superAdmin/Schools';
import GovernmentAnalytics from '../pages/superAdmin/GovernmentAnalytics';
import EducationHeatmap from '../pages/superAdmin/EducationHeatmap';
import Reports from '../pages/superAdmin/Reports';

export const superAdminRoutes = (
  <Route path="/super-admin" element={<SuperAdminLayout />}>
    <Route index element={<SuperAdminDashboard />} />
    <Route path="dashboard" element={<SuperAdminDashboard />} />
    <Route path="districts" element={<Districts />} />
    <Route path="blocks" element={<Blocks />} />
    <Route path="schools" element={<Schools />} />
    <Route path="analytics" element={<GovernmentAnalytics />} />
    <Route path="heatmap" element={<EducationHeatmap />} />
    <Route path="reports" element={<Reports />} />
  </Route>
);

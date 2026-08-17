import React from 'react';
import { Route } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import SchoolAdminDashboard from '../pages/admin/SchoolAdminDashboard';
import Students from '../pages/admin/Students';
import Teachers from '../pages/admin/Teachers';
import Classes from '../pages/admin/Classes';
import AttendanceOverview from '../pages/admin/AttendanceOverview';
import SchoolPerformance from '../pages/admin/SchoolPerformance';
import AtRiskStudents from '../pages/admin/AtRiskStudents';
import Reports from '../pages/admin/Reports';

export const adminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<SchoolAdminDashboard />} />
    <Route path="dashboard" element={<SchoolAdminDashboard />} />
    <Route path="students" element={<Students />} />
    <Route path="teachers" element={<Teachers />} />
    <Route path="classes" element={<Classes />} />
    <Route path="attendance" element={<AttendanceOverview />} />
    <Route path="performance" element={<SchoolPerformance />} />
    <Route path="at-risk" element={<AtRiskStudents />} />
    <Route path="reports" element={<Reports />} />
  </Route>
);

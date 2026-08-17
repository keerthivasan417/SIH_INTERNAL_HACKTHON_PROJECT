import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Login from '../pages/auth/Login';
import { adminRoutes } from './adminRoutes';
import { superAdminRoutes } from './superAdminRoutes';
import { studentRoutes } from './studentRoutes';
import { teacherRoutes } from './teacherRoutes';
import { useAuth } from '../context/AuthContext';

function RootRedirect() {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role === 'school_admin') return <Navigate to="/admin/dashboard" replace />;
  if (user.role === 'super_admin') return <Navigate to="/super-admin/dashboard" replace />;
  if (user.role === 'student') return <Navigate to="/student" replace />;
  if (user.role === 'teacher') return <Navigate to="/teacher/dashboard" replace />;
  return <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root Route */}
      <Route path="/" element={<RootRedirect />} />

      {/* Public Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Login />} />

      {/* School Admin Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['school_admin']} />}>
        {adminRoutes}
      </Route>

      {/* Super Admin Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['super_admin']} />}>
        {superAdminRoutes}
      </Route>

      {/* Student Protected Routes (Priya's Module) */}
      <Route element={<ProtectedRoute allowedRoles={['student']} />}>
        {studentRoutes}
      </Route>

      {/* Teacher Protected Routes (Renita's Module) */}
      <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
        {teacherRoutes}
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

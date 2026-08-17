import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--bg-app)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '4px solid #e0f2f7', borderTopColor: 'var(--teal-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }} />
          <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Verifying credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to user's authorized role home
    let redirectPath = '/login';
    if (user.role === 'student') redirectPath = '/student';
    else if (user.role === 'teacher') redirectPath = '/teacher';
    else if (user.role === 'school_admin') redirectPath = '/admin/dashboard';
    else if (user.role === 'super_admin') redirectPath = '/super-admin/dashboard';

    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}

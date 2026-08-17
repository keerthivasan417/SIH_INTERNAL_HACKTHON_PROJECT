import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  School, 
  CalendarCheck, 
  TrendingUp, 
  AlertTriangle, 
  FileText, 
  LogOut, 
  Menu, 
  X, 
  Building2,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/students', label: 'Students', icon: Users },
  { path: '/admin/teachers', label: 'Teachers', icon: GraduationCap },
  { path: '/admin/classes', label: 'Classes', icon: School },
  { path: '/admin/attendance', label: 'Attendance', icon: CalendarCheck },
  { path: '/admin/performance', label: 'Performance', icon: TrendingUp },
  { path: '/admin/at-risk', label: 'At-Risk Students', icon: AlertTriangle, badge: 'High Priority' },
  { path: '/admin/reports', label: 'Reports', icon: FileText },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-container" style={{ background: 'var(--bg-app)', minHeight: '100vh', display: 'flex' }}>
      {/* Sidebar Desktop */}
      <aside 
        style={{
          width: '260px',
          background: 'var(--bg-sidebar)',
          borderRight: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 40,
          padding: '1.5rem 1rem',
          flexShrink: 0
        }}
        className="admin-sidebar"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', marginBottom: '1.5rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--teal-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building2 size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--teal-primary)', lineHeight: 1.2 }}>RuralEdu</h2>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>School Admin / HM</span>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1, overflowY: 'auto' }}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '14px',
                  textDecoration: 'none',
                  fontSize: '0.92rem',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? 'var(--teal-primary)' : 'var(--text-muted)',
                  background: isActive ? 'var(--teal-light)' : 'transparent',
                  transition: 'all 0.15s ease',
                })}
              >
                <Icon size={19} />
                <span>{item.label}</span>
                {item.badge && (
                  <span style={{ marginLeft: 'auto', fontSize: '0.68rem', padding: '0.2rem 0.5rem', borderRadius: '999px', background: 'var(--pastel-coral)', color: '#e11d48', fontWeight: 700 }}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', marginTop: 'auto' }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '12px',
              border: 'none',
              background: 'transparent',
              color: '#dc2626',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header */}
        <header 
          style={{
            background: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            padding: '1rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
              className="mobile-menu-btn"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h1 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {user?.schoolName || 'Govt. High School, Baripada'}
                </h1>
                <span className="pill-badge pill-teal" style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}>
                  HM Dashboard
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.15rem' }}>
                <Calendar size={13} /> Academic Year: <strong>{user?.academicYear || '2026-2027'}</strong> • District: <strong>{user?.district || 'Mayurbhanj'}</strong>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {user?.name || 'Dr. B. K. Mohapatra'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Headmaster (HM)
              </div>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--teal-light)', color: 'var(--teal-primary)', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              HM
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '1.5rem', minWidth: 0 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

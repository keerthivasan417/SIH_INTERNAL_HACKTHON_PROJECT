import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MapPin, 
  Layers, 
  School, 
  BarChart3, 
  Map, 
  FileSpreadsheet, 
  LogOut, 
  Menu, 
  X, 
  Landmark,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { path: '/super-admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/super-admin/districts', label: 'Districts', icon: MapPin },
  { path: '/super-admin/blocks', label: 'Blocks', icon: Layers },
  { path: '/super-admin/schools', label: 'Schools', icon: School },
  { path: '/super-admin/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/super-admin/heatmap', label: 'Heatmap', icon: Map, badge: 'GIS View' },
  { path: '/super-admin/reports', label: 'Reports', icon: FileSpreadsheet },
];

export default function SuperAdminLayout() {
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
          width: '265px',
          background: '#0f172a',
          color: '#f8fafc',
          borderRight: '1px solid #1e293b',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 40,
          padding: '1.5rem 1rem',
          flexShrink: 0
        }}
        className="super-admin-sidebar"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '1.5rem', borderBottom: '1px solid #1e293b', marginBottom: '1.5rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#38bdf8', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Landmark size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.2 }}>Odisha Govt</h2>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>Super Admin / State</span>
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
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#38bdf8' : '#94a3b8',
                  background: isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                  transition: 'all 0.15s ease',
                })}
              >
                <Icon size={19} />
                <span>{item.label}</span>
                {item.badge && (
                  <span style={{ marginLeft: 'auto', fontSize: '0.68rem', padding: '0.2rem 0.5rem', borderRadius: '999px', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', fontWeight: 700 }}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '1rem', marginTop: 'auto' }}>
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
              color: '#f87171',
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
                  State Education Command Center
                </h1>
                <span className="pill-badge" style={{ background: '#e0f2fe', color: '#0284c7', fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}>
                  Govt. of Odisha
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.15rem' }}>
                <Calendar size={13} /> Academic Year: <strong>{user?.academicYear || '2026-2027'}</strong> • Department: <strong>School & Mass Education</strong>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {user?.name || 'Smt. Ananya Patnaik, IAS'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Director, Primary Education
              </div>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e0f2fe', color: '#0284c7', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              GA
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

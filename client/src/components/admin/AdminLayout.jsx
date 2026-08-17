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
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/students', label: 'Students', icon: Users },
  { path: '/admin/teachers', label: 'Teachers', icon: GraduationCap },
  { path: '/admin/classes', label: 'Classes', icon: School },
  { path: '/admin/attendance', label: 'Attendance', icon: CalendarCheck },
  { path: '/admin/performance', label: 'Performance', icon: TrendingUp },
  { path: '/admin/at-risk', label: 'At-Risk Students', icon: AlertTriangle, badge: 'Early Warning' },
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

  const navContent = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Brand & School Tag */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'var(--teal-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(42, 107, 124, 0.2)' }}>
            <Building2 size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--teal-primary)', lineHeight: 1.1 }}>RuralEdu</h2>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>School Administration</span>
          </div>
        </div>
        {mobileMenuOpen && (
          <button 
            onClick={() => setMobileMenuOpen(false)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.25rem' }}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation Links */}
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
                <span 
                  style={{ 
                    marginLeft: 'auto', 
                    fontSize: '0.68rem', 
                    padding: '0.15rem 0.5rem', 
                    borderRadius: '999px', 
                    background: 'var(--pastel-coral)', 
                    color: '#e11d48', 
                    fontWeight: 700 
                  }}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* HM Profile Footer */}
      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.5rem', background: 'var(--bg-app)', borderRadius: '12px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--teal-primary)', color: '#fff', fontWeight: 800, fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            HM
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.name || 'Dr. B. K. Mohapatra'}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Headmaster
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            width: '100%',
            padding: '0.6rem 0.85rem',
            borderRadius: '12px',
            border: 'none',
            background: 'transparent',
            color: '#dc2626',
            fontSize: '0.88rem',
            fontWeight: 700,
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'background 0.15s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#fee2e2'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <LogOut size={17} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="app-container" style={{ background: 'var(--bg-app)', minHeight: '100vh', display: 'flex' }}>
      {/* Sidebar Desktop */}
      <aside 
        style={{
          width: '260px',
          background: 'var(--bg-sidebar)',
          borderRight: '1px solid #e2e8f0',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 40,
          padding: '1.5rem 1rem',
          flexShrink: 0
        }}
        className="admin-sidebar"
      >
        {navContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(2px)',
            zIndex: 90,
          }}
          className="mobile-backdrop"
        />
      )}

      {/* Mobile Drawer Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '280px',
          background: '#ffffff',
          zIndex: 100,
          padding: '1.25rem',
          boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column'
        }}
        className="mobile-drawer"
      >
        {navContent}
      </div>

      {/* Main Content Area */}
      <div className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header */}
        <header 
          style={{
            background: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            padding: '0.9rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 30,
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.4rem',
                borderRadius: '8px',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-main)'
              }}
              className="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={22} />
            </button>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.12rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {user?.schoolName || 'Govt. High School, Baripada'}
                </h1>
                <span className="pill-badge pill-teal" style={{ fontSize: '0.72rem', padding: '0.15rem 0.55rem' }}>
                  HM Dashboard
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.1rem', flexWrap: 'wrap' }}>
                <Calendar size={13} /> AY: <strong>{user?.academicYear || '2026-2027'}</strong> • District: <strong>{user?.district || 'Mayurbhanj'}</strong> • Block: <strong>{user?.block || 'Baripada Sadar'}</strong>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ textAlign: 'right' }} className="header-user-info">
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {user?.name || 'Dr. B. K. Mohapatra'}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Headmaster (HM)
              </div>
            </div>
            <div 
              style={{ 
                width: '38px', 
                height: '38px', 
                borderRadius: '50%', 
                background: 'var(--teal-light)', 
                color: 'var(--teal-primary)', 
                fontWeight: 800, 
                fontSize: '0.88rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(42, 107, 124, 0.15)'
              }}
            >
              HM
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, minWidth: 0 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

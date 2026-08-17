import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStudent } from '../../context/StudentContext';
import {
  LayoutDashboard,
  MapPin,
  BookOpen,
  Bot,
  FlaskConical,
  BarChart3,
  Trophy,
  User
} from 'lucide-react';

export const StudentBottomNav = () => {
  const { t } = useStudent();

  const navItems = [
    { path: '/student/dashboard', label: t('dashboard') || 'Dashboard', icon: LayoutDashboard },
    { path: '/student/roadmap', label: t('roadmap') || 'Roadmap', icon: MapPin },
    { path: '/student/subjects', label: t('subjects') || 'Subjects', icon: BookOpen },
    { path: '/student/ai-doubt', label: t('aiDoubtSolver') || 'AI Doubt', icon: Bot },
    { path: '/student/virtual-lab', label: t('virtualLab') || 'Virtual Lab', icon: FlaskConical },
    { path: '/student/progress', label: t('progress') || 'Progress', icon: BarChart3 },
    { path: '/student/leaderboard', label: t('leaderboard') || 'Leaderboard', icon: Trophy },
    { path: '/student/profile', label: t('profile') || 'Profile', icon: User }
  ];

  return (
    <nav className="student-bottom-nav-static" style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '800px',
      zIndex: 9990,
      height: '72px',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '4px solid #131127',
      borderLeft: '4px solid #131127',
      borderRight: '4px solid #131127',
      borderRadius: '24px 24px 0 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      padding: '0 12px',
      boxSizing: 'border-box'
    }}>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justify: 'center',
              padding: isActive ? '6px 14px' : '6px 10px',
              borderRadius: '16px',
              background: isActive ? '#EEF2FF' : 'transparent',
              color: isActive ? '#4F46E5' : '#64748B',
              textDecoration: 'none',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              flex: '1 1 0',
              maxWidth: '130px',
              margin: '0 2px'
            })}
          >
            {({ isActive }) => (
              <>
                <Icon size={20} color={isActive ? '#4F46E5' : '#64748B'} strokeWidth={isActive ? 2.5 : 1.8} />
                <span style={{
                  fontSize: '11px',
                  fontWeight: isActive ? '900' : '600',
                  marginTop: '3px',
                  whiteSpace: 'nowrap',
                  textAlign: 'center'
                }}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default StudentBottomNav;

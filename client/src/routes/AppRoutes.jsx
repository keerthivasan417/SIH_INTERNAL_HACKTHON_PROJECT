import React from 'react'
import { Routes, Route, Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  LayoutDashboard, Users, BookOpen, Calendar, BarChart2, 
  HelpCircle, FileText, PlusCircle, AlertTriangle, Lightbulb, 
  Music, LogOut, Radio, User, Award, GraduationCap, Bell, Settings, ChevronDown
} from 'lucide-react'

// Import teacher pages
import Dashboard from '../pages/teacher/Dashboard'
import StudentMonitoring from '../pages/teacher/StudentMonitoring'
import StudentDetails from '../pages/teacher/StudentDetails'
import ClassMonitoring from '../pages/teacher/ClassMonitoring'
import Attendance from '../pages/teacher/Attendance'
import QuizManagement from '../pages/teacher/QuizManagement'
import CreateQuiz from '../pages/teacher/CreateQuiz'
import RiskAlerts from '../pages/teacher/RiskAlerts'
import AIRecommendations from '../pages/teacher/AIRecommendations'
import LessonsUpload from '../pages/teacher/LessonsUpload'
import Assignments from '../pages/teacher/Assignments'
import Resources from '../pages/teacher/Resources'
import Reports from '../pages/teacher/Reports'

// Dummy fallback components for Student and Admin to satisfy the project context
const MockStudentDashboard = () => <div className="card"><h2>Student Dashboard (Priya's Module)</h2><p>Access Restricted/Preserved.</p></div>
const MockAdminDashboard = () => <div className="card"><h2>Admin Dashboard (Keerthivasan's Module)</h2><p>Access Restricted/Preserved.</p></div>
const MockSettings = () => <div className="card"><h2>Settings</h2><p>System configuration panel.</p></div>

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth()
  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading authentication...</div>
  if (!user) return <Navigate to="/login" replace />
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>Access Denied: Unauthorized role ({user.role})</div>
  }
  return children
}

const TeacherLayout = ({ children }) => {
  const { user, logout, login } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const sidebarLinks = [
    { to: '/teacher/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/teacher/classes', label: 'My Classes', icon: GraduationCap },
    { to: '/teacher/students', label: 'Students', icon: Users },
    { to: '/teacher/attendance', label: 'Attendance', icon: Calendar },
    { to: '/teacher/quizzes', label: 'Quizzes', icon: HelpCircle },
    { to: '/teacher/lessons', label: 'Lessons', icon: BookOpen },
    { to: '/teacher/assignments', label: 'Assignments', icon: FileText },
    { to: '/teacher/resources', label: 'Resources', icon: Radio },
    { to: '/teacher/reports', label: 'Reports', icon: BarChart2 },
    { to: '/teacher/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="dashboard-layout" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Sidebar */}
      <aside className="sidebar" style={{ 
        width: '240px', 
        backgroundColor: '#ffffff', 
        borderRight: '1px solid #e5e7eb', 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh', 
        position: 'sticky', 
        top: 0, 
        zIndex: 10 
      }}>
        {/* Logo and Name */}
        <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ color: 'hsl(245 75% 60%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.3rem', color: '#312e81', letterSpacing: '-0.02em' }}>RuralEdu</span>
        </div>

        {/* Navigation links */}
        <nav style={{ padding: '0 1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', overflowY: 'auto' }}>
          {sidebarLinks.map(link => {
            const Icon = link.icon
            const isActive = location.pathname === link.to || (link.to !== '/teacher/dashboard' && location.pathname.startsWith(link.to))
            return (
              <Link 
                key={link.to} 
                to={link.to} 
                className="btn sidebar-link" 
                style={{ 
                  justifyContent: 'flex-start',
                  backgroundColor: isActive ? 'hsl(245 75% 60% / 0.08)' : 'transparent',
                  color: isActive ? 'hsl(245 75% 60%)' : '#4b5563',
                  fontWeight: isActive ? 600 : 500,
                  textDecoration: 'none',
                  borderRadius: '10px',
                  padding: '0.625rem 0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: '0.9rem',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={18} style={{ color: isActive ? 'hsl(245 75% 60%)' : '#6b7280' }} />
                <span>{link.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Profile Card & Switcher & Logout */}
        <div style={{ padding: '1rem', borderTop: '1px solid #f3f4f6', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {/* User profile section at the bottom of Sidebar */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '0.75rem', 
            backgroundColor: '#ffffff', 
            borderRadius: '12px',
            border: '1px solid #f3f4f6'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'hsl(245 75% 60% / 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'hsl(245 75% 60%)', fontSize: '0.9rem' }}>
                  R
                </div>
                <div style={{ position: 'absolute', bottom: '0', right: '0', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', border: '1.5px solid #ffffff' }}></div>
              </div>
              <div style={{ overflow: 'hidden', textAlign: 'left' }}>
                <div style={{ fontWeight: 600, fontSize: '0.825rem', color: '#111827', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '110px' }}>Renita Esther V</div>
                <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Teacher</div>
              </div>
            </div>
            <ChevronDown size={14} style={{ color: '#9ca3af' }} />
          </div>
          <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start', textDecoration: 'none', borderRadius: '10px', fontSize: '0.85rem', padding: '0.5rem 0.75rem', border: 'none', backgroundColor: 'transparent', color: '#4b5563' }} onClick={() => logout()}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Header matching the reference structure */}
        <header className="header" style={{ 
          height: '76px', 
          backgroundColor: 'transparent', 
          borderBottom: 'none', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '0 2.5rem' 
        }}>
          {/* Top banner titles are displayed directly inside the page, but let's place School dropdown on header */}
          <div></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* School selector dropdown */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              padding: '0.5rem 1rem', 
              backgroundColor: '#ffffff', 
              borderRadius: '12px', 
              border: '1px solid #e5e7eb',
              cursor: 'pointer'
            }}>
              <div style={{ backgroundColor: '#f3f4f6', padding: '0.375rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'hsl(245 75% 60%)' }}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#111827', lineHeight: '1.2' }}>{user?.schoolName || 'Govt. Girls High School, Odia'}</div>
                <div style={{ fontSize: '0.7rem', color: '#6b7280', lineHeight: '1.2' }}>Academic Year: {user?.academicYear || '2026-2027'}</div>
              </div>
              <ChevronDown size={16} style={{ color: '#4b5563', marginLeft: '0.5rem' }} />
            </div>

            {/* Notification and avatar */}
            <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#4b5563', padding: '0.5rem', display: 'flex', alignItems: 'center', position: 'relative' }}>
              <Bell size={20} />
              <div style={{ position: 'absolute', top: '5px', right: '5px', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'hsl(0 84% 60%)' }}></div>
            </button>
            
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'hsl(245 75% 60% / 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'hsl(245 75% 60%)', border: '1px solid #e5e7eb' }}>
              R
            </div>

            {/* Tester Switcher */}
            <div style={{ display: 'flex', gap: '0.25rem', fontSize: '0.7rem', opacity: 0.3 }}>
              <button onClick={() => login('teacher')} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6b7280' }}>T</button>
              <button onClick={() => { login('student'); navigate('/student/dashboard'); }} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6b7280' }}>S</button>
              <button onClick={() => { login('school_admin'); navigate('/admin/dashboard'); }} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6b7280' }}>A</button>
            </div>
          </div>
        </header>
        <main className="content-body" style={{ padding: '0 2.5rem 2.5rem 2.5rem', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  )
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/teacher/dashboard" replace />} />
      <Route path="/login" element={
        <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' }}>
          <div className="card" style={{ width: '360px', textAlign: 'center', borderRadius: '12px', padding: '2rem', border: '1px solid #e5e7eb', backgroundColor: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <h2 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>RuralEdu Login</h2>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Login automatically authenticated for testing.</p>
            <Link to="/teacher/dashboard" className="btn btn-primary" style={{ width: '100%', borderRadius: '8px', textDecoration: 'none' }}>Enter Dashboard</Link>
          </div>
        </div>
      } />

      {/* Protected Student Route */}
      <Route path="/student/*" element={
        <ProtectedRoute allowedRoles={['student']}>
          <MockStudentDashboard />
        </ProtectedRoute>
      } />

      {/* Protected Admin Route */}
      <Route path="/admin/*" element={
        <ProtectedRoute allowedRoles={['school_admin', 'super_admin']}>
          <MockAdminDashboard />
        </ProtectedRoute>
      } />

      {/* Protected Teacher Routes */}
      <Route path="/teacher/*" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <TeacherLayout>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="classes" element={<ClassMonitoring />} />
              <Route path="students" element={<StudentMonitoring />} />
              <Route path="students/:studentId" element={<StudentDetails />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="quizzes" element={<QuizManagement />} />
              <Route path="quizzes/create" element={<CreateQuiz />} />
              <Route path="lessons" element={<LessonsUpload />} />
              <Route path="assignments" element={<Assignments />} />
              <Route path="resources" element={<Resources />} />
              <Route path="risk-alerts" element={<RiskAlerts />} />
              <Route path="recommendations" element={<AIRecommendations />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<MockSettings />} />
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </TeacherLayout>
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/teacher/dashboard" replace />} />
    </Routes>
  )
}

export default AppRoutes


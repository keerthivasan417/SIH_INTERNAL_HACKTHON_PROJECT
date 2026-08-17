import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { School, Building2, Landmark, Users, GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRole, setSelectedRole] = useState('school_admin');

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    const loggedInUser = login(role);
    
    // Redirect based on selected role
    if (role === 'school_admin') navigate('/admin/dashboard');
    else if (role === 'super_admin') navigate('/super-admin/dashboard');
    else if (role === 'student') navigate('/student');
    else if (role === 'teacher') navigate('/teacher');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-app)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: '640px' }}>
        {/* Brand Banner */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.25rem', background: '#fff', borderRadius: 'var(--radius-pill)', boxShadow: 'var(--shadow-sm)', marginBottom: '1rem' }}>
            <Building2 size={24} color="var(--teal-primary)" />
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--teal-primary)' }}>RuralEdu</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Authentication & Role Gateway</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.35rem' }}>
            Select your role to access your dedicated dashboard and administration tools.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {/* School Admin / HM Card */}
          <div 
            className="pastel-card card-blue"
            onClick={() => handleRoleSelect('school_admin')}
            style={{ cursor: 'pointer', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#dbeafe', color: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <School size={22} />
              </div>
              <span className="pill-badge" style={{ background: '#bfdbfe', color: '#1e3a8a', fontSize: '0.72rem' }}>School Level</span>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e3a8a' }}>School Admin / Headmaster</h3>
              <p style={{ fontSize: '0.82rem', color: '#3b82f6', marginTop: '0.2rem' }}>
                Manage students, teachers, attendance, classes, and at-risk early warnings.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#1e40af', fontWeight: 700, fontSize: '0.85rem', marginTop: 'auto' }}>
              Enter HM Dashboard <ArrowRight size={16} />
            </div>
          </div>

          {/* Super Admin / Government Card */}
          <div 
            className="pastel-card card-purple"
            onClick={() => handleRoleSelect('super_admin')}
            style={{ cursor: 'pointer', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#ede9fe', color: '#6d28d9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Landmark size={22} />
              </div>
              <span className="pill-badge" style={{ background: '#ddd6fe', color: '#5b21b6', fontSize: '0.72rem' }}>State Level</span>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#5b21b6' }}>Super Admin / Government</h3>
              <p style={{ fontSize: '0.82rem', color: '#7c3aed', marginTop: '0.2rem' }}>
                District/block analytics, statewide GIS heatmap, and policy reporting.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#6d28d9', fontWeight: 700, fontSize: '0.85rem', marginTop: 'auto' }}>
              Enter Command Center <ArrowRight size={16} />
            </div>
          </div>

          {/* Student Role */}
          <div 
            className="pastel-card card-yellow"
            onClick={() => handleRoleSelect('student')}
            style={{ cursor: 'pointer', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={22} />
              </div>
              <span className="pill-badge" style={{ background: '#fde68a', color: '#92400e', fontSize: '0.72rem' }}>Student</span>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#92400e' }}>Student Portal</h3>
              <p style={{ fontSize: '0.82rem', color: '#d97706', marginTop: '0.2rem' }}>
                Gamified roadmaps, quests, lessons, and peer challenges (Priya).
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#b45309', fontWeight: 700, fontSize: '0.85rem', marginTop: 'auto' }}>
              Enter Student App <ArrowRight size={16} />
            </div>
          </div>

          {/* Teacher Role */}
          <div 
            className="pastel-card card-green"
            onClick={() => handleRoleSelect('teacher')}
            style={{ cursor: 'pointer', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#d1fae5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap size={22} />
              </div>
              <span className="pill-badge" style={{ background: '#a7f3d0', color: '#065f46', fontSize: '0.72rem' }}>Teacher</span>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#065f46' }}>Teacher Portal</h3>
              <p style={{ fontSize: '0.82rem', color: '#059669', marginTop: '0.2rem' }}>
                Class attendance, quiz creation, assignments, and alerts (Renita).
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#047857', fontWeight: 700, fontSize: '0.85rem', marginTop: 'auto' }}>
              Enter Teacher App <ArrowRight size={16} />
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
          <ShieldCheck size={16} color="var(--teal-primary)" />
          Role-Based Access Control (RBAC) active.
        </div>
      </div>
    </div>
  );
}

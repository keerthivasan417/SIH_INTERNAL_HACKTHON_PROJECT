import React, { useState } from 'react';
import { LayoutDashboard, Users, GraduationCap, CalendarCheck, TrendingUp, AlertTriangle } from 'lucide-react';

export default function SchoolAdminDashboard() {
  const [loading] = useState(false);

  return (
    <div className="page-wrapper" style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>School Executive Overview</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
              Real-time monitoring of student engagement, attendance, and academic performance for Govt. High School, Baripada.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <span className="pill-badge pill-teal">Status: Active School</span>
            <span className="pill-badge pill-yellow">Term 2 Examination Cycle</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          Loading dashboard metrics...
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Top KPI Cards */}
          <div className="grid-cols-4">
            <div className="pastel-card card-blue">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e40af' }}>TOTAL STUDENTS</span>
                <Users size={20} color="#1e40af" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e3a8a' }}>486</div>
              <div style={{ fontSize: '0.78rem', color: '#3b82f6', marginTop: '0.25rem' }}>Across Classes 6 to 10</div>
            </div>

            <div className="pastel-card card-green">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#065f46' }}>TEACHING STAFF</span>
                <GraduationCap size={20} color="#065f46" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#064e3b' }}>18</div>
              <div style={{ fontSize: '0.78rem', color: '#10b981', marginTop: '0.25rem' }}>100% Assigned</div>
            </div>

            <div className="pastel-card card-yellow">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#92400e' }}>AVG ATTENDANCE</span>
                <CalendarCheck size={20} color="#92400e" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#78350f' }}>87.4%</div>
              <div style={{ fontSize: '0.78rem', color: '#d97706', marginTop: '0.25rem' }}>+2.1% from last month</div>
            </div>

            <div className="pastel-card card-coral">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#991b1b' }}>AT-RISK STUDENTS</span>
                <AlertTriangle size={20} color="#991b1b" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#7f1d1d' }}>24</div>
              <div style={{ fontSize: '0.78rem', color: '#ef4444', marginTop: '0.25rem' }}>Identified for intervention</div>
            </div>
          </div>

          <div className="pastel-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Foundation Ready</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Phase 2 routing and layout initialization is complete. Detailed charts and data models will be populated in subsequent phases.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

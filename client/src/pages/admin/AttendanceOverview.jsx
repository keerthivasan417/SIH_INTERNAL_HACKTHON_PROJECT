import React from 'react';
import { CalendarCheck, TrendingUp, UserX } from 'lucide-react';

export default function AttendanceOverview() {
  return (
    <div className="page-wrapper" style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>School Attendance Analytics</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Daily attendance percentages, class trends, chronic absenteeism tracking, and monthly patterns.
          </p>
        </div>
        <div className="pill-badge pill-yellow">
          <CalendarCheck size={16} /> Current Average: 87.4%
        </div>
      </div>

      <div className="pastel-card" style={{ padding: '3rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Attendance Tracking Interface Ready
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Monthly trend lines, day-wise breakdown, and low attendance notifications will be populated in subsequent phases.
        </p>
      </div>
    </div>
  );
}

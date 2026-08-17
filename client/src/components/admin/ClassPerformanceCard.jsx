import React from 'react';
import { School, TrendingUp, Users, CalendarCheck, CheckCircle } from 'lucide-react';

export default function ClassPerformanceCard({
  classNameTitle,
  studentsCount,
  avgScore,
  attendanceRate,
  assignmentCompletion,
  trend,
  colorVariant = 'teal',
}) {
  const getScoreColor = (score) => {
    if (score >= 80) return '#059669';
    if (score >= 65) return 'var(--teal-primary)';
    if (score >= 50) return '#d97706';
    return '#dc2626';
  };

  const scoreColor = getScoreColor(avgScore);

  return (
    <div className="pastel-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--teal-light)', color: 'var(--teal-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem' }}>
            {classNameTitle.replace('Class ', 'C')}
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>{classNameTitle}</h4>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{studentsCount} Enrolled Students</span>
          </div>
        </div>

        {trend && (
          <span className="pill-badge pill-green" style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}>
            <TrendingUp size={12} /> {trend}
          </span>
        )}
      </div>

      {/* Progress Bar for Average Score */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
          <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Avg Score</span>
          <span style={{ fontWeight: 800, color: scoreColor }}>{avgScore}%</span>
        </div>
        <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
          <div 
            style={{ 
              width: `${Math.min(100, Math.max(0, avgScore))}%`, 
              height: '100%', 
              background: scoreColor, 
              borderRadius: '999px',
              transition: 'width 0.4s ease'
            }} 
          />
        </div>
      </div>

      {/* Secondary Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <CalendarCheck size={15} color="var(--text-muted)" />
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Attendance</div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>{attendanceRate}%</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <CheckCircle size={15} color="var(--text-muted)" />
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Assignments</div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>{assignmentCompletion}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { BookOpen, TrendingUp, User, Award } from 'lucide-react';

export default function SubjectPerformanceBar({
  subject,
  code,
  avgScore,
  passRate,
  highestScore,
  lowestScore,
  teacherName,
  trend,
}) {
  const getScoreColor = (score) => {
    if (score >= 80) return '#059669';
    if (score >= 70) return 'var(--teal-primary)';
    if (score >= 60) return '#d97706';
    return '#dc2626';
  };

  const scoreColor = getScoreColor(avgScore);

  return (
    <div 
      className="pastel-card" 
      style={{ 
        padding: '1.25rem 1.5rem', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.85rem' 
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div 
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '12px', 
              background: 'var(--teal-light)', 
              color: 'var(--teal-primary)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.85rem'
            }}
          >
            {code || subject.substring(0, 3).toUpperCase()}
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>{subject}</h4>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <User size={13} /> {teacherName}
            </span>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: scoreColor, lineHeight: 1 }}>
            {avgScore}%
          </div>
          {trend && (
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', display: 'inline-flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.15rem' }}>
              <TrendingUp size={12} /> {trend}
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
          <span>Subject Average Score</span>
          <span>Pass Rate: <strong style={{ color: '#059669' }}>{passRate}%</strong></span>
        </div>
        <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
          <div 
            style={{ 
              width: `${Math.min(100, Math.max(0, avgScore))}%`, 
              height: '100%', 
              background: scoreColor, 
              borderRadius: '999px' 
            }} 
          />
        </div>
      </div>

      {/* Score Range Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.65rem', borderTop: '1px solid #f1f5f9', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <span>Lowest Score: <strong style={{ color: lowestScore < 40 ? '#dc2626' : 'var(--text-main)' }}>{lowestScore}%</strong></span>
        <span>Highest Score: <strong style={{ color: '#059669' }}>{highestScore}%</strong></span>
      </div>
    </div>
  );
}

import React from 'react';
import { AlertTriangle, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AtRiskStudentCard({
  name,
  classNameText,
  riskLevel = 'HIGH',
  weakSubject,
  recentScore,
  recommendedIntervention,
  attendance,
}) {
  const getRiskBadge = (level) => {
    switch (level?.toUpperCase()) {
      case 'HIGH':
        return {
          bg: '#fee2e2',
          text: '#b91c1c',
          border: '#fca5a5',
          label: 'High Risk',
        };
      case 'MEDIUM':
        return {
          bg: '#fef3c7',
          text: '#b45309',
          border: '#fde68a',
          label: 'Medium Risk',
        };
      case 'LOW':
      default:
        return {
          bg: '#ecfdf5',
          text: '#047857',
          border: '#a7f3d0',
          label: 'Low / Watchlist',
        };
    }
  };

  const badge = getRiskBadge(riskLevel);

  return (
    <div 
      style={{
        background: '#ffffff',
        border: `1px solid ${badge.border}`,
        borderRadius: '16px',
        padding: '1.1rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        transition: 'transform 0.15s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', flexWrap: 'wrap' }}>
        <div>
          <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-main)' }}>{name}</h4>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{classNameText}</span>
        </div>
        <span 
          style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            background: badge.bg,
            color: badge.text,
            padding: '0.25rem 0.65rem',
            borderRadius: '999px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}
        >
          <AlertTriangle size={12} /> {badge.label}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.6rem', background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: '12px' }}>
        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Weak Subject</div>
          <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#dc2626' }}>{weakSubject}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Recent Avg</div>
          <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-main)' }}>{recentScore}%</div>
        </div>
        {attendance && (
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Attendance</div>
            <div style={{ fontSize: '0.86rem', fontWeight: 700, color: attendance < 75 ? '#dc2626' : 'var(--text-main)' }}>{attendance}%</div>
          </div>
        )}
      </div>

      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', borderTop: '1px solid #f1f5f9', paddingTop: '0.6rem' }}>
        <strong style={{ color: 'var(--text-main)' }}>Recommended: </strong>
        <span>{recommendedIntervention}</span>
      </div>
    </div>
  );
}

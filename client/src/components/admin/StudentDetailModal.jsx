import React from 'react';
import { 
  X, 
  User, 
  CalendarCheck, 
  TrendingUp, 
  BookOpen, 
  AlertTriangle, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Award,
  Sparkles
} from 'lucide-react';

export default function StudentDetailModal({ student, onClose }) {
  if (!student) return null;

  const getRiskBadge = (level) => {
    switch (level?.toUpperCase()) {
      case 'HIGH':
        return { bg: '#fee2e2', text: '#b91c1c', border: '#fca5a5', label: 'High Risk' };
      case 'MEDIUM':
        return { bg: '#fef3c7', text: '#b45309', border: '#fde68a', label: 'Medium Risk' };
      case 'LOW':
        return { bg: '#e0f2fe', text: '#0369a1', border: '#bae6fd', label: 'Low / Watchlist' };
      default:
        return { bg: '#ecfdf5', text: '#047857', border: '#a7f3d0', label: 'Normal / On Track' };
    }
  };

  const riskBadge = getRiskBadge(student.riskLevel);

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(3px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div 
        className="pastel-card"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '1.75rem',
          background: '#ffffff',
          position: 'relative',
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div 
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '16px',
                background: 'var(--teal-light)',
                color: 'var(--teal-primary)',
                fontWeight: 800,
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {student.name.charAt(0)}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>{student.name}</h3>
                <span 
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    background: riskBadge.bg,
                    color: riskBadge.text,
                    border: `1px solid ${riskBadge.border}`,
                  }}
                >
                  {riskBadge.label}
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                {student.className} • Roll No: <strong>{student.rollNo}</strong> • Category: {student.category || 'General'}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0.25rem' }}
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* 3 Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div className="pastel-card card-yellow" style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: 700 }}>Attendance</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: student.attendanceRate < 75 ? '#dc2626' : '#92400e', marginTop: '0.2rem' }}>
              {student.attendanceRate}%
            </div>
          </div>
          <div className="pastel-card card-green" style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#065f46', fontWeight: 700 }}>Academic Avg</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#065f46', marginTop: '0.2rem' }}>
              {student.academicAverage}%
            </div>
          </div>
          <div className="pastel-card card-blue" style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: 700 }}>Progress Score</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1e40af', marginTop: '0.2rem' }}>
              {student.learningProgress || 80}%
            </div>
          </div>
        </div>

        {/* Subject Quiz Scores Breakdown */}
        {student.quizScores && (
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
              Subject Proficiency & Quiz Scores
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '14px' }}>
              {Object.entries(student.quizScores).map(([subject, score]) => (
                <div key={subject} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                    {subject.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '120px', height: '6px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                      <div 
                        style={{
                          width: `${score}%`,
                          height: '100%',
                          background: score < 50 ? '#ef4444' : score < 75 ? '#f59e0b' : '#10b981',
                        }} 
                      />
                    </div>
                    <span style={{ fontWeight: 800, minWidth: '35px', textAlign: 'right', color: score < 50 ? '#dc2626' : 'var(--text-main)' }}>
                      {score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* At-Risk Intervention Diagnosis (If applicable) */}
        {student.riskDiagnosis ? (
          <div className="pastel-card card-coral" style={{ padding: '1rem 1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <AlertTriangle size={18} color="#dc2626" />
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#991b1b' }}>Early Warning Alert</h4>
              <span className="pill-badge" style={{ marginLeft: 'auto', fontSize: '0.68rem', background: '#fff', color: '#b91c1c' }}>
                {student.riskDiagnosis.status}
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#7f1d1d', marginBottom: '0.4rem' }}>
              <strong>Primary Concern:</strong> {student.riskDiagnosis.primaryCause}
            </p>
            <p style={{ fontSize: '0.82rem', color: '#7f1d1d', marginBottom: '0.4rem' }}>
              <strong>Prescribed Intervention:</strong> {student.riskDiagnosis.recommendedIntervention}
            </p>
            <p style={{ fontSize: '0.75rem', color: '#991b1b' }}>
              Assigned Faculty: <strong>{student.riskDiagnosis.assignedTeacher}</strong>
            </p>
          </div>
        ) : student.weakSubject && student.weakSubject !== 'None' ? (
          <div className="pastel-card card-yellow" style={{ padding: '0.85rem 1rem', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#92400e' }}>Focus Subject: {student.weakSubject}</div>
            <div style={{ fontSize: '0.78rem', color: '#b45309', marginTop: '0.2rem' }}>
              Topics needing attention: {student.weakTopics?.join(', ') || 'Concept recap recommended.'}
            </div>
          </div>
        ) : null}

        {/* Parent & Contact Information */}
        <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '14px', fontSize: '0.82rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div>
            <div style={{ color: 'var(--text-muted)' }}>Guardian / Parent</div>
            <div style={{ fontWeight: 700, color: 'var(--text-main)', marginTop: '0.1rem' }}>{student.parentName || 'N/A'}</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)' }}>Contact Number</div>
            <div style={{ fontWeight: 700, color: 'var(--teal-primary)', marginTop: '0.1rem' }}>{student.parentContact || 'N/A'}</div>
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ color: 'var(--text-muted)' }}>Residential Address</div>
            <div style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '0.1rem' }}>{student.address || 'Baripada, Mayurbhanj'}</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn btn-teal" style={{ fontSize: '0.88rem', padding: '0.5rem 1.25rem' }}>
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}

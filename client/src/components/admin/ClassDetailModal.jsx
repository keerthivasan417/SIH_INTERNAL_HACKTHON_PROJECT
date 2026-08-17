import React from 'react';
import { 
  X, 
  School, 
  Users, 
  CalendarCheck, 
  TrendingUp, 
  AlertTriangle, 
  BookOpen, 
  Award,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ClassDetailModal({ classData, onClose, onSelectStudent }) {
  if (!classData) return null;

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
          maxWidth: '700px',
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
              <School size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>{classData.displayName}</h3>
                <span className="pill-badge pill-teal" style={{ fontSize: '0.72rem', padding: '0.15rem 0.55rem' }}>
                  {classData.roomNo || 'Classroom'}
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                Class Teacher: <strong style={{ color: 'var(--text-main)' }}>{classData.classTeacherName}</strong>
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

        {/* Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.65rem', marginBottom: '1.25rem' }}>
          <div className="pastel-card card-blue" style={{ padding: '0.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: '#1e40af', fontWeight: 700 }}>Strength</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e40af', marginTop: '0.15rem' }}>
              {classData.studentCount}
            </div>
          </div>
          <div className="pastel-card card-yellow" style={{ padding: '0.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: '#92400e', fontWeight: 700 }}>Attendance</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#92400e', marginTop: '0.15rem' }}>
              {classData.attendanceRate}%
            </div>
          </div>
          <div className="pastel-card card-green" style={{ padding: '0.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: '#065f46', fontWeight: 700 }}>Avg Score</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#065f46', marginTop: '0.15rem' }}>
              {classData.avgPerformance}%
            </div>
          </div>
          <div className="pastel-card card-coral" style={{ padding: '0.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: '#991b1b', fontWeight: 700 }}>At-Risk</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#991b1b', marginTop: '0.15rem' }}>
              {classData.atRiskCount}
            </div>
          </div>
        </div>

        {/* Subject Insights */}
        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '14px', marginBottom: '1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Top Performing Subject</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#059669', marginTop: '0.15rem' }}>
              {classData.topSubject || 'Odia Literature'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Subject Requiring Support</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#dc2626', marginTop: '0.15rem' }}>
              {classData.needSupportSubject || 'Mathematics'}
            </div>
          </div>
        </div>

        {/* Sample Enrolled Students Roster */}
        {classData.roster && classData.roster.length > 0 && (
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
              Enrolled Students Roster ({classData.roster.length})
            </h4>
            <div className="table-container" style={{ border: '1px solid #f1f5f9' }}>
              <table>
                <thead>
                  <tr>
                    <th>Roll</th>
                    <th>Student Name</th>
                    <th>Attendance</th>
                    <th>Avg Score</th>
                    <th>Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {classData.roster.map((st) => (
                    <tr 
                      key={st.id} 
                      style={{ cursor: onSelectStudent ? 'pointer' : 'default' }}
                      onClick={() => onSelectStudent && onSelectStudent(st)}
                    >
                      <td style={{ fontWeight: 700 }}>#{st.rollNo}</td>
                      <td style={{ fontWeight: 700, color: 'var(--teal-primary)' }}>{st.name}</td>
                      <td>{st.attendanceRate}%</td>
                      <td style={{ fontWeight: 700 }}>{st.academicAverage}%</td>
                      <td>
                        <span 
                          className={`pill-badge ${
                            st.riskLevel === 'HIGH' ? 'pill-coral' : st.riskLevel === 'MEDIUM' ? 'pill-yellow' : 'pill-green'
                          }`}
                          style={{ fontSize: '0.68rem', padding: '0.1rem 0.5rem' }}
                        >
                          {st.riskLevel}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn btn-teal" style={{ fontSize: '0.88rem', padding: '0.5rem 1.25rem' }}>
            Close Class View
          </button>
        </div>
      </div>
    </div>
  );
}

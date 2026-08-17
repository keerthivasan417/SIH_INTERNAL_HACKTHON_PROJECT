import React from 'react';
import { 
  X, 
  GraduationCap, 
  BookOpen, 
  CalendarCheck, 
  TrendingUp, 
  Users, 
  Phone, 
  Mail, 
  Award,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export default function TeacherDetailModal({ teacher, onClose }) {
  if (!teacher) return null;

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
          maxWidth: '650px',
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
                background: 'var(--pastel-green)',
                color: '#059669',
                fontWeight: 800,
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <GraduationCap size={26} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>{teacher.name}</h3>
                <span 
                  className={`pill-badge ${teacher.status === 'Active' ? 'pill-green' : 'pill-yellow'}`}
                  style={{ fontSize: '0.72rem', padding: '0.15rem 0.55rem' }}
                >
                  {teacher.status}
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                {teacher.designation} • {teacher.qualification}
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
          <div className="pastel-card card-green" style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#065f46', fontWeight: 700 }}>Faculty Attendance</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#065f46', marginTop: '0.2rem' }}>
              {teacher.attendanceRate}%
            </div>
          </div>
          <div className="pastel-card card-blue" style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: 700 }}>Students Taught</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1e40af', marginTop: '0.2rem' }}>
              {teacher.totalStudents}
            </div>
          </div>
          <div className="pastel-card card-yellow" style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: 700 }}>Avg Class Score</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#92400e', marginTop: '0.2rem' }}>
              {teacher.avgClassPerformance}%
            </div>
          </div>
        </div>

        {/* Subject Load & Assigned Classes */}
        <div style={{ marginBottom: '1.25rem' }}>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
            Teaching Allocation & Subject Load
          </h4>
          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Primary Subject:</span>
              <strong style={{ color: 'var(--teal-primary)' }}>{teacher.primarySubject}</strong>
            </div>
            {teacher.secondarySubject && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Secondary Subject:</span>
                <strong style={{ color: 'var(--text-main)' }}>{teacher.secondarySubject}</strong>
              </div>
            )}
            {teacher.classTeacherOf && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Class Teacher Appointment:</span>
                <span className="pill-badge pill-teal" style={{ fontSize: '0.75rem' }}>{teacher.classTeacherOf}</span>
              </div>
            )}
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>
                Assigned Section Timetable:
              </span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {teacher.assignedClasses?.map((cls) => (
                  <span key={cls} className="pill-badge" style={{ background: '#fff', border: '1px solid #e2e8f0', fontSize: '0.78rem' }}>
                    <BookOpen size={13} color="var(--teal-primary)" /> {cls}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Service Details */}
        <div style={{ background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '14px', fontSize: '0.82rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div>
            <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Mail size={13} /> Official Email
            </div>
            <div style={{ fontWeight: 700, color: 'var(--teal-primary)', marginTop: '0.1rem', wordBreak: 'break-all' }}>
              {teacher.email}
            </div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Phone size={13} /> Phone
            </div>
            <div style={{ fontWeight: 700, color: 'var(--text-main)', marginTop: '0.1rem' }}>
              {teacher.phone}
            </div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Calendar size={13} /> Service Tenure
            </div>
            <div style={{ fontWeight: 700, color: 'var(--text-main)', marginTop: '0.1rem' }}>
              {teacher.experienceYears} Years Experience
            </div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)' }}>Joining Date</div>
            <div style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '0.1rem' }}>
              {teacher.joinDate || '2015-08-01'}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn btn-teal" style={{ fontSize: '0.88rem', padding: '0.5rem 1.25rem' }}>
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

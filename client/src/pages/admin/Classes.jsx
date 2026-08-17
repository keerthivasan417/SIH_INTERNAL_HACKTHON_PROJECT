import React, { useState, useEffect } from 'react';
import { 
  School, 
  Users, 
  CalendarCheck, 
  TrendingUp, 
  AlertTriangle, 
  Eye, 
  Filter, 
  BookOpen, 
  Layers, 
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import ClassDetailModal from '../../components/admin/ClassDetailModal';
import StudentDetailModal from '../../components/admin/StudentDetailModal';

export default function Classes() {
  const [classesList, setClassesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGrade, setSelectedGrade] = useState('ALL');
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    loadClasses();
  }, [selectedGrade]);

  const loadClasses = async () => {
    setLoading(true);
    try {
      const data = await adminService.getClasses(selectedGrade);
      setClassesList(data);
    } catch (err) {
      console.error('Error fetching classes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenClass = async (cls) => {
    const fullClass = await adminService.getClassById(cls.id);
    setSelectedClass(fullClass || cls);
  };

  const totalSections = classesList.length;
  const totalEnrolled = classesList.reduce((acc, c) => acc + c.studentCount, 0);
  const totalAtRisk = classesList.reduce((acc, c) => acc + c.atRiskCount, 0);
  const overallAvg = classesList.length 
    ? (classesList.reduce((acc, c) => acc + c.avgPerformance, 0) / classesList.length).toFixed(1)
    : 0;

  return (
    <div className="page-wrapper" style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              Class & Section Administration
            </h1>
            <span className="pill-badge pill-teal" style={{ fontSize: '0.75rem' }}>
              Classes 6 to 10 (A & B)
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '0.25rem' }}>
            Manage section allocations, monitor class attendance, academic averages, and class teacher oversight.
          </p>
        </div>

        <div className="pill-badge pill-teal">
          <School size={16} /> <strong>{totalSections}</strong> Active Class Sections
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid-cols-4" style={{ marginBottom: '1.5rem' }}>
        <div className="pastel-card card-blue" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: 700 }}>Total Student Strength</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e40af', marginTop: '0.2rem' }}>{totalEnrolled}</div>
          <span style={{ fontSize: '0.75rem', color: '#3b82f6' }}>Across 10 Classrooms</span>
        </div>

        <div className="pastel-card card-green" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#065f46', fontWeight: 700 }}>School Average Score</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#065f46', marginTop: '0.2rem' }}>{overallAvg}%</div>
          <span style={{ fontSize: '0.75rem', color: '#059669' }}>Term 2 Benchmark</span>
        </div>

        <div className="pastel-card card-yellow" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: 700 }}>Active Class Sections</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#92400e', marginTop: '0.2rem' }}>{totalSections}</div>
          <span style={{ fontSize: '0.75rem', color: '#b45309' }}>Grades 6, 7, 8, 9, 10</span>
        </div>

        <div className="pastel-card card-coral" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: 700 }}>Identified At-Risk</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#991b1b', marginTop: '0.2rem' }}>{totalAtRisk} Students</div>
          <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>Remedial Tracking Active</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="pastel-card" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {['ALL', '6', '7', '8', '9', '10'].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`btn ${selectedGrade === g ? 'btn-teal' : 'btn-outline'}`}
              style={{ fontSize: '0.82rem', padding: '0.4rem 0.9rem' }}
            >
              {g === 'ALL' ? 'All Classes (6–10)' : `Class ${g}`}
            </button>
          ))}
        </div>

        <Link to="/admin/students" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--teal-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          Open Full Student Directory <ArrowRight size={15} />
        </Link>
      </div>

      {/* Class Section Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {loading ? (
          <div className="pastel-card" style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading classes...
          </div>
        ) : (
          classesList.map((cls) => (
            <div 
              key={cls.id} 
              className="pastel-card"
              style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div 
                    style={{ 
                      width: '42px', 
                      height: '42px', 
                      borderRadius: '12px', 
                      background: 'var(--teal-light)', 
                      color: 'var(--teal-primary)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontWeight: 800 
                    }}
                  >
                    <School size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {cls.displayName}
                    </h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {cls.roomNo || 'Room 101'}
                    </span>
                  </div>
                </div>

                <span className="pill-badge pill-teal" style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem' }}>
                  {cls.studentCount} Students
                </span>
              </div>

              {/* Class Teacher Info */}
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: '12px' }}>
                Class Teacher: <strong style={{ color: 'var(--text-main)' }}>{cls.classTeacherName}</strong>
              </div>

              {/* 3 Section Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '0.5rem', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Attendance</div>
                  <strong style={{ fontSize: '0.95rem', color: cls.attendanceRate < 85 ? '#dc2626' : '#059669' }}>
                    {cls.attendanceRate}%
                  </strong>
                </div>
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '0.5rem', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Avg Score</div>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--teal-primary)' }}>
                    {cls.avgPerformance}%
                  </strong>
                </div>
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '0.5rem', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>At-Risk</div>
                  <strong style={{ fontSize: '0.95rem', color: cls.atRiskCount > 0 ? '#dc2626' : '#059669' }}>
                    {cls.atRiskCount}
                  </strong>
                </div>
              </div>

              {/* Subject Highlights */}
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <div>Top Subject: <strong style={{ color: '#059669' }}>{cls.topSubject}</strong></div>
                <div style={{ marginTop: '0.15rem' }}>Support: <strong style={{ color: '#dc2626' }}>{cls.needSupportSubject}</strong></div>
              </div>

              {/* Action Button */}
              <div style={{ marginTop: 'auto', paddingTop: '0.65rem', borderTop: '1px solid #f1f5f9' }}>
                <button
                  onClick={() => handleOpenClass(cls)}
                  className="btn btn-outline"
                  style={{ width: '100%', fontSize: '0.82rem', padding: '0.45rem 0.85rem', gap: '0.35rem' }}
                >
                  <Eye size={14} /> View Class Roster & Metrics
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Class Detail Modal */}
      {selectedClass && (
        <ClassDetailModal
          classData={selectedClass}
          onClose={() => setSelectedClass(null)}
          onSelectStudent={async (st) => {
            const fullSt = await adminService.getStudentById(st.id);
            setSelectedStudent(fullSt || st);
          }}
        />
      )}

      {/* Nested Student Profile Modal if clicked from class roster */}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}

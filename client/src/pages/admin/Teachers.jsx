import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Search, 
  Filter, 
  BookOpen, 
  CalendarCheck, 
  Users, 
  TrendingUp, 
  Eye, 
  Mail, 
  Phone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import TeacherDetailModal from '../../components/admin/TeacherDetailModal';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    loadTeachers();
  }, [searchTerm, selectedSubject, selectedStatus]);

  const loadTeachers = async () => {
    setLoading(true);
    try {
      const data = await adminService.getTeachers({
        subject: selectedSubject,
        status: selectedStatus,
        search: searchTerm,
      });
      setTeachers(data);
    } catch (err) {
      console.error('Error fetching teachers:', err);
    } finally {
      setLoading(false);
    }
  };

  const totalTeachers = teachers.length;
  const activeCount = teachers.filter((t) => t.status === 'Active').length;
  const avgAttendance = teachers.length 
    ? (teachers.reduce((acc, t) => acc + t.attendanceRate, 0) / teachers.length).toFixed(1)
    : 0;

  return (
    <div className="page-wrapper" style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              Teaching Faculty Directory & Load Allocation
            </h1>
            <span className="pill-badge pill-green" style={{ fontSize: '0.75rem' }}>
              100% Subject Mapping
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '0.25rem' }}>
            Faculty subject assignments, class teacher responsibilities, attendance tracking, and teaching performance.
          </p>
        </div>

        <div className="pill-badge pill-green">
          <GraduationCap size={16} /> Total: {totalTeachers} Faculty Members
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid-cols-4" style={{ marginBottom: '1.5rem' }}>
        <div className="pastel-card card-green" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#065f46', fontWeight: 700 }}>Active Teaching Faculty</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#065f46', marginTop: '0.2rem' }}>{activeCount} / {totalTeachers}</div>
          <span style={{ fontSize: '0.75rem', color: '#059669' }}>Fully Deployed</span>
        </div>

        <div className="pastel-card card-blue" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: 700 }}>Avg Faculty Attendance</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e40af', marginTop: '0.2rem' }}>{avgAttendance}%</div>
          <span style={{ fontSize: '0.75rem', color: '#3b82f6' }}>High Punctuality</span>
        </div>

        <div className="pastel-card card-yellow" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: 700 }}>Teacher-Student Ratio</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#92400e', marginTop: '0.2rem' }}>1 : 27</div>
          <span style={{ fontSize: '0.75rem', color: '#b45309' }}>Within RTE Norms</span>
        </div>

        <div className="pastel-card card-purple" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#5b21b6', fontWeight: 700 }}>Class Teachers Assigned</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#5b21b6', marginTop: '0.2rem' }}>10 / 10</div>
          <span style={{ fontSize: '0.75rem', color: '#7c3aed' }}>All Sections Covered</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="pastel-card" style={{ marginBottom: '1.5rem', padding: '1.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1, minWidth: '240px' }}>
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            className="input-field"
            style={{ width: '100%' }}
            placeholder="Search faculty by name or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Subject:</span>
            <select 
              className="input-field"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.8rem' }}
            >
              <option value="ALL">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science / Life Science</option>
              <option value="Odia">Odia Literature</option>
              <option value="English">English</option>
              <option value="Social Studies">Social Studies</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Status:</span>
            <select 
              className="input-field"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.8rem' }}
            >
              <option value="ALL">All Status</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>

          {(searchTerm || selectedSubject !== 'ALL' || selectedStatus !== 'ALL') && (
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedSubject('ALL');
                setSelectedStatus('ALL');
              }}
              className="btn btn-outline"
              style={{ fontSize: '0.78rem', padding: '0.45rem 0.75rem' }}
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Faculty Grid Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {loading ? (
          <div className="pastel-card" style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading faculty records...
          </div>
        ) : teachers.length === 0 ? (
          <div className="pastel-card" style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No teachers found matching the criteria.
          </div>
        ) : (
          teachers.map((teacher) => (
            <div 
              key={teacher.id} 
              className="pastel-card"
              style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div 
                    style={{ 
                      width: '42px', 
                      height: '42px', 
                      borderRadius: '12px', 
                      background: 'var(--pastel-green)', 
                      color: '#059669', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontWeight: 800 
                    }}
                  >
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {teacher.name}
                    </h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {teacher.designation}
                    </span>
                  </div>
                </div>

                <span 
                  className={`pill-badge ${teacher.status === 'Active' ? 'pill-green' : 'pill-yellow'}`}
                  style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}
                >
                  {teacher.status}
                </span>
              </div>

              {/* Subject Badges */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <span className="pill-badge pill-teal" style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem' }}>
                  <BookOpen size={12} /> {teacher.primarySubject}
                </span>
                {teacher.classTeacherOf && (
                  <span className="pill-badge pill-yellow" style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem' }}>
                    CT: {teacher.classTeacherOf}
                  </span>
                )}
              </div>

              {/* Metric stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: '12px', textAlign: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Attendance</div>
                  <strong style={{ fontSize: '0.92rem', color: '#059669' }}>{teacher.attendanceRate}%</strong>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Students</div>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--teal-primary)' }}>{teacher.totalStudents}</strong>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Avg Score</div>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>{teacher.avgClassPerformance}%</strong>
                </div>
              </div>

              {/* Assigned classes row */}
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Classes: <strong>{teacher.assignedClasses?.join(', ')}</strong>
              </div>

              {/* Action Button */}
              <div style={{ marginTop: 'auto', paddingTop: '0.65rem', borderTop: '1px solid #f1f5f9' }}>
                <button
                  onClick={() => setSelectedTeacher(teacher)}
                  className="btn btn-outline"
                  style={{ width: '100%', fontSize: '0.82rem', padding: '0.45rem 0.85rem', gap: '0.35rem' }}
                >
                  <Eye size={14} /> View Faculty Profile
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Teacher Detail Modal */}
      {selectedTeacher && (
        <TeacherDetailModal
          teacher={selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
        />
      )}
    </div>
  );
}

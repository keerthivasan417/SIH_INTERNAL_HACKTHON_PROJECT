import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  CalendarCheck, 
  Award, 
  Eye, 
  GraduationCap,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import StudentDetailModal from '../../components/admin/StudentDetailModal';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('ALL');
  const [selectedSection, setSelectedSection] = useState('ALL');
  const [selectedRisk, setSelectedRisk] = useState('ALL');
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    loadStudents();
  }, [selectedGrade, selectedSection, selectedRisk, searchTerm]);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await adminService.getStudents({
        grade: selectedGrade,
        section: selectedSection,
        riskLevel: selectedRisk,
        search: searchTerm,
      });
      setStudents(data);
    } catch (err) {
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenStudent = async (student) => {
    const fullStudent = await adminService.getStudentById(student.id);
    setSelectedStudent(fullStudent || student);
  };

  const totalCount = students.length;
  const highRiskCount = students.filter((s) => s.riskLevel === 'HIGH').length;
  const avgAttendance = students.length 
    ? Math.round(students.reduce((acc, s) => acc + s.attendanceRate, 0) / students.length) 
    : 0;
  const avgAcademic = students.length 
    ? Math.round(students.reduce((acc, s) => acc + s.academicAverage, 0) / students.length) 
    : 0;

  return (
    <div className="page-wrapper" style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              Student Directory & Profiles
            </h1>
            <span className="pill-badge pill-teal" style={{ fontSize: '0.75rem' }}>
              Classes 6–10
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '0.25rem' }}>
            Comprehensive directory of enrolled students, academic tracking, risk status, and individual learning progress.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div className="pill-badge pill-teal">
            <Users size={15} /> <strong>{totalCount}</strong> Matching Students
          </div>
        </div>
      </div>

      {/* Top 4 Metric Summaries */}
      <div className="grid-cols-4" style={{ marginBottom: '1.5rem' }}>
        <div className="pastel-card card-blue" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: 700 }}>Total Enrolled in View</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e40af', marginTop: '0.2rem' }}>{totalCount}</div>
          <span style={{ fontSize: '0.75rem', color: '#3b82f6' }}>Govt. High School Baripada</span>
        </div>

        <div className="pastel-card card-green" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#065f46', fontWeight: 700 }}>Cohort Avg Score</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#065f46', marginTop: '0.2rem' }}>{avgAcademic}%</div>
          <span style={{ fontSize: '0.75rem', color: '#059669' }}>Continuous Assessment</span>
        </div>

        <div className="pastel-card card-yellow" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: 700 }}>Avg Attendance Rate</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#92400e', marginTop: '0.2rem' }}>{avgAttendance}%</div>
          <span style={{ fontSize: '0.75rem', color: '#b45309' }}>Target: ≥ 85%</span>
        </div>

        <div className="pastel-card card-coral" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: 700 }}>High Risk Alerts</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#991b1b', marginTop: '0.2rem' }}>{highRiskCount}</div>
          <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>Requires Early Intervention</span>
        </div>
      </div>

      {/* Search & Multi-Filter Toolbar */}
      <div className="pastel-card" style={{ marginBottom: '1.5rem', padding: '1.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1, minWidth: '240px' }}>
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            className="input-field"
            style={{ width: '100%' }}
            placeholder="Search by student name, roll number, or class..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Class:</span>
            <select 
              className="input-field"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.8rem' }}
            >
              <option value="ALL">All Grades (6–10)</option>
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Section:</span>
            <select 
              className="input-field"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.8rem' }}
            >
              <option value="ALL">All Sections</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Risk Status:</span>
            <select 
              className="input-field"
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.8rem' }}
            >
              <option value="ALL">All Risk Levels</option>
              <option value="NORMAL">Normal / On Track</option>
              <option value="LOW">Low Watchlist</option>
              <option value="MEDIUM">Medium Risk</option>
              <option value="HIGH">High Priority Risk</option>
            </select>
          </div>

          {(searchTerm || selectedGrade !== 'ALL' || selectedSection !== 'ALL' || selectedRisk !== 'ALL') && (
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedGrade('ALL');
                setSelectedSection('ALL');
                setSelectedRisk('ALL');
              }}
              className="btn btn-outline"
              style={{ fontSize: '0.78rem', padding: '0.45rem 0.75rem' }}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Student Directory Table */}
      <div className="pastel-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Roll & Student Name</th>
                <th>Class & Section</th>
                <th>Attendance</th>
                <th>Academic Avg</th>
                <th>Learning Progress</th>
                <th>Risk Indicator</th>
                <th>Last Active</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                    Loading student roster...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                    No students match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                students.map((student) => {
                  const isHighRisk = student.riskLevel === 'HIGH';
                  const isMedRisk = student.riskLevel === 'MEDIUM';
                  const isLowRisk = student.riskLevel === 'LOW';

                  return (
                    <tr key={student.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <div 
                            style={{ 
                              width: '32px', 
                              height: '32px', 
                              borderRadius: '50%', 
                              background: 'var(--teal-light)', 
                              color: 'var(--teal-primary)', 
                              fontWeight: 800, 
                              fontSize: '0.8rem', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center' 
                            }}
                          >
                            #{student.rollNo}
                          </div>
                          <div>
                            <div style={{ fontWeight: 800, color: 'var(--text-main)' }}>{student.name}</div>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ID: {student.id}</span>
                          </div>
                        </div>
                      </td>

                      <td style={{ fontWeight: 700, color: 'var(--teal-primary)' }}>
                        {student.className}
                      </td>

                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ fontWeight: 800, color: student.attendanceRate < 75 ? '#dc2626' : 'var(--text-main)' }}>
                            {student.attendanceRate}%
                          </span>
                          {student.attendanceRate < 75 && (
                            <span style={{ fontSize: '0.65rem', color: '#dc2626', fontWeight: 700 }}>Low</span>
                          )}
                        </div>
                      </td>

                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <strong style={{ color: student.academicAverage < 50 ? '#dc2626' : 'var(--text-main)' }}>
                            {student.academicAverage}%
                          </strong>
                          {student.trend === 'up' ? (
                            <TrendingUp size={13} color="#059669" />
                          ) : student.trend === 'down' ? (
                            <TrendingDown size={13} color="#dc2626" />
                          ) : (
                            <Minus size={13} color="var(--text-muted)" />
                          )}
                        </div>
                      </td>

                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ width: '80px', height: '6px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                            <div 
                              style={{ 
                                width: `${student.learningProgress || 70}%`, 
                                height: '100%', 
                                background: 'var(--teal-primary)', 
                                borderRadius: '999px' 
                              }} 
                            />
                          </div>
                          <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{student.learningProgress || 70}%</span>
                        </div>
                      </td>

                      <td>
                        <span 
                          className={`pill-badge ${
                            isHighRisk ? 'pill-coral' : isMedRisk ? 'pill-yellow' : isLowRisk ? 'pill-teal' : 'pill-green'
                          }`}
                          style={{ fontSize: '0.68rem', padding: '0.15rem 0.55rem' }}
                        >
                          {isHighRisk && <AlertTriangle size={11} />}
                          {student.riskLevel}
                        </span>
                      </td>

                      <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {student.lastActive}
                      </td>

                      <td>
                        <button
                          onClick={() => handleOpenStudent(student)}
                          className="btn btn-outline"
                          style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem', gap: '0.3rem' }}
                        >
                          <Eye size={13} /> View Profile
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Profile Modal */}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}

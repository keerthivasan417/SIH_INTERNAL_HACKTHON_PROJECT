import React, { useState, useEffect } from 'react';
import { 
  CalendarCheck, 
  UserCheck, 
  UserX, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Download, 
  Search,
  Phone,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import AttendanceTable from '../../components/admin/AttendanceTable';
import StudentDetailModal from '../../components/admin/StudentDetailModal';

export default function AttendanceOverview() {
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAttendanceSummary();
      setAttendanceData(data);
    } catch (err) {
      console.error('Error fetching attendance summary:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !attendanceData) {
    return (
      <div className="page-wrapper" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        Loading attendance analytics...
      </div>
    );
  }

  const { todayOverallRate, totalEnrolled, todayPresent, todayAbsent, monthlyAverage, monthlyTrend, classWiseToday, chronicAbsenteeWatchlist } = attendanceData;

  return (
    <div className="page-wrapper" style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              School Attendance & Absenteeism Analytics
            </h1>
            <span className="pill-badge pill-yellow" style={{ fontSize: '0.75rem' }}>
              Daily Roll-Call Live
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '0.25rem' }}>
            Real-time daily roll-call metrics, class comparisons, monthly trend lines, and chronic absenteeism watchlist.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <Link to="/admin/reports" className="btn btn-teal" style={{ fontSize: '0.85rem', padding: '0.5rem 1.1rem' }}>
            <FileText size={16} /> Attendance Report
          </Link>
        </div>
      </div>

      {/* 4 Attendance KPI Summary Cards */}
      <div className="grid-cols-4" style={{ marginBottom: '1.5rem' }}>
        <div className="pastel-card card-yellow" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: 700 }}>Today's Attendance Rate</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#92400e', marginTop: '0.2rem' }}>{todayOverallRate}%</div>
          <span style={{ fontSize: '0.75rem', color: '#b45309' }}>Target: ≥ 85.0%</span>
        </div>

        <div className="pastel-card card-green" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#065f46', fontWeight: 700 }}>Students Present Today</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#065f46', marginTop: '0.2rem' }}>{todayPresent}</div>
          <span style={{ fontSize: '0.75rem', color: '#059669' }}>Out of {totalEnrolled} Students</span>
        </div>

        <div className="pastel-card card-coral" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: 700 }}>Students Absent Today</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#991b1b', marginTop: '0.2rem' }}>{todayAbsent}</div>
          <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>Requires Teacher Follow-up</span>
        </div>

        <div className="pastel-card card-blue" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: 700 }}>Monthly Cumulative Avg</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e40af', marginTop: '0.2rem' }}>{monthlyAverage}%</div>
          <span style={{ fontSize: '0.75rem', color: '#3b82f6' }}>Consistent Attendance</span>
        </div>
      </div>

      {/* Monthly Attendance Trend Visualization */}
      <div className="pastel-card" style={{ marginBottom: '1.75rem', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Monthly Attendance Performance Trend (AY 2026-2027)
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Tracking longitudinal attendance consistency across academic terms
            </span>
          </div>
          <span className="pill-badge pill-green" style={{ fontSize: '0.75rem' }}>
            <TrendingUp size={13} /> +3.7% vs Term 1
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '1rem', alignItems: 'flex-end', minHeight: '140px', paddingTop: '1rem' }}>
          {monthlyTrend.map((m) => {
            const heightPercent = Math.max(30, (m.rate - 60) * 2.5);
            const isCurrent = m.month.includes('Current');

            return (
              <div key={m.month} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <strong style={{ fontSize: '0.88rem', color: isCurrent ? 'var(--teal-primary)' : 'var(--text-main)' }}>
                  {m.rate}%
                </strong>
                <div style={{ width: '100%', maxWidth: '44px', height: '100px', background: '#f1f5f9', borderRadius: '8px', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      width: '100%', 
                      height: `${heightPercent}%`, 
                      background: isCurrent ? 'var(--teal-primary)' : '#94a3b8',
                      borderRadius: '8px 8px 0 0',
                      transition: 'height 0.4s ease'
                    }} 
                  />
                </div>
                <span style={{ fontSize: '0.78rem', fontWeight: isCurrent ? 800 : 600, color: isCurrent ? 'var(--teal-primary)' : 'var(--text-muted)' }}>
                  {m.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Class-Wise Attendance Section */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Class & Section Roll-Call Breakdown (Today)
            </h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Morning roll-call statistics reported by respective Class Teachers
            </span>
          </div>
          <Link to="/admin/classes" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--teal-primary)', textDecoration: 'none' }}>
            Manage Classes →
          </Link>
        </div>

        <AttendanceTable classAttendanceList={classWiseToday} />
      </div>

      {/* Chronic Absenteeism Watchlist */}
      <div className="pastel-card card-coral" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#991b1b' }}>
                Chronic Absenteeism Watchlist
              </h3>
              <span style={{ fontSize: '0.78rem', color: '#7f1d1d' }}>
                Students with &gt;5 absences in last 30 days requiring HM guardian outreach
              </span>
            </div>
          </div>

          <Link to="/admin/at-risk" className="pill-badge pill-coral" style={{ fontSize: '0.72rem', textDecoration: 'none' }}>
            Open Early Warning Hub →
          </Link>
        </div>

        <div className="table-container" style={{ background: '#fff', border: '1px solid #fecaca' }}>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Class</th>
                <th>Absences (Last 30 Days)</th>
                <th>Cumulative Attendance</th>
                <th>Parent Contact</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {chronicAbsenteeWatchlist.map((st) => (
                <tr key={st.studentId}>
                  <td style={{ fontWeight: 800, color: 'var(--text-main)' }}>{st.studentName}</td>
                  <td style={{ fontWeight: 700 }}>{st.className}</td>
                  <td style={{ fontWeight: 800, color: '#dc2626' }}>{st.daysAbsentLast30Days} Days Absent</td>
                  <td>
                    <span className="pill-badge pill-coral" style={{ fontSize: '0.75rem', padding: '0.15rem 0.55rem' }}>
                      {st.attendanceRate}%
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--teal-primary)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Phone size={13} /> {st.contact}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={async () => {
                        const full = await adminService.getStudentById(st.studentId);
                        setSelectedStudent(full);
                      }}
                      className="btn btn-outline"
                      style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
                    >
                      View Record
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}

import React from 'react';
import { 
  Building2, 
  Calendar, 
  CheckCircle2, 
  Download, 
  Printer, 
  X,
  FileText
} from 'lucide-react';

export default function ReportPrintView({
  reportData,
  onClose,
  onPrint,
  onExportCsv,
}) {
  if (!reportData) return null;

  const { reportType, school, generatedAt, summaryMetrics, classBreakdown, teacherBreakdown, atRiskRoster, subjectBreakdown } = reportData;

  const getReportTitle = (type) => {
    switch (type) {
      case 'attendance_report':
        return 'School Attendance & Absenteeism Comprehensive Report';
      case 'performance_report':
        return 'Academic Performance & Subject Proficiency Report';
      case 'at_risk_report':
        return 'At-Risk Students & Early Warning Remedial Report';
      case 'school_summary':
      default:
        return 'School Administrative & Comprehensive Progress Report';
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div 
        className="pastel-card printable-report-card"
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '2.5rem',
          background: '#ffffff',
          position: 'relative',
          borderRadius: '24px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Action Controls (Hidden on print) */}
        <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
          <span className="pill-badge pill-teal" style={{ fontSize: '0.8rem' }}>
            <FileText size={15} /> Official Report Preview
          </span>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button onClick={onPrint} className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '0.45rem 1rem', gap: '0.4rem' }}>
              <Printer size={15} /> Print / Save as PDF
            </button>
            <button onClick={onExportCsv} className="btn btn-teal" style={{ fontSize: '0.85rem', padding: '0.45rem 1rem', gap: '0.4rem' }}>
              <Download size={15} /> Export CSV
            </button>
            <button onClick={onClose} className="btn btn-outline" style={{ padding: '0.45rem', borderRadius: '50%' }} aria-label="Close">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Official Header */}
        <div style={{ textAlign: 'center', borderBottom: '2px solid var(--teal-primary)', paddingBottom: '1.25rem', marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
            <Building2 size={28} color="var(--teal-primary)" />
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {school?.name || 'Govt. High School, Baripada'}
            </h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            UDISE: <strong>{school?.udiseCode || '21070104802'}</strong> • District: <strong>{school?.district || 'Mayurbhanj'}</strong> • Block: <strong>{school?.block || 'Baripada Sadar'}</strong>
          </p>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--teal-primary)', marginTop: '0.85rem' }}>
            {getReportTitle(reportType)}
          </h3>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Academic Year: {school?.academicYear || '2026-2027'} • Generated On: {generatedAt}
          </div>
        </div>

        {/* Executive Summary Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.75rem' }}>
          <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Enrolled Students</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.1rem' }}>
              {summaryMetrics?.totalStudents}
            </div>
          </div>
          <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Avg Attendance</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669', marginTop: '0.1rem' }}>
              {summaryMetrics?.averageAttendance}%
            </div>
          </div>
          <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Avg Academic Score</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--teal-primary)', marginTop: '0.1rem' }}>
              {summaryMetrics?.averagePerformance}%
            </div>
          </div>
          <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>At-Risk Identified</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#dc2626', marginTop: '0.1rem' }}>
              {summaryMetrics?.totalAtRisk}
            </div>
          </div>
        </div>

        {/* Section 1: Class-Wise Performance & Attendance Table */}
        {(reportType === 'school_summary' || reportType === 'attendance_report' || reportType === 'performance_report') && classBreakdown && (
          <div style={{ marginBottom: '1.75rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
              Class & Section Distribution (Classes 6–10)
            </h4>
            <div className="table-container" style={{ border: '1px solid #e2e8f0' }}>
              <table>
                <thead>
                  <tr>
                    <th>Section</th>
                    <th>Class Teacher</th>
                    <th>Students</th>
                    <th>Attendance</th>
                    <th>Avg Score</th>
                    <th>At-Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {classBreakdown.map((cls) => (
                    <tr key={cls.id}>
                      <td style={{ fontWeight: 800 }}>{cls.displayName}</td>
                      <td>{cls.classTeacherName}</td>
                      <td>{cls.studentCount}</td>
                      <td style={{ color: cls.attendanceRate < 85 ? '#dc2626' : '#059669', fontWeight: 700 }}>{cls.attendanceRate}%</td>
                      <td style={{ fontWeight: 700 }}>{cls.avgPerformance}%</td>
                      <td style={{ color: cls.atRiskCount > 0 ? '#dc2626' : 'var(--text-muted)', fontWeight: 700 }}>{cls.atRiskCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Section 2: Subject Proficiencies */}
        {(reportType === 'school_summary' || reportType === 'performance_report') && subjectBreakdown && (
          <div style={{ marginBottom: '1.75rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
              Subject Proficiency Breakdown
            </h4>
            <div className="table-container" style={{ border: '1px solid #e2e8f0' }}>
              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Faculty Lead</th>
                    <th>Average Score</th>
                    <th>Pass Rate</th>
                    <th>Score Range</th>
                  </tr>
                </thead>
                <tbody>
                  {subjectBreakdown.map((sub) => (
                    <tr key={sub.code}>
                      <td style={{ fontWeight: 700 }}>{sub.subject}</td>
                      <td>{sub.teacherName}</td>
                      <td style={{ fontWeight: 800, color: 'var(--teal-primary)' }}>{sub.avgScore}%</td>
                      <td style={{ color: '#059669', fontWeight: 700 }}>{sub.passRate}%</td>
                      <td>{sub.lowestScore}% – {sub.highestScore}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Section 3: At-Risk Students Summary */}
        {(reportType === 'school_summary' || reportType === 'at_risk_report') && atRiskRoster && (
          <div style={{ marginBottom: '1.75rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
              Early Warning & Remedial Intervention Log
            </h4>
            <div className="table-container" style={{ border: '1px solid #e2e8f0' }}>
              <table>
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Class</th>
                    <th>Risk Tier</th>
                    <th>Weak Subject</th>
                    <th>Status</th>
                    <th>Assigned Faculty</th>
                  </tr>
                </thead>
                <tbody>
                  {atRiskRoster.map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 700 }}>{item.studentName}</td>
                      <td>{item.className}</td>
                      <td style={{ fontWeight: 800, color: item.riskTier === 'HIGH' ? '#dc2626' : '#d97706' }}>{item.riskTier}</td>
                      <td>{item.weakSubject}</td>
                      <td>{item.status}</td>
                      <td>{item.assignedTeacher}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Signatures Footer for Official HM Verification */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px dashed #cbd5e1' }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Report Verification ID</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>RURALEDU-HM-{school?.id}-2026</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.9rem' }}>
              {school?.hmName || 'Dr. B. K. Mohapatra'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Headmaster / Principal Signature
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

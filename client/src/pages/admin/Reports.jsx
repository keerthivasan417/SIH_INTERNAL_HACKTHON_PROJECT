import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Calendar, 
  CheckCircle2, 
  Users, 
  CalendarCheck, 
  TrendingUp, 
  AlertTriangle,
  FileSpreadsheet,
  Eye,
  Building2
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import ReportPrintView from '../../components/admin/ReportPrintView';

export default function Reports() {
  const [reportType, setReportType] = useState('school_summary');
  const [term, setTerm] = useState('Term 2');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    loadReport();
  }, [reportType, term]);

  const loadReport = async () => {
    setLoading(true);
    try {
      const data = await adminService.getSchoolReport(reportType, { term });
      setReportData(data);
    } catch (err) {
      console.error('Error generating report:', err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCsv = () => {
    if (!reportData) return;

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += `RuralEdu Headmaster Report: ${reportType}\n`;
    csvContent += `School: ${reportData.school.name}, UDISE: ${reportData.school.udiseCode}\n`;
    csvContent += `Generated At: ${reportData.generatedAt}\n\n`;

    if (reportType === 'school_summary' || reportType === 'attendance_report' || reportType === 'performance_report') {
      csvContent += 'Section,Class Teacher,Students,Attendance Rate (%),Avg Score (%)\n';
      reportData.classBreakdown.forEach((cls) => {
        csvContent += `${cls.displayName},"${cls.classTeacherName}",${cls.studentCount},${cls.attendanceRate},${cls.avgPerformance}\n`;
      });
    } else if (reportType === 'at_risk_report') {
      csvContent += 'Student Name,Class,Risk Tier,Weak Subject,Status,Assigned Faculty\n';
      reportData.atRiskRoster.forEach((r) => {
        csvContent += `"${r.studentName}",${r.className},${r.riskTier},"${r.weakSubject}","${r.status}","${r.assignedTeacher}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ruraledu_${reportType}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`CSV Export downloaded successfully for ${reportType}.`);
  };

  const REPORT_CARDS = [
    {
      id: 'school_summary',
      title: 'School Executive Summary',
      description: 'Consolidated overview of total enrollment, faculty strength, school-wide GPA, and risk count.',
      icon: Building2,
      badge: 'Comprehensive',
      color: 'blue',
    },
    {
      id: 'attendance_report',
      title: 'Attendance & Absenteeism Log',
      description: 'Daily roll-call rates, section comparisons, chronic absentee list, and monthly trends.',
      icon: CalendarCheck,
      badge: 'Daily & Monthly',
      color: 'yellow',
    },
    {
      id: 'performance_report',
      title: 'Academic Performance Appraisal',
      description: 'Subject proficiencies, pass percentages, quiz vs exam analytics, and grade distributions.',
      icon: TrendingUp,
      badge: 'Assessment Log',
      color: 'green',
    },
    {
      id: 'at_risk_report',
      title: 'At-Risk & Remedial Action Log',
      description: 'Early warning indicators, root causes, prescribed pedagogical interventions, and case notes.',
      icon: AlertTriangle,
      badge: 'Intervention Audit',
      color: 'coral',
    },
  ];

  return (
    <div className="page-wrapper" style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div 
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'var(--teal-primary)',
            color: '#fff',
            padding: '0.85rem 1.35rem',
            borderRadius: '14px',
            fontWeight: 700,
            fontSize: '0.88rem',
            zIndex: 999,
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <CheckCircle2 size={18} /> {toastMessage}
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              Official School Administrative Reports
            </h1>
            <span className="pill-badge pill-teal" style={{ fontSize: '0.75rem' }}>
              HM Certified
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '0.25rem' }}>
            Generate, customize, print, and export standardized administrative and academic appraisal documents.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button onClick={() => setShowPrintModal(true)} className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '0.5rem 1.1rem', gap: '0.4rem' }}>
            <Printer size={16} /> Print Official View
          </button>
          <button onClick={handleExportCsv} className="btn btn-teal" style={{ fontSize: '0.85rem', padding: '0.5rem 1.1rem', gap: '0.4rem' }}>
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Report Template Selector Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
        {REPORT_CARDS.map((card) => {
          const Icon = card.icon;
          const isSelected = reportType === card.id;

          return (
            <div
              key={card.id}
              onClick={() => setReportType(card.id)}
              className={`pastel-card ${isSelected ? `card-${card.color}` : ''}`}
              style={{
                cursor: 'pointer',
                padding: '1.25rem',
                border: isSelected ? '2px solid var(--teal-primary)' : '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div 
                  style={{ 
                    width: '38px', 
                    height: '38px', 
                    borderRadius: '10px', 
                    background: isSelected ? 'var(--teal-light)' : '#f1f5f9', 
                    color: isSelected ? 'var(--teal-primary)' : 'var(--text-main)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}
                >
                  <Icon size={20} />
                </div>
                <span className="pill-badge" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', background: '#fff' }}>
                  {card.badge}
                </span>
              </div>

              <div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: isSelected ? 'var(--teal-primary)' : 'var(--text-main)' }}>
                  {card.title}
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  {card.description}
                </p>
              </div>

              {isSelected && (
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--teal-primary)' }}>
                  <CheckCircle2 size={14} /> Active Report Selection
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Report Customization & Preview Panel */}
      <div className="pastel-card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Live Document Preview
            </h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Academic Year: <strong>2026-2027</strong> • Status: Generated & Certified
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button onClick={() => setShowPrintModal(true)} className="btn btn-outline" style={{ fontSize: '0.82rem', padding: '0.45rem 0.95rem', gap: '0.35rem' }}>
              <Eye size={14} /> Expand Print View
            </button>
            <button onClick={handleExportCsv} className="btn btn-teal" style={{ fontSize: '0.82rem', padding: '0.45rem 0.95rem', gap: '0.35rem' }}>
              <FileSpreadsheet size={14} /> Download CSV
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Generating live report preview...
          </div>
        ) : reportData ? (
          <div>
            {/* Quick Metrics in Preview */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Enrolled Students</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>{reportData.summaryMetrics.totalStudents}</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Average Attendance</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#059669' }}>{reportData.summaryMetrics.averageAttendance}%</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Average Score</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--teal-primary)' }}>{reportData.summaryMetrics.averagePerformance}%</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>At-Risk Cases</div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#dc2626' }}>{reportData.summaryMetrics.totalAtRisk}</div>
              </div>
            </div>

            {/* Preview Data Table */}
            {reportType === 'at_risk_report' ? (
              <div className="table-container" style={{ border: '1px solid #e2e8f0' }}>
                <table>
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Class</th>
                      <th>Risk Tier</th>
                      <th>Weak Subject</th>
                      <th>Remedial Status</th>
                      <th>Assigned Teacher</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.atRiskRoster.map((r) => (
                      <tr key={r.id}>
                        <td style={{ fontWeight: 700 }}>{r.studentName}</td>
                        <td>{r.className}</td>
                        <td style={{ fontWeight: 800, color: r.riskTier === 'HIGH' ? '#dc2626' : '#d97706' }}>{r.riskTier}</td>
                        <td>{r.weakSubject}</td>
                        <td>
                          <span className="pill-badge pill-teal" style={{ fontSize: '0.72rem', padding: '0.1rem 0.5rem' }}>
                            {r.status}
                          </span>
                        </td>
                        <td>{r.assignedTeacher}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="table-container" style={{ border: '1px solid #e2e8f0' }}>
                <table>
                  <thead>
                    <tr>
                      <th>Class & Section</th>
                      <th>Class Teacher</th>
                      <th>Enrolled Strength</th>
                      <th>Attendance Rate</th>
                      <th>Average Performance</th>
                      <th>At-Risk Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.classBreakdown.map((cls) => (
                      <tr key={cls.id}>
                        <td style={{ fontWeight: 800, color: 'var(--teal-primary)' }}>{cls.displayName}</td>
                        <td>{cls.classTeacherName}</td>
                        <td style={{ fontWeight: 600 }}>{cls.studentCount} Students</td>
                        <td style={{ fontWeight: 700, color: cls.attendanceRate < 85 ? '#dc2626' : '#059669' }}>{cls.attendanceRate}%</td>
                        <td style={{ fontWeight: 700 }}>{cls.avgPerformance}%</td>
                        <td style={{ fontWeight: 700, color: cls.atRiskCount > 0 ? '#dc2626' : 'var(--text-muted)' }}>{cls.atRiskCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* Official Print View Modal */}
      {showPrintModal && reportData && (
        <ReportPrintView
          reportData={reportData}
          onClose={() => setShowPrintModal(false)}
          onPrint={handlePrint}
          onExportCsv={handleExportCsv}
        />
      )}
    </div>
  );
}

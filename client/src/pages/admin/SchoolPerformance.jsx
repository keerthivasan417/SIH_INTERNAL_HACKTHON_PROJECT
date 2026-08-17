import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  FileCheck, 
  FileText,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import SubjectPerformanceBar from '../../components/admin/SubjectPerformanceBar';

export default function SchoolPerformance() {
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTerm, setSelectedTerm] = useState('Term 2');

  useEffect(() => {
    loadPerformance();
  }, [selectedTerm]);

  const loadPerformance = async () => {
    setLoading(true);
    try {
      const data = await adminService.getPerformanceAnalytics(selectedTerm);
      setPerformanceData(data);
    } catch (err) {
      console.error('Error fetching performance analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !performanceData) {
    return (
      <div className="page-wrapper" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        Loading performance analytics...
      </div>
    );
  }

  const { schoolAverageScore, passPercentage, topPerformingSubject, subjectRequiringSupport, subjectBreakdown, assessmentComparison } = performanceData;

  return (
    <div className="page-wrapper" style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              Academic Performance & Analytics
            </h1>
            <span className="pill-badge pill-green" style={{ fontSize: '0.75rem' }}>
              School GPA / Avg: {schoolAverageScore}%
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '0.25rem' }}>
            Subject proficiencies, assessment format comparisons, mastery distributions, and continuous improvement trends.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <select
            className="input-field"
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            style={{ fontWeight: 700, color: 'var(--teal-primary)' }}
          >
            <option value="Term 1">Term 1 (Jul - Oct)</option>
            <option value="Term 2">Term 2 (Nov - Feb) — Current</option>
            <option value="Term 3">Term 3 (Mar - Jun)</option>
          </select>

          <Link to="/admin/reports" className="btn btn-teal" style={{ fontSize: '0.85rem', padding: '0.5rem 1.1rem' }}>
            <FileText size={16} /> Performance Report
          </Link>
        </div>
      </div>

      {/* Top 4 Performance Summary Cards */}
      <div className="grid-cols-4" style={{ marginBottom: '1.5rem' }}>
        <div className="pastel-card card-green" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#065f46', fontWeight: 700 }}>School Average Score</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#065f46', marginTop: '0.2rem' }}>{schoolAverageScore}%</div>
          <span style={{ fontSize: '0.75rem', color: '#059669' }}>+2.4% vs Term 1</span>
        </div>

        <div className="pastel-card card-blue" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: 700 }}>Overall Pass Percentage</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e40af', marginTop: '0.2rem' }}>{passPercentage}%</div>
          <span style={{ fontSize: '0.75rem', color: '#3b82f6' }}>446 of 486 Passed</span>
        </div>

        <div className="pastel-card card-purple" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#5b21b6', fontWeight: 700 }}>Top Subject Mastery</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#5b21b6', marginTop: '0.4rem' }}>{topPerformingSubject}</div>
          <span style={{ fontSize: '0.75rem', color: '#7c3aed' }}>Highest Class Score</span>
        </div>

        <div className="pastel-card card-yellow" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: 700 }}>Subject Needing Support</div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#92400e', marginTop: '0.4rem' }}>{subjectRequiringSupport}</div>
          <span style={{ fontSize: '0.75rem', color: '#b45309' }}>Target Remedial Priority</span>
        </div>
      </div>

      {/* Assessment Format Comparison */}
      <div className="pastel-card" style={{ marginBottom: '1.75rem', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Assessment Modality Comparison
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Evaluation score benchmarks across chapter quizzes, summative exams, and lab assignments
            </span>
          </div>
          <span className="pill-badge pill-teal" style={{ fontSize: '0.75rem' }}>
            Continuous Evaluation
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {assessmentComparison.map((item, idx) => (
            <div 
              key={item.type} 
              style={{ 
                background: '#f8fafc', 
                border: '1px solid #e2e8f0', 
                padding: '1.15rem', 
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--teal-light)', color: 'var(--teal-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {idx === 0 ? <HelpCircle size={17} /> : idx === 1 ? <Award size={17} /> : <FileCheck size={17} />}
                </div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {item.type}
                </h4>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '0.3rem' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Average Score:</span>
                <strong style={{ fontSize: '1.25rem', color: 'var(--teal-primary)' }}>{item.average}%</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <span>Completion Rate:</span>
                <strong style={{ color: '#059669' }}>{item.completionRate}%</strong>
              </div>

              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', borderTop: '1px solid #e2e8f0', paddingTop: '0.4rem', marginTop: '0.2rem' }}>
                Total Evaluations Conducted: <strong>{item.totalConducted}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subject-Wise Mastery Breakdown */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Subject-Wise Academic Mastery
            </h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Detailed scoring metrics, pass rates, and teacher supervision
            </span>
          </div>
          <Link to="/admin/teachers" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--teal-primary)', textDecoration: 'none' }}>
            View Faculty Allocation →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {subjectBreakdown.map((sub) => (
            <SubjectPerformanceBar
              key={sub.code}
              subject={sub.subject}
              code={sub.code}
              avgScore={sub.avgScore}
              passRate={sub.passRate}
              highestScore={sub.highestScore}
              lowestScore={sub.lowestScore}
              teacherName={sub.teacherName}
              trend={sub.trend}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

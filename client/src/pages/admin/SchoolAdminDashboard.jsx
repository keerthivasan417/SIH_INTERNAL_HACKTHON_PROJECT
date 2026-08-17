import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  GraduationCap, 
  CalendarCheck, 
  AlertTriangle, 
  TrendingUp, 
  School, 
  ArrowRight, 
  CheckCircle2, 
  UserCheck, 
  UserX, 
  Clock, 
  FileText,
  Sparkles,
  Award
} from 'lucide-react';
import AdminStatCard from '../../components/admin/AdminStatCard';
import ClassPerformanceCard from '../../components/admin/ClassPerformanceCard';
import AtRiskStudentCard from '../../components/admin/AtRiskStudentCard';
import RecentActivity from '../../components/admin/RecentActivity';

// Local presentation dataset for School Admin Dashboard
const DASHBOARD_METRICS = {
  totalStudents: 486,
  totalTeachers: 18,
  todayAttendanceRate: 88.2,
  todayPresent: 429,
  todayAbsent: 57,
  atRiskCount: 24,
  highRiskCount: 6,
  academicAvg: 73.6,
};

const CLASS_PERFORMANCE_LIST = [
  { id: 'c6', classNameTitle: 'Class 6', studentsCount: 92, avgScore: 76, attendanceRate: 91, assignmentCompletion: 84, trend: '+3.2%' },
  { id: 'c7', classNameTitle: 'Class 7', studentsCount: 98, avgScore: 71, attendanceRate: 87, assignmentCompletion: 79, trend: '+1.8%' },
  { id: 'c8', classNameTitle: 'Class 8', studentsCount: 104, avgScore: 68, attendanceRate: 84, assignmentCompletion: 73, trend: '+2.5%' },
  { id: 'c9', classNameTitle: 'Class 9', studentsCount: 96, avgScore: 74, attendanceRate: 89, assignmentCompletion: 82, trend: '+4.1%' },
  { id: 'c10', classNameTitle: 'Class 10', studentsCount: 96, avgScore: 79, attendanceRate: 91, assignmentCompletion: 88, trend: '+5.0%' },
];

const SAMPLE_AT_RISK_STUDENTS = [
  {
    id: 's1',
    name: 'Priya Murmu',
    classNameText: 'Class 7-A (Roll: 14)',
    riskLevel: 'HIGH',
    weakSubject: 'Mathematics (Fractions)',
    recentScore: 44,
    attendance: 68,
    recommendedIntervention: 'Fractions visual remedial kit & bilingual peer practice.',
  },
  {
    id: 's2',
    name: 'Dibyaranjan Sahoo',
    classNameText: 'Class 8-B (Roll: 27)',
    riskLevel: 'HIGH',
    weakSubject: 'Science (Energy Laws)',
    recentScore: 48,
    attendance: 72,
    recommendedIntervention: 'Virtual lab simulations & weekly concept checkpoint.',
  },
  {
    id: 's3',
    name: 'Sneha Majhi',
    classNameText: 'Class 6-A (Roll: 09)',
    riskLevel: 'MEDIUM',
    weakSubject: 'English (Tenses & Vocabulary)',
    recentScore: 54,
    attendance: 79,
    recommendedIntervention: 'Daily audio comprehension exercises on tablet.',
  },
];

const RECENT_ACTIVITIES = [
  {
    id: 'act-1',
    type: 'assignment',
    title: 'Class 9 Science Assignment Submitted',
    time: '15m ago',
    description: '42 out of 48 students submitted "Work & Energy" lab worksheets.',
    badge: 'Class 9-A',
  },
  {
    id: 'act-2',
    type: 'quiz',
    title: 'Class 7 Math Chapter Quiz Completed',
    time: '45m ago',
    description: 'Average score: 78% (Highest: 96% by Sunil Naik).',
    badge: 'Class 7',
  },
  {
    id: 'act-3',
    type: 'attendance',
    title: 'Daily Attendance Upload Completed',
    time: '2h ago',
    description: 'All 10 sections marked attendance. 429 present, 57 absent.',
    badge: 'School-Wide',
  },
  {
    id: 'act-4',
    type: 'improvement',
    title: 'Academic Remedial Milestone',
    time: '4h ago',
    description: '5 students in Class 8 improved math quiz score above 60%.',
    badge: 'Remedial Batch',
  },
];

export default function SchoolAdminDashboard() {
  const [selectedTerm, setSelectedTerm] = useState('Term 2');

  return (
    <div className="page-wrapper" style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div style={{ marginBottom: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              Headmaster Executive Dashboard
            </h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '0.25rem' }}>
            Comprehensive school analytics, attendance tracking, and early intervention indicators for rural Odisha education.
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

          <Link to="/admin/reports" className="btn btn-teal" style={{ fontSize: '0.86rem', padding: '0.55rem 1.1rem' }}>
            <FileText size={16} /> Generate HM Report
          </Link>
        </div>
      </div>

      {/* 1. TOP KPI CARDS */}
      <div className="grid-cols-4" style={{ marginBottom: '1.75rem' }}>
        <AdminStatCard
          title="Total Students"
          value={DASHBOARD_METRICS.totalStudents}
          subtitle="Classes 6 to 10 • 10 Sections"
          icon={Users}
          variant="blue"
          trend="+12 students"
          trendPositive={true}
        />

        <AdminStatCard
          title="Teaching Staff"
          value={DASHBOARD_METRICS.totalTeachers}
          subtitle="100% Subject Mapping"
          icon={GraduationCap}
          variant="green"
          trend="Full Faculty"
          trendPositive={true}
        />

        <AdminStatCard
          title="Today's Attendance"
          value={`${DASHBOARD_METRICS.todayAttendanceRate}%`}
          subtitle="429 Present / 57 Absent"
          icon={CalendarCheck}
          variant="yellow"
          trend="+2.4% vs last week"
          trendPositive={true}
        />

        <AdminStatCard
          title="Students At-Risk"
          value={DASHBOARD_METRICS.atRiskCount}
          subtitle={`${DASHBOARD_METRICS.highRiskCount} High Priority Interventions`}
          icon={AlertTriangle}
          variant="coral"
          trend="Needs Attention"
          trendPositive={false}
        />
      </div>

      {/* 2. ATTENDANCE SNAPSHOT BANNER */}
      <div 
        className="pastel-card card-yellow" 
        style={{ 
          marginBottom: '1.75rem', 
          padding: '1.25rem 1.5rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '1.25rem' 
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#fde68a', color: '#92400e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CalendarCheck size={26} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#78350f' }}>
              Today's Attendance Summary
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#b45309', marginTop: '0.1rem' }}>
              Live morning roll-call across all classes. Daily target: ≥ 85%.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserCheck size={18} color="#059669" />
            <div>
              <span style={{ fontSize: '0.72rem', color: '#92400e', display: 'block' }}>Present</span>
              <strong style={{ fontSize: '1.05rem', color: '#065f46' }}>{DASHBOARD_METRICS.todayPresent}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserX size={18} color="#dc2626" />
            <div>
              <span style={{ fontSize: '0.72rem', color: '#92400e', display: 'block' }}>Absent</span>
              <strong style={{ fontSize: '1.05rem', color: '#991b1b' }}>{DASHBOARD_METRICS.todayAbsent}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={18} color="var(--teal-primary)" />
            <div>
              <span style={{ fontSize: '0.72rem', color: '#92400e', display: 'block' }}>Overall Rate</span>
              <strong style={{ fontSize: '1.05rem', color: 'var(--teal-primary)' }}>{DASHBOARD_METRICS.todayAttendanceRate}%</strong>
            </div>
          </div>

          <Link to="/admin/attendance" className="btn btn-outline" style={{ fontSize: '0.82rem', padding: '0.45rem 0.95rem' }}>
            Attendance Breakdown <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* 3. CLASS PERFORMANCE GRID */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Class Performance & Subject Progress
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Academic standing, average assessment grades, and assignment completion rates.
            </p>
          </div>
          <Link to="/admin/classes" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--teal-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            Manage All Classes <ArrowRight size={15} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {CLASS_PERFORMANCE_LIST.map((cls) => (
            <ClassPerformanceCard
              key={cls.id}
              classNameTitle={cls.classNameTitle}
              studentsCount={cls.studentsCount}
              avgScore={cls.avgScore}
              attendanceRate={cls.attendanceRate}
              assignmentCompletion={cls.assignmentCompletion}
              trend={cls.trend}
            />
          ))}
        </div>
      </div>

      {/* 4. TWO-COLUMN: AT-RISK STUDENTS & RECENT ACTIVITY */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem', marginBottom: '1.75rem' }}>
        {/* At-Risk Intervention Panel */}
        <div className="pastel-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Academic Risk Early Warnings
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Instructional support & remedial recommendations
                </span>
              </div>
            </div>

            <Link to="/admin/at-risk" className="pill-badge pill-coral" style={{ fontSize: '0.72rem', textDecoration: 'none' }}>
              View All ({DASHBOARD_METRICS.atRiskCount})
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
            {SAMPLE_AT_RISK_STUDENTS.map((st) => (
              <AtRiskStudentCard
                key={st.id}
                name={st.name}
                classNameText={st.classNameText}
                riskLevel={st.riskLevel}
                weakSubject={st.weakSubject}
                recentScore={st.recentScore}
                attendance={st.attendance}
                recommendedIntervention={st.recommendedIntervention}
              />
            ))}
          </div>

          <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
            <Link to="/admin/at-risk" className="btn btn-outline" style={{ width: '100%', fontSize: '0.85rem', padding: '0.55rem 1rem' }}>
              Open Early Intervention Hub <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Recent Activity Timeline Panel */}
        <div className="pastel-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--teal-light)', color: 'var(--teal-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Recent School Activities
                </h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Real-time events from student & teacher modules
                </span>
              </div>
            </div>
            <span className="pill-badge pill-teal" style={{ fontSize: '0.72rem' }}>Live Stream</span>
          </div>

          <div style={{ flex: 1 }}>
            <RecentActivity activities={RECENT_ACTIVITIES} />
          </div>

          <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Last synced 2 minutes ago</span>
            <Link to="/admin/performance" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--teal-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              View Analytics <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* 5. QUICK ACTIONS FOOTER */}
      <div className="pastel-card card-blue" style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#1e3a8a' }}>
            Administrative Quick Actions
          </h4>
          <p style={{ fontSize: '0.8rem', color: '#3b82f6', marginTop: '0.1rem' }}>
            Direct shortcuts to key school management functions.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <Link to="/admin/students" className="btn btn-outline" style={{ fontSize: '0.82rem', padding: '0.45rem 0.95rem' }}>
            <Users size={15} /> Student Directory
          </Link>
          <Link to="/admin/teachers" className="btn btn-outline" style={{ fontSize: '0.82rem', padding: '0.45rem 0.95rem' }}>
            <GraduationCap size={15} /> Faculty Allocation
          </Link>
          <Link to="/admin/performance" className="btn btn-teal" style={{ fontSize: '0.82rem', padding: '0.45rem 0.95rem' }}>
            <TrendingUp size={15} /> School Performance
          </Link>
        </div>
      </div>
    </div>
  );
}

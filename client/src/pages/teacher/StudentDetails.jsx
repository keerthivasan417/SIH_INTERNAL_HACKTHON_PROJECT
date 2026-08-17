import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getStudentDetails, createRevisionActivity } from '../../services/teacherApi'
import { 
  ArrowLeft, Calendar, BarChart3, Clock, AlertTriangle, 
  Award, Zap, CheckCircle2, ChevronRight, BookOpen, Flame
} from 'lucide-react'

export default function StudentDetails() {
  const { studentId } = useParams()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [assigning, setAssigning] = useState(false)
  const [assignSuccess, setAssignSuccess] = useState(false)

  useEffect(() => {
    getStudentDetails(studentId)
      .then(res => {
        setStudent(res.data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [studentId])

  const handleAssignIntervention = (topic) => {
    setAssigning(true)
    setAssignSuccess(false)
    createRevisionActivity({
      studentId: student.id,
      topic: topic,
      difficulty: 'Beginner',
      instructions: 'Please complete this custom intervention package to improve your score.'
    })
    .then(() => {
      setAssigning(false)
      setAssignSuccess(true)
    })
    .catch(() => {
      setAssigning(false)
    })
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}><h3>Loading Student Profile...</h3></div>
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '3rem' }}><h3>Error loading student profile: {error}</h3></div>
  if (!student) return <div style={{ textAlign: 'center', padding: '3rem' }}><h3>Student not found.</h3></div>

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/teacher/students" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'hsl(var(--muted-foreground))', textDecoration: 'none', marginBottom: '1rem', fontSize: '0.875rem' }}>
          <ArrowLeft size={16} />
          <span>Back to Students List</span>
        </Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2>{student.name}</h2>
            <p style={{ color: 'hsl(var(--muted-foreground))' }}>ID: {student.studentId} | Class {student.class}</p>
          </div>
          <span className={`badge ${
            student.riskLevel === 'HIGH' ? 'badge-high' : 
            student.riskLevel === 'MEDIUM' ? 'badge-medium' : 'badge-low'
          }`} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            Risk Status: {student.riskLevel}
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card kpi-pastel-2">
          <span className="card-title">Attendance Rate</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
            <span className="card-value">{student.attendanceRate}%</span>
            <Calendar size={20} style={{ color: '#10b981' }} />
          </div>
        </div>

        <div className="kpi-card kpi-pastel-0">
          <span className="card-title">Average Quiz Score</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
            <span className="card-value">{student.avgQuizScore}%</span>
            <BarChart3 size={20} style={{ color: '#6366f1' }} />
          </div>
        </div>

        <div className="kpi-card kpi-pastel-1">
          <span className="card-title">Learning Time</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
            <span className="card-value">{student.learningTimeHours} hrs</span>
            <Clock size={20} style={{ color: '#3b82f6' }} />
          </div>
        </div>

        <div className="kpi-card kpi-pastel-3">
          <span className="card-title">Improvement Rate</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
            <span className="card-value">+{student.improvementPercentage}%</span>
            <CheckCircle2 size={20} style={{ color: '#f59e0b' }} />
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Left Side: Topic Mastery and Performance Details */}
        <div>
          {/* Subject Mastery Performance */}
          <div className="card">
            <h3>Subject Performance</h3>
            <div className="simple-bar-chart">
              {Object.entries(student.subjectPerformance || {}).map(([subject, score]) => (
                <div key={subject} className="simple-bar-item">
                  <span className="bar-label">{subject}</span>
                  <div className="bar-container">
                    <div className="bar-fill" style={{ width: `${score}%` }}></div>
                  </div>
                  <span className="bar-value">{score}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Topic Mistake Warnings & Mastery */}
          <div className="card">
            <h3>Topic Mastery & Weakness Analysis</h3>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {student.topicMastery?.map((topic, idx) => (
                <div key={idx} style={{ padding: '1rem', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong>{topic.subject} - {topic.topicName}</strong>
                    <span className={`badge ${
                      topic.status === 'Weak' ? 'badge-high' : 
                      topic.status === 'Average' ? 'badge-medium' : 'badge-low'
                    }`}>{topic.status}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', color: 'hsl(var(--muted-foreground))' }}>
                    <span>Mastery Level: {topic.masteryScore}%</span>
                    <span>Repeated Mistakes: {topic.mistakeCount}</span>
                  </div>
                  {topic.status === 'Weak' && (
                    <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed hsl(var(--border))', paddingTop: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>Recommended: Fractions Beginner Revision</span>
                      <button 
                        className="btn btn-primary" 
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}
                        disabled={assigning}
                        onClick={() => handleAssignIntervention(topic.topicName)}
                      >
                        Assign Revision
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {assignSuccess && <div style={{ color: 'hsl(var(--success))', marginTop: '1rem', fontSize: '0.875rem', textAlign: 'center' }}>Revision activity assigned successfully!</div>}
          </div>
        </div>

        {/* Right Side: Gamification & AI intervention */}
        <div>
          {/* Gamification Progress */}
          <div className="card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} style={{ color: 'hsl(var(--primary))' }} />
              <span>Engagement / Gamification</span>
            </h3>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{student.gamification?.xp}</div>
                  <span style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>XP Points</span>
                </div>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Lv. {student.gamification?.level}</div>
                  <span style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>Level</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '1.25rem', fontWeight: 700, color: 'hsl(var(--warning))' }}>
                    <Flame size={16} fill="hsl(var(--warning))" />
                    <span>{student.gamification?.streak}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>Day Streak</span>
                </div>
              </div>

              <div>
                <strong style={{ fontSize: '0.875rem' }}>Badges Earned</strong>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  {student.gamification?.badges?.map((badge, idx) => (
                    <span key={idx} className="badge badge-low" style={{ display: 'inline-flex', gap: '0.25rem', alignItems: 'center' }}>
                      <Zap size={10} />
                      <span>{badge}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Academic Risk details */}
          {student.riskLevel !== 'LOW' && (
            <div className="card" style={{ borderLeft: '4px solid hsl(var(--destructive))', backgroundColor: 'hsl(var(--destructive) / 0.05)' }}>
              <h3 style={{ color: 'hsl(var(--destructive))', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={18} />
                <span>Academic Warning Indicators</span>
              </h3>
              <div style={{ marginTop: '0.75rem', fontSize: '0.875rem' }}>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {student.riskIndicators?.map((ind, idx) => (
                    <li key={idx} style={{ color: 'hsl(var(--foreground))' }}>{ind}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

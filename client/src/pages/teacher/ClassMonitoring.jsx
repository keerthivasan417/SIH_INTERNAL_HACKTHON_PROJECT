import React, { useEffect, useState } from 'react'
import { getTeacherClasses, getPerformance } from '../../services/teacherApi'
import { GraduationCap, Users, Calendar, Clock, BookOpen, AlertTriangle } from 'lucide-react'

export default function ClassMonitoring() {
  const [classes, setClasses] = useState([])
  const [selectedClassId, setSelectedClassId] = useState('')
  const [classDetails, setClassDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getTeacherClasses()
      .then(res => {
        setClasses(res.data || [])
        if (res.data && res.data.length > 0) {
          setSelectedClassId(res.data[0].id)
        } else {
          setLoading(false)
        }
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!selectedClassId) return
    setLoading(true)
    // Fetch details of selected class
    getPerformance(selectedClassId, 'All')
      .then(res => {
        setClassDetails(res.data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [selectedClassId])

  if (loading && classes.length === 0) return <div style={{ textAlign: 'center', padding: '3rem' }}><h3>Loading Classes...</h3></div>
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '3rem' }}><h3>Error: {error}</h3></div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2>Class Performance Monitoring</h2>
          <p style={{ color: 'hsl(var(--muted-foreground))' }}>Compare performance stats, attendance trends, and warning signals across classes.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Select Class:</span>
          <select 
            className="form-control" 
            style={{ width: '150px' }}
            value={selectedClassId}
            onChange={e => setSelectedClassId(e.target.value)}
          >
            {classes.map(c => <option key={c.id} value={c.id}>{c.className}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}><h3>Loading class analytics...</h3></div>
      ) : classDetails ? (
        <>
          {/* Metrics Grid */}
          <div className="kpi-grid">
            <div className="kpi-card kpi-pastel-0">
              <span className="card-title">Number of Students</span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                <span className="card-value">{classDetails.totalStudents}</span>
                <Users size={20} style={{ color: '#6366f1' }} />
              </div>
            </div>

            <div className="kpi-card kpi-pastel-2">
              <span className="card-title">Average Attendance</span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                <span className="card-value">{classDetails.avgAttendance}%</span>
                <Calendar size={20} style={{ color: '#10b981' }} />
              </div>
            </div>

            <div className="kpi-card kpi-pastel-1">
              <span className="card-title">Average Progress</span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                <span className="card-value">{classDetails.avgProgress}%</span>
                <BookOpen size={20} style={{ color: '#3b82f6' }} />
              </div>
            </div>

            <div className="kpi-card kpi-pastel-4">
              <span className="card-title">Students at Risk</span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                <span className="card-value">{classDetails.studentsAtRisk}</span>
                <AlertTriangle size={20} style={{ color: '#ef4444' }} />
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            <div>
              {/* Subject Breakdown Chart */}
              <div className="card">
                <h3>Subject Mastery breakdown</h3>
                <div className="simple-bar-chart">
                  {Object.entries(classDetails.subjectBreakdown || {}).map(([subject, score]) => (
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
            </div>

            <div>
              {/* Class Performance summary */}
              <div className="card">
                <h3>Class Insights</h3>
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'hsl(var(--muted-foreground))' }}>Quiz attempts:</span>
                    <strong>{classDetails.totalQuizAttempts}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'hsl(var(--muted-foreground))' }}>Average Learning Time:</span>
                    <strong>{classDetails.avgLearningTime} mins/day</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'hsl(var(--muted-foreground))' }}>Assignment Completion:</span>
                    <strong>{classDetails.assignmentCompletion}%</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'hsl(var(--muted-foreground))' }}>Improvement index:</span>
                    <strong style={{ color: 'hsl(var(--success))' }}>+{classDetails.improvementPercentage}%</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>No data available for this class.</div>
      )}
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { getTeacherDashboard } from '../../services/teacherApi'
import { 
  BarChart3, TrendingUp, Clock, CheckSquare, Users, 
  BookOpen, Award, ArrowUpRight
} from 'lucide-react'

export default function Reports() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getTeacherDashboard()
      .then(res => {
        setData(res.data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}><h3>Loading Reports & Analytics...</h3></div>
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '3rem' }}><h3>Error loading reports: {error}</h3></div>
  if (!data) return <div style={{ textAlign: 'center', padding: '3rem' }}><h3>No report data available.</h3></div>

  // Secondary metrics moved from the dashboard
  const metrics = [
    { label: 'Avg Progress', value: `${data.avgProgress}%`, icon: TrendingUp, desc: 'Average syllabus progress across classes' },
    { label: 'Assignment Completion', value: `${data.assignmentCompletion}%`, icon: CheckSquare, desc: 'Percentage of submitted and graded assignments' },
    { label: 'Avg Learning Time', value: `${data.avgLearningTime} hrs`, icon: Clock, desc: 'Average active student learning hours' },
    { label: 'Improvement Rate', value: `+${data.improvementRate || 7}%`, icon: Award, desc: 'Month-over-month performance growth' },
    { label: 'Active Learners', value: data.activeLearners, icon: Users, desc: 'Students with active streaks this week' },
  ]

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'hsl(var(--foreground))' }}>Reports & Analytics</h2>
        <p style={{ color: 'hsl(var(--muted-foreground))', marginTop: '0.25rem' }}>Deep-dive analysis of class achievements, learning time, and student engagement.</p>
      </div>

      {/* Analytics KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {metrics.map((metric, idx) => {
          const Icon = metric.icon
          return (
            <div key={idx} className={`kpi-card kpi-pastel-${idx % 5}`} style={{ padding: '1.25rem', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.85rem', color: '#4b5563', fontWeight: 600 }}>{metric.label}</span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>{metric.value}</span>
                <div style={{ padding: '0.5rem', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.3)' }}>
                  <Icon size={20} style={{ color: '#111827' }} />
                </div>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#4b5563', marginTop: '0.75rem', fontWeight: 500 }}>{metric.desc}</p>
            </div>
          )
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Subject performance analysis */}
        <div className="card" style={{ padding: '1.5rem', borderRadius: '12px', background: 'hsl(var(--card))' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>Subject Mastery Trends</h3>
          <div className="simple-bar-chart">
            {Object.entries(data.subjectPerformance || {}).map(([subject, score]) => (
              <div key={subject} className="simple-bar-item" style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '0.375rem' }}>
                  <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{subject}</span>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'hsl(var(--primary))' }}>{score}%</span>
                </div>
                <div className="bar-container" style={{ height: '8px', borderRadius: '4px', backgroundColor: 'hsl(var(--muted))' }}>
                  <div className="bar-fill" style={{ width: `${score}%`, height: '100%', borderRadius: '4px', backgroundColor: 'hsl(var(--primary))' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress & Class Insights */}
        <div className="card" style={{ padding: '1.5rem', borderRadius: '12px', background: 'hsl(var(--card))' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.25rem' }}>Class Insights</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', paddingBottom: '1rem', borderBottom: '1px solid hsl(var(--border))' }}>
              <div style={{ backgroundColor: 'hsl(var(--success) / 0.1)', color: 'hsl(var(--success))', padding: '0.5rem', borderRadius: '8px' }}>
                <ArrowUpRight size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Syllabus Coverage Lead</h4>
                <p style={{ fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.15rem' }}>Class 8-A Mathematics progress is 8% ahead of the regional schedule.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', paddingBottom: '1rem', borderBottom: '1px solid hsl(var(--border))' }}>
              <div style={{ backgroundColor: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))', padding: '0.5rem', borderRadius: '8px' }}>
                <Award size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Active Engagement</h4>
                <p style={{ fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.15rem' }}>Gamification streak parameters show 12% rise in weekend study hours.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))', padding: '0.5rem', borderRadius: '8px' }}>
                <BookOpen size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Audio Lessons Engagement</h4>
                <p style={{ fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.15rem' }}>Odia translation revisions generated the highest listen-through rates this week.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

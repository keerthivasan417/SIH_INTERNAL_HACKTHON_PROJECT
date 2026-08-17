import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTeacherDashboard } from '../../services/teacherApi'
import { 
  Users, GraduationCap, Calendar, Star, AlertTriangle, 
  Sparkles, BarChart2, BookOpen, Globe, FileText, HelpCircle, Zap, 
  Calculator, FlaskConical
} from 'lucide-react'

export default function Dashboard() {
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

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}><h3>Loading...</h3></div>
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}><h3>Error loading dashboard: {error}</h3></div>
  if (!data) return <div style={{ textAlign: 'center', padding: '2rem' }}><h3>No data available.</h3></div>

  const kpiCards = [
    {
      label: 'Total Students',
      value: data.totalStudents || 3,
      icon: Users,
      iconColor: '#6366f1',
      bgColor: '#e0e7ff',
      link: { text: 'View students →', to: '/teacher/students', color: '#6366f1' }
    },
    {
      label: 'Total Classes',
      value: data.totalClasses || 2,
      icon: GraduationCap,
      iconColor: '#3b82f6',
      bgColor: '#dbeafe',
      link: { text: 'View classes →', to: '/teacher/classes', color: '#3b82f6' }
    },
    {
      label: 'Avg Attendance',
      value: `${data.avgAttendance || 85}%`,
      icon: Calendar,
      iconColor: '#10b981',
      bgColor: '#d1fae5',
      subText: 'This month'
    },
    {
      label: 'Avg Quiz Score',
      value: `${data.avgQuizScore || 68}%`,
      icon: Star,
      iconColor: '#f59e0b',
      bgColor: '#fef3c7',
      subText: 'This month'
    },
    {
      label: 'Students At Risk',
      value: data.studentsAtRisk || 1,
      icon: AlertTriangle,
      iconColor: '#ef4444',
      bgColor: '#fee2e2',
      link: { text: 'View details →', to: '/teacher/risk-alerts', color: '#ef4444' }
    }
  ]

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', gap: '1.25rem', height: 'calc(100vh - 100px)', justifyContent: 'space-between' }}>
      
      {/* Banner / Header Title Area */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ textAlign: 'left' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', letterSpacing: '-0.025em', margin: 0 }}>
            Good morning, Renita! 👋
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: '0.1rem 0 0 0' }}>Here's an overview of your classes today.</p>
        </div>
        <Link to="/teacher/quizzes/create" className="btn btn-primary" style={{ 
          backgroundColor: '#4f46e5', 
          color: '#ffffff', 
          borderRadius: '8px', 
          padding: '0.5rem 1rem', 
          fontSize: '0.8rem', 
          fontWeight: 600,
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.375rem',
          border: 'none',
          boxShadow: '0 2px 8px rgba(79, 70, 229, 0.15)'
        }}>
          <Sparkles size={14} />
          <span>Generate AI Quiz</span>
        </Link>
      </div>

      {/* Overview & Cards Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', margin: 0, textAlign: 'left' }}>Overview</h3>
        
        {/* KPI Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.25rem' }}>
          {kpiCards.map((kpi, idx) => {
            const Icon = kpi.icon
            return (
              <div key={idx} className={`kpi-pastel-card kpi-pastel-${idx}`} style={{ 
                borderRadius: '16px', 
                padding: '1rem 1.15rem', 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '118px', 
                textAlign: 'left',
                cursor: 'pointer'
              }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ 
                    width: '30px', 
                    height: '30px', 
                    borderRadius: '50%', 
                    backgroundColor: kpi.bgColor, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={15} style={{ color: kpi.iconColor }} />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#4b5563', fontWeight: 600 }}>{kpi.label}</span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
                  <span style={{ fontSize: '1.625rem', fontWeight: 800, color: '#111827', lineHeight: '1' }}>{kpi.value}</span>
                  {kpi.link ? (
                    <Link to={kpi.link.to} style={{ fontSize: '0.7rem', color: kpi.link.color, fontWeight: 700, textDecoration: 'none', marginTop: '0.375rem', display: 'inline-block' }}>
                      {kpi.link.text}
                    </Link>
                  ) : (
                    <span style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '0.375rem', display: 'inline-block', fontWeight: 500 }}>
                      {kpi.subText}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Two Column Layout - Height scales naturally without extra blank space */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.1fr', gap: '1.25rem' }}>
        
        {/* Class Performance */}
        <div className="glass-panel" style={{ borderRadius: '16px', padding: '1.25rem', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: 'hsl(245 75% 60% / 0.1)', padding: '0.25rem', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BarChart2 size={16} style={{ color: 'hsl(245 75% 60%)' }} />
            </div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', margin: 0 }}>Class Performance</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { subject: 'Mathematics', score: 65, icon: Calculator, color: '#6366f1', bgColor: '#e0e7ff' },
              { subject: 'Science', score: 73, icon: FlaskConical, color: '#a855f7', bgColor: '#f3e8ff' },
              { subject: 'English', score: 68, icon: BookOpen, color: '#3b82f6', bgColor: '#dbeafe' },
              { subject: 'Social Science', score: 67, icon: Globe, color: '#ec4899', bgColor: '#fce7f3' }
            ].map((item) => {
              const SubIcon = item.icon
              return (
                <div key={item.subject} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ 
                    width: '26px', 
                    height: '26px', 
                    borderRadius: '6px', 
                    backgroundColor: item.bgColor, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <SubIcon size={14} style={{ color: item.color }} />
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', width: '100px', textAlign: 'left' }}>{item.subject}</span>
                  <div style={{ flex: 1, height: '6px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${item.score}%`, height: '100%', backgroundColor: 'hsl(245 75% 60%)', borderRadius: '3px' }}></div>
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#111827', width: '35px', textAlign: 'right' }}>{item.score}%</span>
                </div>
              )
            })}
          </div>
          <div style={{ textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '0.75rem', marginTop: '1.25rem' }}>
            <Link to="/teacher/reports" style={{ fontSize: '0.75rem', color: 'hsl(245 75% 60%)', fontWeight: 700, textDecoration: 'none' }}>
              View all performance →
            </Link>
          </div>
        </div>

        {/* Students At Risk */}
        <div className="glass-panel" style={{ borderRadius: '16px', padding: '1.25rem', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.375rem', marginBottom: '0.75rem' }}>
            <div style={{ backgroundColor: '#fee2e2', padding: '0.25rem', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
              <AlertTriangle size={16} style={{ color: '#ef4444' }} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', margin: 0, lineHeight: '1.2' }}>Students At Risk</h3>
              <p style={{ fontSize: '0.7rem', color: '#6b7280', margin: '0.1rem 0 0 0' }}>Students who may need your attention</p>
            </div>
          </div>
          
          <div style={{ overflowX: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <th style={{ padding: '0.375rem 0', fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 }}>Student</th>
                  <th style={{ padding: '0.375rem 0', fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 }}>Risk Level</th>
                  <th style={{ padding: '0.375rem 0', fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 }}>Quiz Avg</th>
                  <th style={{ padding: '0.375rem 0', fontSize: '0.7rem', color: '#6b7280', fontWeight: 600 }}>Attendance</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: 'none' }}>
                  <td style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.8rem', color: '#111827' }}>Rahul Senapati</div>
                      <div style={{ fontSize: '0.675rem', color: '#6b7280' }}>Class 8A</div>
                    </div>
                  </td>
                  <td style={{ padding: '0.5rem 0' }}>
                    <span style={{ 
                      backgroundColor: '#fee2e2', 
                      color: '#ef4444', 
                      fontSize: '0.65rem', 
                      fontWeight: 650, 
                      padding: '0.15rem 0.5rem', 
                      borderRadius: '10px' 
                    }}>High</span>
                  </td>
                  <td style={{ padding: '0.5rem 0', fontWeight: 600, color: '#ef4444', fontSize: '0.8rem' }}>50%</td>
                  <td style={{ padding: '0.5rem 0', fontWeight: 600, color: '#f59e0b', fontSize: '0.8rem' }}>70%</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div style={{ textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '0.75rem', marginTop: '1.25rem' }}>
            <Link to="/teacher/risk-alerts" style={{ fontSize: '0.75rem', color: 'hsl(245 75% 60%)', fontWeight: 700, textDecoration: 'none' }}>
              View all at-risk students →
            </Link>
          </div>
        </div>

      </div>

      {/* Quick Actions Panel */}
      <div className="glass-panel" style={{ borderRadius: '16px', padding: '1.25rem 1.5rem', textAlign: 'left' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.75rem' }}>
          <Zap size={15} style={{ color: 'hsl(245 75% 60%)' }} />
          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111827', margin: 0 }}>Quick Actions</h3>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
          
          <Link to="/teacher/attendance" className="glass-action-card" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            padding: '0.625rem 0.75rem', 
            borderRadius: '10px', 
            textDecoration: 'none',
            cursor: 'pointer'
          }}>
            <div style={{ backgroundColor: 'hsl(245 75% 60% / 0.08)', color: 'hsl(245 75% 60%)', padding: '0.375rem', borderRadius: '6px', display: 'flex' }}>
              <Calendar size={15} />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.8rem', color: '#111827' }}>Take Attendance</div>
              <div style={{ fontSize: '0.675rem', color: '#6b7280' }}>Mark today's attendance</div>
            </div>
          </Link>

          <Link to="/teacher/quizzes/create" className="glass-action-card" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            padding: '0.625rem 0.75rem', 
            borderRadius: '10px', 
            textDecoration: 'none',
            cursor: 'pointer'
          }}>
            <div style={{ backgroundColor: 'hsl(245 75% 60% / 0.08)', color: 'hsl(245 75% 60%)', padding: '0.375rem', borderRadius: '6px', display: 'flex' }}>
              <HelpCircle size={15} />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.8rem', color: '#111827' }}>Create Quiz</div>
              <div style={{ fontSize: '0.675rem', color: '#6b7280' }}>Create a new quiz</div>
            </div>
          </Link>

          <Link to="/teacher/assignments" className="glass-action-card" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            padding: '0.625rem 0.75rem', 
            borderRadius: '10px', 
            textDecoration: 'none',
            cursor: 'pointer'
          }}>
            <div style={{ backgroundColor: 'hsl(245 75% 60% / 0.08)', color: 'hsl(245 75% 60%)', padding: '0.375rem', borderRadius: '6px', display: 'flex' }}>
              <FileText size={15} />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.8rem', color: '#111827' }}>Add Assignment</div>
              <div style={{ fontSize: '0.675rem', color: '#6b7280' }}>Create a new assignment</div>
            </div>
          </Link>

          <Link to="/teacher/reports" className="glass-action-card" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            padding: '0.625rem 0.75rem', 
            borderRadius: '10px', 
            textDecoration: 'none',
            cursor: 'pointer'
          }}>
            <div style={{ backgroundColor: 'hsl(245 75% 60% / 0.08)', color: 'hsl(245 75% 60%)', padding: '0.375rem', borderRadius: '6px', display: 'flex' }}>
              <BarChart2 size={15} />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.8rem', color: '#111827' }}>View Reports</div>
              <div style={{ fontSize: '0.675rem', color: '#6b7280' }}>Check detailed reports</div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  )
}

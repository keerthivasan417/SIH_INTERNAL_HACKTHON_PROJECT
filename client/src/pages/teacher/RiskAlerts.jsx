import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRiskAlerts, createRevisionActivity } from '../../services/teacherApi'
import { AlertTriangle, User, RefreshCw, CheckSquare, Clock } from 'lucide-react'

export default function RiskAlerts() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [assigningId, setAssigningId] = useState(null)
  const [successId, setSuccessId] = useState(null)

  useEffect(() => {
    fetchAlerts()
  }, [])

  const fetchAlerts = () => {
    setLoading(true)
    getRiskAlerts()
      .then(res => {
        setAlerts(res.data || [])
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }

  const handleAssignIntervention = (studentId, topic, alertId) => {
    setAssigningId(alertId)
    setSuccessId(null)
    createRevisionActivity({
      studentId,
      topic,
      difficulty: 'Beginner',
      instructions: `Please review the ${topic} revision module to address recent difficulties.`
    })
    .then(() => {
      setAssigningId(null)
      setSuccessId(alertId)
    })
    .catch(() => {
      setAssigningId(null)
    })
  }

  if (loading && alerts.length === 0) return <div style={{ textAlign: 'center', padding: '3rem' }}><h3>Loading Risk Alert Module...</h3></div>
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '3rem' }}><h3>Error: {error}</h3></div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2>Early Risk Detection & Alerts</h2>
          <p style={{ color: 'hsl(var(--muted-foreground))' }}>Automated academic warning flags indicating declining scores, prolonged inactivity, or poor topic mastery.</p>
        </div>
        <button className="btn btn-secondary" onClick={fetchAlerts}>
          <RefreshCw size={16} />
          <span>Refresh Analysis</span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            className="card" 
            style={{ 
              borderLeft: `5px solid ${alert.riskLevel === 'HIGH' ? 'hsl(var(--destructive))' : 'hsl(var(--warning))'}`,
              marginBottom: 0
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <span className={`badge ${alert.riskLevel === 'HIGH' ? 'badge-high' : 'badge-medium'}`} style={{ marginBottom: '0.5rem' }}>
                  {alert.riskLevel} ACADEMIC RISK
                </span>
                <h3 style={{ fontSize: '1.25rem' }}>
                  Student: <Link to={`/teacher/students/${alert.studentId}`} style={{ color: 'hsl(var(--primary))', textDecoration: 'none' }}>{alert.studentName}</Link> (Class {alert.className})
                </h3>
              </div>
              <div style={{ fontSize: '0.825rem', color: 'hsl(var(--muted-foreground))', textAlign: 'right' }}>
                Flagged Date: {alert.flaggedDate}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', borderTop: '1px solid hsl(var(--border))', paddingTop: '1rem' }}>
              <div>
                <strong style={{ fontSize: '0.875rem' }}>Risk Indication Metrics:</strong>
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.875rem' }}>
                  {alert.reasons?.map((reason, rIdx) => (
                    <li key={rIdx}>{reason}</li>
                  ))}
                </ul>

                <div style={{ marginTop: '1rem' }}>
                  <span style={{ fontSize: '0.875rem' }}>Weak Topics:</span>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                    {alert.weakTopics?.map((t, tIdx) => (
                      <span key={tIdx} className="badge badge-high" style={{ fontSize: '0.75rem' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ borderLeft: '1px solid hsl(var(--border))', paddingLeft: '1.5rem' }}>
                <strong style={{ fontSize: '0.875rem' }}>Suggested Action:</strong>
                <p style={{ fontSize: '0.825rem', color: 'hsl(var(--muted-foreground))', margin: '0.5rem 0' }}>{alert.suggestedAction}</p>
                
                {alert.weakTopics?.length > 0 && (
                  <div style={{ marginTop: '1rem' }}>
                    <button 
                      className="btn btn-primary" 
                      style={{ width: '100%', fontSize: '0.825rem', padding: '0.5rem' }}
                      disabled={assigningId === alert.id}
                      onClick={() => handleAssignIntervention(alert.studentId, alert.weakTopics[0], alert.id)}
                    >
                      <span>{assigningId === alert.id ? 'Assigning...' : `Assign ${alert.weakTopics[0]} Revision`}</span>
                    </button>
                    {successId === alert.id && (
                      <div style={{ color: 'hsl(var(--success))', fontSize: '0.75rem', marginTop: '0.5rem', textAlign: 'center' }}>
                        Assigned successfully!
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {alerts.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <CheckSquare size={40} style={{ color: 'hsl(var(--success))', marginBottom: '1rem' }} />
            <h3>No academic risk alerts flagged</h3>
            <p style={{ color: 'hsl(var(--muted-foreground))' }}>All students are performing on track with stable scores and learning frequency.</p>
          </div>
        )}
      </div>
    </div>
  )
}

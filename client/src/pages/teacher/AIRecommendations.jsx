import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRecommendations, createRevisionActivity } from '../../services/teacherApi'
import { Sparkles, ArrowRight, Check, AlertCircle } from 'lucide-react'

export default function AIRecommendations() {
  const [recs, setRecs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [assigningId, setAssigningId] = useState(null)
  const [successId, setSuccessId] = useState(null)

  useEffect(() => {
    getRecommendations()
      .then(res => {
        setRecs(res.data || [])
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const handleAssignAction = (rec) => {
    setAssigningId(rec.id)
    setSuccessId(null)
    createRevisionActivity({
      studentId: rec.studentId,
      topic: rec.targetTopic,
      difficulty: rec.targetDifficulty || 'Beginner',
      instructions: `AI Assigned Intervention: Review target material for ${rec.targetTopic}.`
    })
    .then(() => {
      setAssigningId(null)
      setSuccessId(rec.id)
    })
    .catch(() => {
      setAssigningId(null)
    })
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}><h3>Loading AI Recommendations...</h3></div>
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '3rem' }}><h3>Error: {error}</h3></div>

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2>AI-Generated Recommendations & Interventions</h2>
        <p style={{ color: 'hsl(var(--muted-foreground))' }}>Automated, explainable learning path customizations derived from recent quiz metrics and weaknesses.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        {recs.map((rec) => (
          <div key={rec.id} className="card" style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '2rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Sparkles size={16} style={{ color: 'hsl(var(--primary))' }} />
                <strong>Intervention Plan: {rec.title}</strong>
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>
                Student: <Link to={`/teacher/students/${rec.studentId}`} style={{ color: 'hsl(var(--primary))', textDecoration: 'none' }}>{rec.studentName}</Link> (Class {rec.className})
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'hsl(var(--foreground))', marginBottom: '0.75rem' }}>
                <strong>Recommendation:</strong> {rec.desc}
              </p>
              <div style={{ padding: '0.75rem', backgroundColor: 'hsl(var(--muted))', borderRadius: '6px', fontSize: '0.825rem', borderLeft: '3px solid hsl(var(--primary))' }}>
                <strong>Rationale:</strong> {rec.reason}
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button 
                className="btn btn-primary"
                style={{ width: '100%' }}
                disabled={assigningId === rec.id}
                onClick={() => handleAssignAction(rec)}
              >
                <span>{assigningId === rec.id ? 'Assigning...' : 'Assign Revision'}</span>
                <ArrowRight size={14} />
              </button>
              {successId === rec.id && (
                <div style={{ color: 'hsl(var(--success))', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                  Assigned successfully!
                </div>
              )}
            </div>
          </div>
        ))}
        {recs.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <Sparkles size={40} style={{ color: 'hsl(var(--primary))', marginBottom: '1rem' }} />
            <h3>No recommendations generated yet</h3>
            <p style={{ color: 'hsl(var(--muted-foreground))' }}>System requires additional student activity logs before generating optimization interventions.</p>
          </div>
        )}
      </div>
    </div>
  )
}

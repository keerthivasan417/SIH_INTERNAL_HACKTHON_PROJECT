import React, { useEffect, useState } from 'react'
import { getStudents, createAssignment } from '../../services/teacherApi'
import { Calendar, CheckSquare, PlusCircle, User, Award, CheckCircle } from 'lucide-react'

export default function Assignments() {
  const [students, setStudents] = useState([])
  const [selectedClass, setSelectedClass] = useState('8')
  const [subject, setSubject] = useState('Mathematics')
  const [topic, setTopic] = useState('Fractions')
  const [instructions, setInstructions] = useState('')
  const [deadline, setDeadline] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    getStudents({ class: selectedClass })
      .then(res => {
        setStudents(res.data || [])
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [selectedClass])

  const handleCreateAssignment = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setSuccess(false)

    createAssignment({
      class: selectedClass,
      subject,
      topic,
      instructions,
      deadline
    })
    .then(() => {
      setSubmitting(false)
      setSuccess(true)
      setInstructions('')
      setDeadline('')
    })
    .catch(err => {
      setError(err.message)
      setSubmitting(false)
    })
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Learning Tasks & Assignments</h2>
        <p style={{ color: 'hsl(var(--muted-foreground))' }}>Create tasks, choose topics, specify deadline parameters, and track student completion.</p>
      </div>

      {success && (
        <div className="card" style={{ borderLeft: '4px solid hsl(var(--success))', color: 'hsl(var(--success))', padding: '1rem', marginBottom: '1.5rem' }}>
          Assignment successfully distributed to the class!
        </div>
      )}

      <div className="dashboard-grid">
        {/* Create Assignment Form */}
        <div className="card pastel-assignment-card">
          <h3>Distribute New Task</h3>
          <form onSubmit={handleCreateAssignment} style={{ marginTop: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Class</label>
                <select className="form-control" value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <select className="form-control" value={subject} onChange={e => setSubject(e.target.value)}>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                  <option value="Social Science">Social Science</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Target Topic / Lesson</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. Fraction Addition & Subtraction"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Deadline / Due Date</label>
              <input 
                type="date" 
                className="form-control" 
                value={deadline}
                onChange={e => setDeadline(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Instructions</label>
              <textarea 
                className="form-control" 
                rows="4" 
                placeholder="List reading chapters, revision audio to listen, and quiz targets..."
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
              <PlusCircle size={16} />
              <span>{submitting ? 'Distributing...' : 'Assign Task'}</span>
            </button>
          </form>
        </div>

        {/* Completion Tracker Preview */}
        <div className="card pastel-tracker-card">
          <h3>Task Completion Tracker</h3>
          <p style={{ fontSize: '0.825rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.25rem' }}>Track task status for students in Class {selectedClass}.</p>
          
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {students.map((student, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: 'hsl(var(--muted))', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{student.name}</div>
                  <span style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>ID: {student.studentId}</span>
                </div>
                <span className={`badge ${
                  idx % 3 === 0 ? 'badge-high' : 
                  idx % 3 === 1 ? 'badge-medium' : 'badge-low'
                }`}>
                  {idx % 3 === 0 ? 'Overdue' : idx % 3 === 1 ? 'Pending' : 'Completed'}
                </span>
              </div>
            ))}
            {students.length === 0 && (
              <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem' }}>No student details found for this class.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

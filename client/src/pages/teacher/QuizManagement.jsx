import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getResources } from '../../services/teacherApi'
import { Sparkles, HelpCircle, FileText, Calendar, Clock, BookOpen } from 'lucide-react'

export default function QuizManagement() {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Reuses the getResources API which returns resources list including quizzes, lessons, etc.
    getResources()
      .then(res => {
        // Filter type quiz
        const list = res.data?.filter(item => item.type === 'quiz' || item.type === 'Quiz') || []
        setQuizzes(list)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}><h3>Loading Quizzes...</h3></div>
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '3rem' }}><h3>Error: {error}</h3></div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2>Quiz Management</h2>
          <p style={{ color: 'hsl(var(--muted-foreground))' }}>Review active assignments, check completion stats, and generate fresh assessments.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/teacher/quizzes/create" className="btn btn-primary">
            <Sparkles size={16} />
            <span>Create Quiz with AI</span>
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {quizzes.map((quiz, idx) => (
          <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <span className="badge badge-low" style={{ textTransform: 'capitalize' }}>Class {quiz.class}</span>
              <span className={`badge ${
                quiz.difficulty === 'Hard' ? 'badge-high' : 
                quiz.difficulty === 'Medium' ? 'badge-medium' : 'badge-low'
              }`}>{quiz.difficulty}</span>
            </div>
            
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{quiz.title}</h3>
            <p style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', flex: 1, marginBottom: '1.25rem' }}>{quiz.description}</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.825rem', color: 'hsl(var(--muted-foreground))', borderTop: '1px solid hsl(var(--border))', paddingTop: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen size={14} />
                <span>Subject: {quiz.subject} - {quiz.topic}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={14} />
                <span>Time Limit: {quiz.timeLimit || 15} minutes</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={14} />
                <span>Language: {quiz.language || 'English'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-secondary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.825rem' }}>View Scores</button>
              <button className="btn btn-secondary" style={{ padding: '0.5rem', color: 'hsl(var(--destructive))' }}>Delete</button>
            </div>
          </div>
        ))}
        {quizzes.length === 0 && (
          <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
            <HelpCircle size={40} style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '1rem' }} />
            <h3>No quizzes published yet</h3>
            <p style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '1.5rem' }}>Click below to create your first assessment manually or using AI generation.</p>
            <Link to="/teacher/quizzes/create" className="btn btn-primary" style={{ display: 'inline-flex' }}>Create New Quiz</Link>
          </div>
        )}
      </div>
    </div>
  )
}

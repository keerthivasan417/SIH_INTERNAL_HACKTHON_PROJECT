import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { generateQuestions, createQuiz } from '../../services/teacherApi'
import { Sparkles, ArrowLeft, Plus, Trash, Check, AlertCircle } from 'lucide-react'

export default function CreateQuiz() {
  const navigate = useNavigate()
  
  // Basic Quiz Details
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [targetClass, setTargetClass] = useState('8')
  const [subject, setSubject] = useState('Mathematics')
  const [topic, setTopic] = useState('Fractions')
  const [difficulty, setDifficulty] = useState('Medium')
  const [timeLimit, setTimeLimit] = useState(15)
  const [language, setLanguage] = useState('English')

  // AI parameters
  const [numQuestions, setNumQuestions] = useState(5)
  const [generating, setGenerating] = useState(false)

  // Questions Array
  const [questions, setQuestions] = useState([])
  const [publishing, setPublishing] = useState(false)
  const [error, setError] = useState(null)

  const handleGenerateAI = () => {
    setGenerating(true)
    setError(null)
    generateQuestions({
      subject,
      class: targetClass,
      topic,
      difficulty,
      numQuestions,
      language
    })
    .then(res => {
      setQuestions(res.data || [])
      setGenerating(false)
    })
    .catch(err => {
      setError(err.message)
      setGenerating(false)
    })
  }

  const handleAddManual = () => {
    setQuestions(prev => [
      ...prev,
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        explanation: '',
        difficulty
      }
    ])
  }

  const handleQuestionChange = (index, field, value) => {
    setQuestions(prev => {
      const copy = [...prev]
      copy[index][field] = value
      return copy
    })
  }

  const handleOptionChange = (qIndex, optIndex, value) => {
    setQuestions(prev => {
      const copy = [...prev]
      copy[qIndex].options[optIndex] = value
      return copy
    })
  }

  const handleRemoveQuestion = (index) => {
    setQuestions(prev => prev.filter((_, i) => i !== index))
  }

  const handlePublish = (e) => {
    e.preventDefault()
    if (!title || !description) {
      setError('Please fill in Quiz Title and Description.')
      return
    }
    if (questions.length === 0) {
      setError('Please add at least one question before publishing.')
      return
    }

    setPublishing(true)
    setError(null)
    createQuiz({
      title,
      description,
      class: targetClass,
      subject,
      topic,
      difficulty,
      timeLimit: parseInt(timeLimit),
      language,
      questions
    })
    .then(() => {
      setPublishing(false)
      navigate('/teacher/quizzes')
    })
    .catch(err => {
      setError(err.message)
      setPublishing(false)
    })
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/teacher/quizzes" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'hsl(var(--muted-foreground))', textDecoration: 'none', marginBottom: '1rem', fontSize: '0.875rem' }}>
          <ArrowLeft size={16} />
          <span>Back to Quizzes</span>
        </Link>
        <h2>Create Assessment / Quiz</h2>
        <p style={{ color: 'hsl(var(--muted-foreground))' }}>Design assessments manually or leverage AI to generate contextual learning checkpoints.</p>
      </div>

      {error && (
        <div className="card" style={{ borderLeft: '4px solid hsl(var(--destructive))', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--destructive))', padding: '1rem', marginBottom: '1.5rem' }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handlePublish}>
        <div className="dashboard-grid">
          {/* Main Quiz Configuration */}
          <div className="card">
            <h3>Quiz Details</h3>
            <div style={{ marginTop: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">Quiz Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Fractions and Decimals Assessment"
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description / Instructions</label>
                <textarea 
                  className="form-control" 
                  rows="3" 
                  placeholder="Provide instructions for students..."
                  value={description} 
                  onChange={e => setDescription(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Target Class</label>
                  <select className="form-control" value={targetClass} onChange={e => setTargetClass(e.target.value)}>
                    <option value="6">Class 6</option>
                    <option value="7">Class 7</option>
                    <option value="8">Class 8</option>
                    <option value="9">Class 9</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Time Limit (Minutes)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={timeLimit} 
                    onChange={e => setTimeLimit(e.target.value)} 
                    min="5"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <select className="form-control" value={subject} onChange={e => setSubject(e.target.value)}>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                    <option value="Social Science">Social Science</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Topic</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Fractions, Electricity"
                    value={topic} 
                    onChange={e => setTopic(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI Generator Panel */}
          <div className="card" style={{ borderLeft: '4px solid hsl(var(--primary))' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} style={{ color: 'hsl(var(--primary))' }} />
              <span>AI Question Generator</span>
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.25rem' }}>Instantly craft multiple-choice questions suited for your syllabus.</p>
            
            <div style={{ marginTop: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">Difficulty Level</label>
                <select className="form-control" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Language</label>
                <select className="form-control" value={language} onChange={e => setLanguage(e.target.value)}>
                  <option value="English">English</option>
                  <option value="Odia">Odia (ଓଡ଼ିଆ)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Number of Questions</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={numQuestions} 
                  onChange={e => setNumQuestions(e.target.value)} 
                  min="1" 
                  max="15"
                />
              </div>

              <button 
                type="button" 
                className="btn btn-primary" 
                style={{ width: '100%' }}
                disabled={generating}
                onClick={handleGenerateAI}
              >
                <Sparkles size={16} />
                <span>{generating ? 'Generating questions...' : 'Generate with AI'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>Questions ({questions.length})</h3>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleAddManual}
            >
              <Plus size={16} />
              <span>Add Question Manually</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {questions.map((q, qIdx) => (
              <div key={qIdx} style={{ padding: '1.5rem', border: '1px solid hsl(var(--border))', borderRadius: '8px', position: 'relative' }}>
                <button 
                  type="button" 
                  style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'none', cursor: 'pointer', color: 'hsl(var(--destructive))' }}
                  onClick={() => handleRemoveQuestion(qIdx)}
                >
                  <Trash size={16} />
                </button>
                
                <h4 style={{ marginBottom: '1rem', color: 'hsl(var(--muted-foreground))' }}>Question {qIdx + 1}</h4>
                
                <div className="form-group">
                  <label className="form-label">Question Text</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={q.question} 
                    onChange={e => handleQuestionChange(qIdx, 'question', e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {q.options?.map((opt, optIdx) => (
                    <div key={optIdx} className="form-group">
                      <label className="form-label">Option {String.fromCharCode(65 + optIdx)}</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={opt} 
                        onChange={e => handleOptionChange(qIdx, optIdx, e.target.value)}
                        required
                      />
                    </div>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Correct Option</label>
                    <select 
                      className="form-control" 
                      value={q.correctAnswer} 
                      onChange={e => handleQuestionChange(qIdx, 'correctAnswer', e.target.value)}
                      required
                    >
                      <option value="">Select option...</option>
                      {q.options?.map((opt, optIdx) => (
                        <option key={optIdx} value={opt}>{String.fromCharCode(65 + optIdx)}: {opt}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Explanation</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Why is this answer correct?"
                      value={q.explanation} 
                      onChange={e => handleQuestionChange(qIdx, 'explanation', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}

            {questions.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'hsl(var(--muted-foreground))' }}>
                No questions added. Generate using the AI panel or add questions manually.
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={publishing}
            >
              <Check size={16} />
              <span>{publishing ? 'Publishing...' : 'Publish Quiz'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

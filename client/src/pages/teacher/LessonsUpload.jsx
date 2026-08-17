import React, { useState } from 'react'
import { uploadLesson, uploadAudio } from '../../services/teacherApi'
import { Upload, BookOpen, Volume2, CheckCircle, AlertCircle } from 'lucide-react'

export default function LessonsUpload() {
  // Lesson Meta
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [targetClass, setTargetClass] = useState('8')
  const [subject, setSubject] = useState('Mathematics')
  const [topic, setTopic] = useState('Fractions')
  const [language, setLanguage] = useState('English')
  const [learningObjectives, setLearningObjectives] = useState('')

  // Upload fields
  const [noteFile, setNoteFile] = useState(null)
  const [audioFile, setAudioFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleLessonUpload = (e) => {
    e.preventDefault()
    setUploading(true)
    setError(null)
    setSuccess(false)

    // Form data packaging to handle uploads
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('class', targetClass)
    formData.append('subject', subject)
    formData.append('topic', topic)
    formData.append('language', language)
    formData.append('learningObjectives', learningObjectives)
    if (noteFile) formData.append('noteFile', noteFile)
    if (audioFile) formData.append('audioFile', audioFile)

    uploadLesson(formData)
      .then(() => {
        setUploading(false)
        setSuccess(true)
        // Reset form
        setTitle('')
        setDescription('')
        setLearningObjectives('')
        setNoteFile(null)
        setAudioFile(null)
      })
      .catch(err => {
        setError(err.message)
        setUploading(false)
      })
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Upload Educational Material & Audio Lessons</h2>
        <p style={{ color: 'hsl(var(--muted-foreground))' }}>Share notes and low-bandwidth compressed audio recordings in regional languages (English/Odia) for rural schools.</p>
      </div>

      {success && (
        <div className="card" style={{ borderLeft: '4px solid hsl(var(--success))', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--success))', padding: '1rem', marginBottom: '1.5rem' }}>
          <CheckCircle size={18} />
          <span>Educational material uploaded successfully!</span>
        </div>
      )}

      {error && (
        <div className="card" style={{ borderLeft: '4px solid hsl(var(--destructive))', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--destructive))', padding: '1rem', marginBottom: '1.5rem' }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleLessonUpload} className="dashboard-grid">
        {/* Left Side: Lesson details */}
        <div className="card pastel-lesson-card-left">
          <h3>Lesson Metadata</h3>
          <div style={{ marginTop: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Material Title</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. Intro to Fractions Part 1"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea 
                className="form-control" 
                rows="3" 
                placeholder="Brief summary of the learning material..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
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
                <label className="form-label">Class</label>
                <select className="form-control" value={targetClass} onChange={e => setTargetClass(e.target.value)}>
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Topic</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Fractions"
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Language</label>
                <select className="form-control" value={language} onChange={e => setLanguage(e.target.value)}>
                  <option value="English">English</option>
                  <option value="Odia">Odia (ଓଡ଼ିଆ)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Learning Objectives (Syllabus Link)</label>
              <textarea 
                className="form-control" 
                rows="2" 
                placeholder="Identify key target concepts that students should learn..."
                value={learningObjectives}
                onChange={e => setLearningObjectives(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Right Side: File Uploads */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Notes document */}
          <div className="card pastel-lesson-card-right-1">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={18} style={{ color: 'hsl(var(--primary))' }} />
              <span>Notes / PDF Document</span>
            </h3>
            <div style={{ marginTop: '1rem' }}>
              <input 
                type="file" 
                className="form-control" 
                accept=".pdf,.doc,.docx,.txt"
                onChange={e => setNoteFile(e.target.files[0])}
              />
              <span style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', display: 'block', marginTop: '0.5rem' }}>
                Supported: PDF, DOCX, TXT. Max size: 5MB.
              </span>
            </div>
          </div>

          {/* Audio Lesson (Rural bandwidth optimization hint) */}
          <div className="card pastel-lesson-card-right-2">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Volume2 size={18} style={{ color: 'hsl(var(--success))' }} />
              <span>Audio Explanation (Odia/English)</span>
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.25rem' }}>
              Compressed, low-bitrate MP3 or AAC files optimized for rural network latency. Audio will not autoplay for students.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <input 
                type="file" 
                className="form-control" 
                accept="audio/*"
                onChange={e => setAudioFile(e.target.files[0])}
              />
              <span style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', display: 'block', marginTop: '0.5rem' }}>
                Supported: MP3, M4A, WAV. Max size: 8MB.
              </span>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ width: '100%', height: '50px', fontSize: '1rem' }}
            disabled={uploading}
          >
            <Upload size={18} />
            <span>{uploading ? 'Uploading Material...' : 'Publish Learning Material'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

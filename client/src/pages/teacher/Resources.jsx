import React, { useEffect, useState } from 'react'
import { getResources } from '../../services/teacherApi'
import { FileText, Music, Link as LinkIcon, Download, Search, BookOpen } from 'lucide-react'

export default function Resources() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')

  useEffect(() => {
    getResources()
      .then(res => {
        setResources(res.data || [])
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(search.toLowerCase()) || 
                          res.topic.toLowerCase().includes(search.toLowerCase())
    const matchesSubject = selectedSubject ? res.subject === selectedSubject : true
    return matchesSearch && matchesSubject
  })

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}><h3>Loading Resources Library...</h3></div>
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '3rem' }}><h3>Error: {error}</h3></div>

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Educational Resources & Material Sharing</h2>
        <p style={{ color: 'hsl(var(--muted-foreground))' }}>Centralized directory to store study notes, audio guides, links, and documents shared with students.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--muted-foreground))' }} />
          <input 
            type="text" 
            placeholder="Search by title, topic, or description..." 
            className="form-control" 
            style={{ paddingLeft: '2.25rem' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <select className="form-control" style={{ width: '160px' }} value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
          <option value="">All Subjects</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
          <option value="Social Science">Social Science</option>
        </select>
      </div>

      {/* Resources grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {filteredResources.map((res, idx) => {
          const isAudio = res.type?.toLowerCase().includes('audio')
          const isLink = res.type?.toLowerCase().includes('link')
          
          return (
            <div key={idx} className={`card pastel-resource-card-${idx % 4}`} style={{ display: 'flex', flexDirection: 'column', height: '100%', marginBottom: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span className="badge badge-low">Class {res.class}</span>
                <span className="badge badge-medium" style={{ textTransform: 'capitalize' }}>{res.type}</span>
              </div>
              
              <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {isAudio ? <Music size={18} style={{ color: 'hsl(var(--success))' }} /> : 
                 isLink ? <LinkIcon size={18} style={{ color: 'hsl(var(--primary))' }} /> : 
                 <FileText size={18} style={{ color: 'hsl(var(--primary))' }} />}
                <span>{res.title}</span>
              </h3>
              
              <p style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', flex: 1, marginBottom: '1rem' }}>{res.description}</p>
              
              {/* Optional audio player that does NOT autoplay */}
              {isAudio && (
                <div style={{ marginBottom: '1rem' }}>
                  <audio controls preload="none" style={{ width: '100%', height: '36px' }}>
                    <source src={`/api/teacher/resources/audio?topic=${encodeURIComponent(res.topic)}`} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', borderTop: '1px solid hsl(var(--border))', paddingTop: '0.75rem', marginBottom: '1rem' }}>
                <div>Subject: {res.subject} ({res.topic})</div>
                <div>Language: {res.language || 'English'}</div>
                <div>Author: {res.createdBy || 'Teacher'} | {res.createdDate}</div>
              </div>

              {!isLink ? (
                <a 
                  href={`/api/teacher/resources/download?title=${encodeURIComponent(res.title)}&subject=${encodeURIComponent(res.subject)}&topic=${encodeURIComponent(res.topic)}&language=${encodeURIComponent(res.language || 'English')}`} 
                  download 
                  className="btn btn-secondary" 
                  style={{ width: '100%', fontSize: '0.825rem' }}
                >
                  <Download size={14} />
                  <span>Download Resource</span>
                </a>
              ) : (
                <a href={res.fileUrl || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', fontSize: '0.825rem' }}>
                  <LinkIcon size={14} />
                  <span>Open Resource Link</span>
                </a>
              )}
            </div>
          )
        })}

        {filteredResources.length === 0 && (
          <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
            <BookOpen size={40} style={{ color: 'hsl(var(--muted-foreground))', marginBottom: '1rem' }} />
            <h3>No learning resources found</h3>
            <p style={{ color: 'hsl(var(--muted-foreground))' }}>Upload documents or audio guidelines in the Lessons Upload module to see them here.</p>
          </div>
        )}
      </div>
    </div>
  )
}

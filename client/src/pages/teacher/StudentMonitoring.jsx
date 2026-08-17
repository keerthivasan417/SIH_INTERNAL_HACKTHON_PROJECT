import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getStudents, getTeacherClasses } from '../../services/teacherApi'
import { Search, Filter, AlertCircle } from 'lucide-react'

export default function StudentMonitoring() {
  const [students, setStudents] = useState([])
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Filter states
  const [search, setSearch] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedRisk, setSelectedRisk] = useState('')
  const [selectedPerformance, setSelectedPerformance] = useState('')

  useEffect(() => {
    Promise.all([getStudents(), getTeacherClasses()])
      .then(([studentsRes, classesRes]) => {
        setStudents(studentsRes.data || [])
        setClasses(classesRes.data || [])
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase()) || 
                          student.studentId.toLowerCase().includes(search.toLowerCase())
    const matchesClass = selectedClass ? student.class === selectedClass : true
    const matchesRisk = selectedRisk ? student.riskLevel === selectedRisk : true
    
    let matchesPerf = true
    if (selectedPerformance) {
      if (selectedPerformance === 'high') matchesPerf = student.avgQuizScore >= 75
      else if (selectedPerformance === 'mid') matchesPerf = student.avgQuizScore >= 50 && student.avgQuizScore < 75
      else if (selectedPerformance === 'low') matchesPerf = student.avgQuizScore < 50
    }
    
    return matchesSearch && matchesClass && matchesRisk && matchesPerf
  })

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}><h3>Loading Student Directory...</h3></div>
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '3rem' }}><h3>Error loading students: {error}</h3></div>

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Student Learning Monitoring</h2>
        <p style={{ color: 'hsl(var(--muted-foreground))' }}>Track individual student learning logs, attendance, and performance metrics.</p>
      </div>

      {/* Filter Toolbar */}
      <div className="card" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--muted-foreground))' }} />
          <input 
            type="text" 
            placeholder="Search by student name or ID..." 
            className="form-control" 
            style={{ paddingLeft: '2.25rem' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <select className="form-control" style={{ width: '130px' }} value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
            <option value="">All Classes</option>
            {classes.map(c => <option key={c.id} value={c.className}>{c.className}</option>)}
          </select>

          <select className="form-control" style={{ width: '130px' }} value={selectedRisk} onChange={e => setSelectedRisk(e.target.value)}>
            <option value="">All Risk Levels</option>
            <option value="LOW">Low Risk</option>
            <option value="MEDIUM">Medium Risk</option>
            <option value="HIGH">High Risk</option>
          </select>

          <select className="form-control" style={{ width: '150px' }} value={selectedPerformance} onChange={e => setSelectedPerformance(e.target.value)}>
            <option value="">All Performances</option>
            <option value="high">High (&ge; 75%)</option>
            <option value="mid">Average (50% - 74%)</option>
            <option value="low">Critical (&lt; 50%)</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Class</th>
                <th>Attendance</th>
                <th>Quiz Score</th>
                <th>Learning Time</th>
                <th>Risk Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id}>
                  <td><code>{student.studentId}</code></td>
                  <td>
                    <Link to={`/teacher/students/${student.id}`} style={{ fontWeight: 600, color: 'hsl(var(--primary))', textDecoration: 'none' }}>
                      {student.name}
                    </Link>
                  </td>
                  <td>Class {student.class}</td>
                  <td>{student.attendanceRate}%</td>
                  <td>
                    <span style={{ fontWeight: 600 }}>{student.avgQuizScore}%</span>
                  </td>
                  <td>{student.learningTimeHours} hrs</td>
                  <td>
                    <span className={`badge ${
                      student.riskLevel === 'HIGH' ? 'badge-high' : 
                      student.riskLevel === 'MEDIUM' ? 'badge-medium' : 'badge-low'
                    }`}>
                      {student.riskLevel}
                    </span>
                  </td>
                  <td>
                    <Link to={`/teacher/students/${student.id}`} className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}>
                      Monitor Progress
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: 'hsl(var(--muted-foreground))' }}>
                    No students matched the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

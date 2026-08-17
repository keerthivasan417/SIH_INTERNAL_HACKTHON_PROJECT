import React, { useEffect, useState } from 'react'
import { getTeacherClasses, getStudents, recordAttendance } from '../../services/teacherApi'
import { Calendar, Save, CheckCircle, XCircle } from 'lucide-react'

export default function Attendance() {
  const [classes, setClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState('')
  const [students, setStudents] = useState([])
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [attendance, setAttendance] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    getTeacherClasses()
      .then(res => {
        setClasses(res.data || [])
        if (res.data && res.data.length > 0) {
          setSelectedClass(res.data[0].className)
        } else {
          setLoading(false)
        }
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!selectedClass) return
    setLoading(true)
    getStudents({ class: selectedClass })
      .then(res => {
        setStudents(res.data || [])
        // Initialize attendance map (default Present)
        const attendanceMap = {}
        res.data.forEach(student => {
          attendanceMap[student.id] = true // true = Present, false = Absent
        })
        setAttendance(attendanceMap)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [selectedClass])

  const handleStatusChange = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }))
  }

  const handleSave = () => {
    setSaving(true)
    setSaveSuccess(false)
    const records = Object.entries(attendance).map(([studentId, isPresent]) => ({
      studentId,
      status: isPresent ? 'Present' : 'Absent'
    }))
    
    recordAttendance({
      class: selectedClass,
      date,
      records
    })
    .then(() => {
      setSaving(false)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    })
    .catch(err => {
      setSaving(false)
      setError(err.message)
    })
  }

  if (loading && classes.length === 0) return <div style={{ textAlign: 'center', padding: '3rem' }}><h3>Loading Attendance Module...</h3></div>
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '3rem' }}><h3>Error: {error}</h3></div>

  const presentCount = Object.values(attendance).filter(val => val === true).length
  const absentCount = Object.values(attendance).filter(val => val === false).length
  const attendancePercentage = students.length > 0 ? Math.round((presentCount / students.length) * 100) : 0

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2>Record & View Attendance</h2>
          <p style={{ color: 'hsl(var(--muted-foreground))' }}>Record daily present/absent data and monitor aggregate attendance rate.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <input 
            type="date" 
            className="form-control" 
            style={{ width: '160px' }}
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <select 
            className="form-control" 
            style={{ width: '130px' }}
            value={selectedClass}
            onChange={e => setSelectedClass(e.target.value)}
          >
            {classes.map(c => <option key={c.id} value={c.className}>{c.className}</option>)}
          </select>
        </div>
      </div>

      {/* Stats Summary cards */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        <div className="kpi-card kpi-pastel-2">
          <span className="card-title">Present Students</span>
          <span className="card-value" style={{ color: '#10b981' }}>{presentCount}</span>
        </div>
        <div className="kpi-card kpi-pastel-4">
          <span className="card-title">Absent Students</span>
          <span className="card-value" style={{ color: '#ef4444' }}>{absentCount}</span>
        </div>
        <div className="kpi-card kpi-pastel-0">
          <span className="card-title">Attendance Rate</span>
          <span className="card-value">{attendancePercentage}%</span>
        </div>
      </div>

      {/* Main Table */}
      <div className="card">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Loading students list...</div>
        ) : (
          <>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Average Attendance</th>
                    <th style={{ textAlign: 'center' }}>Mark Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => {
                    const isPresent = attendance[student.id] ?? true
                    return (
                      <tr key={student.id}>
                        <td><code>{student.studentId}</code></td>
                        <td><strong>{student.name}</strong></td>
                        <td>{student.attendanceRate}%</td>
                        <td style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                          <button 
                            className="btn"
                            style={{ 
                              padding: '0.375rem 0.75rem', 
                              fontSize: '0.75rem',
                              backgroundColor: isPresent ? 'hsl(var(--success) / 0.15)' : 'hsl(var(--muted))',
                              color: isPresent ? 'hsl(var(--success))' : 'hsl(var(--muted-foreground))',
                              borderColor: isPresent ? 'hsl(var(--success))' : 'transparent',
                            }}
                            onClick={() => handleStatusChange(student.id, true)}
                          >
                            <CheckCircle size={14} />
                            <span>Present</span>
                          </button>
                          <button 
                            className="btn"
                            style={{ 
                              padding: '0.375rem 0.75rem', 
                              fontSize: '0.75rem',
                              backgroundColor: !isPresent ? 'hsl(var(--destructive) / 0.15)' : 'hsl(var(--muted))',
                              color: !isPresent ? 'hsl(var(--destructive))' : 'hsl(var(--muted-foreground))',
                              borderColor: !isPresent ? 'hsl(var(--destructive))' : 'transparent',
                            }}
                            onClick={() => handleStatusChange(student.id, false)}
                          >
                            <XCircle size={14} />
                            <span>Absent</span>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem', alignItems: 'center' }}>
              {saveSuccess && <span style={{ color: 'hsl(var(--success))', fontSize: '0.875rem' }}>Attendance saved successfully!</span>}
              <button 
                className="btn btn-primary"
                disabled={saving}
                onClick={handleSave}
              >
                <Save size={16} />
                <span>{saving ? 'Saving...' : 'Save Attendance'}</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Lightbulb, 
  BookOpen, 
  User, 
  Eye, 
  Edit3, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import InterventionPlanModal from '../../components/admin/InterventionPlanModal';
import StudentDetailModal from '../../components/admin/StudentDetailModal';

export default function AtRiskStudents() {
  const [riskList, setRiskList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTier, setSelectedTier] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIntervention, setSelectedIntervention] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    loadAtRisk();
  }, [selectedTier, selectedStatus, searchTerm]);

  const loadAtRisk = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAtRiskStudents({
        tier: selectedTier,
        status: selectedStatus,
        search: searchTerm,
      });
      setRiskList(data);
    } catch (err) {
      console.error('Error loading at-risk students:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveStatus = async (recordId, newStatus, newNotes) => {
    try {
      await adminService.updateInterventionStatus(recordId, newStatus, newNotes);
      await loadAtRisk();
    } catch (err) {
      console.error('Error updating intervention:', err);
    }
  };

  const totalCount = riskList.length;
  const highCount = riskList.filter((r) => r.riskTier === 'HIGH').length;
  const activeInterventions = riskList.filter((r) => r.status === 'Intervention Active').length;
  const resolvedCount = riskList.filter((r) => r.status === 'Resolved').length;

  return (
    <div className="page-wrapper" style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              Academic Risk & Early Intervention Hub
            </h1>
            <span className="pill-badge pill-coral" style={{ fontSize: '0.75rem' }}>
              Early Warning System Active
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '0.25rem' }}>
            Multi-factor risk diagnostic combining attendance dips, repeated quiz scores &lt; 50%, and homework completion.
          </p>
        </div>

        <div className="pill-badge pill-coral">
          <AlertTriangle size={15} /> <strong>{highCount}</strong> High Priority Interventions
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid-cols-4" style={{ marginBottom: '1.5rem' }}>
        <div className="pastel-card card-coral" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: 700 }}>High Risk Students</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#991b1b', marginTop: '0.2rem' }}>{highCount}</div>
          <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>Immediate Remedial Required</span>
        </div>

        <div className="pastel-card card-yellow" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: 700 }}>Active Interventions</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#92400e', marginTop: '0.2rem' }}>{activeInterventions}</div>
          <span style={{ fontSize: '0.75rem', color: '#b45309' }}>Remedial Modules Assigned</span>
        </div>

        <div className="pastel-card card-green" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#065f46', fontWeight: 700 }}>Resolved Milestones</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#065f46', marginTop: '0.2rem' }}>{resolvedCount}</div>
          <span style={{ fontSize: '0.75rem', color: '#059669' }}>Scored &ge; 60% in Re-tests</span>
        </div>

        <div className="pastel-card card-blue" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: 700 }}>Total Cases in Watchlist</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1e40af', marginTop: '0.2rem' }}>{totalCount}</div>
          <span style={{ fontSize: '0.75rem', color: '#3b82f6' }}>Govt. High School Baripada</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="pastel-card" style={{ marginBottom: '1.5rem', padding: '1.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1, minWidth: '240px' }}>
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            className="input-field"
            style={{ width: '100%' }}
            placeholder="Search at-risk students by name, subject, or class..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Risk Tier:</span>
            <select
              className="input-field"
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.8rem' }}
            >
              <option value="ALL">All Risk Tiers</option>
              <option value="HIGH">High Risk</option>
              <option value="MEDIUM">Medium Risk</option>
              <option value="LOW">Low Watchlist</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Status:</span>
            <select
              className="input-field"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.8rem' }}
            >
              <option value="ALL">All Statuses</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Intervention Active">Intervention Active</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          {(searchTerm || selectedTier !== 'ALL' || selectedStatus !== 'ALL') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedTier('ALL');
                setSelectedStatus('ALL');
              }}
              className="btn btn-outline"
              style={{ fontSize: '0.78rem', padding: '0.45rem 0.75rem' }}
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* At-Risk Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.25rem' }}>
        {loading ? (
          <div className="pastel-card" style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading diagnostic records...
          </div>
        ) : riskList.length === 0 ? (
          <div className="pastel-card" style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No students found matching the selected filter criteria.
          </div>
        ) : (
          riskList.map((item) => {
            const isHigh = item.riskTier === 'HIGH';
            const isMed = item.riskTier === 'MEDIUM';

            return (
              <div 
                key={item.id} 
                className="pastel-card"
                style={{ 
                  padding: '1.35rem', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '0.85rem',
                  borderLeft: isHigh ? '4px solid #ef4444' : isMed ? '4px solid #f59e0b' : '4px solid #10b981'
                }}
              >
                {/* Top header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {item.studentName}
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {item.className} (Roll #{item.rollNo})
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                    <span 
                      className={`pill-badge ${isHigh ? 'pill-coral' : isMed ? 'pill-yellow' : 'pill-green'}`}
                      style={{ fontSize: '0.68rem', padding: '0.15rem 0.55rem' }}
                    >
                      <AlertTriangle size={11} /> {item.riskTier} RISK
                    </span>
                    <span 
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        color: item.status === 'Resolved' ? '#059669' : item.status === 'Intervention Active' ? 'var(--teal-primary)' : '#d97706',
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* 3 Indicators Breakdown */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.45rem', background: '#f8fafc', padding: '0.65rem', borderRadius: '12px', textAlign: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Attendance</div>
                    <strong style={{ fontSize: '0.92rem', color: item.attendanceScore < 75 ? '#dc2626' : 'var(--text-main)' }}>
                      {item.attendanceScore}%
                    </strong>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Recent Score</div>
                    <strong style={{ fontSize: '0.92rem', color: item.academicScore < 50 ? '#dc2626' : 'var(--text-main)' }}>
                      {item.academicScore}%
                    </strong>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Engagement</div>
                    <strong style={{ fontSize: '0.92rem', color: 'var(--teal-primary)' }}>
                      {item.engagementScore}%
                    </strong>
                  </div>
                </div>

                {/* Primary Cause */}
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <strong style={{ color: 'var(--text-main)' }}>Diagnosis: </strong>
                  <span>{item.primaryCause}</span>
                </div>

                {/* Prescribed Remedy */}
                <div style={{ fontSize: '0.82rem', color: '#1e3a8a', background: '#eff6ff', padding: '0.6rem 0.75rem', borderRadius: '10px' }}>
                  <strong>Recommended Remedy: </strong>
                  <span>{item.recommendedIntervention}</span>
                </div>

                {/* Assigned Teacher & Date */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', paddingTop: '0.5rem', borderTop: '1px solid #f1f5f9' }}>
                  <span>Assigned: <strong>{item.assignedTeacher}</strong></span>
                  <span>Updated: {item.lastUpdated}</span>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
                  <button
                    onClick={() => setSelectedIntervention(item)}
                    className="btn btn-teal"
                    style={{ flex: 1, fontSize: '0.8rem', padding: '0.45rem 0.75rem', gap: '0.3rem' }}
                  >
                    <Edit3 size={13} /> Update Plan
                  </button>
                  <button
                    onClick={async () => {
                      const fullStudent = await adminService.getStudentById(item.studentId);
                      setSelectedStudent(fullStudent);
                    }}
                    className="btn btn-outline"
                    style={{ fontSize: '0.8rem', padding: '0.45rem 0.75rem', gap: '0.3rem' }}
                  >
                    <Eye size={13} /> Profile
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Intervention Plan Modal */}
      {selectedIntervention && (
        <InterventionPlanModal
          riskRecord={selectedIntervention}
          onClose={() => setSelectedIntervention(null)}
          onSaveStatus={handleSaveStatus}
        />
      )}

      {/* Student Profile Modal */}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}

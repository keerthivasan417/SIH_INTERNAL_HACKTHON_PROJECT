import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  User, 
  BookOpen, 
  Save,
  MessageSquare
} from 'lucide-react';

export default function InterventionPlanModal({
  riskRecord,
  onClose,
  onSaveStatus,
}) {
  if (!riskRecord) return null;

  const [status, setStatus] = useState(riskRecord.status || 'Pending Review');
  const [notes, setNotes] = useState(riskRecord.notes || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await onSaveStatus(riskRecord.id, status, notes);
    setIsSaving(false);
    onClose();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(3px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div 
        className="pastel-card"
        style={{
          width: '100%',
          maxWidth: '620px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '1.75rem',
          background: '#ffffff',
          position: 'relative',
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div 
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                background: riskRecord.riskTier === 'HIGH' ? '#fee2e2' : '#fef3c7',
                color: riskRecord.riskTier === 'HIGH' ? '#dc2626' : '#b45309',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AlertTriangle size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Intervention Plan: {riskRecord.studentName}
                </h3>
                <span 
                  className={`pill-badge ${riskRecord.riskTier === 'HIGH' ? 'pill-coral' : 'pill-yellow'}`}
                  style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}
                >
                  {riskRecord.riskTier} RISK
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                {riskRecord.className} (Roll #{riskRecord.rollNo}) • Assigned Faculty: <strong>{riskRecord.assignedTeacher}</strong>
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0.25rem' }}
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Diagnosis Overview Card */}
        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '14px', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
            <div style={{ background: '#fff', padding: '0.5rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Attendance</div>
              <strong style={{ color: riskRecord.attendanceScore < 75 ? '#dc2626' : 'var(--text-main)' }}>{riskRecord.attendanceScore}%</strong>
            </div>
            <div style={{ background: '#fff', padding: '0.5rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Academic Score</div>
              <strong style={{ color: riskRecord.academicScore < 50 ? '#dc2626' : 'var(--text-main)' }}>{riskRecord.academicScore}%</strong>
            </div>
            <div style={{ background: '#fff', padding: '0.5rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Engagement</div>
              <strong style={{ color: 'var(--teal-primary)' }}>{riskRecord.engagementScore}%</strong>
            </div>
          </div>

          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>Root Cause Analysis:</span>
            <p style={{ color: 'var(--text-main)', marginTop: '0.15rem' }}>{riskRecord.primaryCause}</p>
          </div>

          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', fontWeight: 700 }}>Prescribed Remedial Action:</span>
            <p style={{ color: 'var(--teal-primary)', fontWeight: 700, marginTop: '0.15rem' }}>{riskRecord.recommendedIntervention}</p>
          </div>
        </div>

        {/* Action Form */}
        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Remedial Workflow Status
            </label>
            <select
              className="input-field"
              style={{ width: '100%', fontWeight: 700 }}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending Review">Pending Review (Action Required)</option>
              <option value="Intervention Active">Intervention Active (In Progress)</option>
              <option value="Resolved">Resolved (Remedial Target Met)</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              HM & Faculty Case Notes
            </label>
            <textarea
              className="input-field"
              rows={3}
              style={{ width: '100%', resize: 'vertical' }}
              placeholder="Add observation, guardian meeting notes, or remedial milestone notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button 
              type="button" 
              onClick={onClose} 
              className="btn btn-outline" 
              style={{ fontSize: '0.88rem', padding: '0.5rem 1.1rem' }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSaving}
              className="btn btn-teal" 
              style={{ fontSize: '0.88rem', padding: '0.5rem 1.25rem' }}
            >
              <Save size={16} /> {isSaving ? 'Updating...' : 'Save Plan Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

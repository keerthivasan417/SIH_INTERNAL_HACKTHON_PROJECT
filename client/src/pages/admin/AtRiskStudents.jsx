import React, { useState } from 'react';
import { AlertTriangle, Filter, Search, Lightbulb } from 'lucide-react';

export default function AtRiskStudents() {
  const [filterRisk, setFilterRisk] = useState('ALL');

  return (
    <div className="page-wrapper" style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Academic Risk & Early Intervention</h1>
            <span className="pill-badge pill-coral" style={{ fontSize: '0.75rem' }}>Early Warning System</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '0.25rem' }}>
            Identifies students requiring instructional support based on quiz scores, attendance, and assignment completion. (Academic indicator only).
          </p>
        </div>
      </div>

      {/* Filter Row */}
      <div className="pastel-card" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button 
            className={`btn ${filterRisk === 'ALL' ? 'btn-teal' : 'btn-outline'}`}
            onClick={() => setFilterRisk('ALL')}
          >
            All Risk Levels (24)
          </button>
          <button 
            className={`btn ${filterRisk === 'HIGH' ? 'btn-teal' : 'btn-outline'}`}
            style={filterRisk === 'HIGH' ? { background: '#ef4444', borderColor: '#ef4444' } : {}}
            onClick={() => setFilterRisk('HIGH')}
          >
            High Risk (6)
          </button>
          <button 
            className={`btn ${filterRisk === 'MEDIUM' ? 'btn-teal' : 'btn-outline'}`}
            style={filterRisk === 'MEDIUM' ? { background: '#f59e0b', borderColor: '#f59e0b' } : {}}
            onClick={() => setFilterRisk('MEDIUM')}
          >
            Medium Risk (11)
          </button>
          <button 
            className={`btn ${filterRisk === 'LOW' ? 'btn-teal' : 'btn-outline'}`}
            style={filterRisk === 'LOW' ? { background: '#10b981', borderColor: '#10b981' } : {}}
            onClick={() => setFilterRisk('LOW')}
          >
            Low Risk / Watchlist (7)
          </button>
        </div>
      </div>

      <div className="pastel-card" style={{ padding: '3rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          At-Risk Intervention Interface Ready
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Student risk indicators, root causes (e.g. repeated low quiz scores, attendance drops), and recommended pedagogical interventions will be populated in subsequent phases.
        </p>
      </div>
    </div>
  );
}

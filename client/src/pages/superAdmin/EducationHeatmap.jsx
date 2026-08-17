import React, { useState } from 'react';
import { Map, Layers, CheckCircle2, AlertTriangle, Filter } from 'lucide-react';

export default function EducationHeatmap() {
  const [metric, setMetric] = useState('performance');

  return (
    <div className="page-wrapper" style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Odisha Education GIS Heatmap</h1>
            <span className="pill-badge pill-teal" style={{ fontSize: '0.75rem' }}>Statewide Visualization</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '0.25rem' }}>
            Visual geographical representation of performance, attendance, and academic risk across all 30 districts of Odisha.
          </p>
        </div>
      </div>

      {/* Heatmap Metric Selector */}
      <div className="pastel-card" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-muted)' }}>Heatmap Layer:</span>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button 
            className={`btn ${metric === 'performance' ? 'btn-teal' : 'btn-outline'}`}
            onClick={() => setMetric('performance')}
          >
            Academic Performance
          </button>
          <button 
            className={`btn ${metric === 'attendance' ? 'btn-teal' : 'btn-outline'}`}
            onClick={() => setMetric('attendance')}
          >
            Attendance Rates
          </button>
          <button 
            className={`btn ${metric === 'risk' ? 'btn-teal' : 'btn-outline'}`}
            onClick={() => setMetric('risk')}
          >
            At-Risk Cluster Density
          </button>
        </div>
      </div>

      <div className="pastel-card" style={{ padding: '3rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          GIS Heatmap Visualizer Ready
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Lightweight SVG / grid-based district heat visualization with high/low performing color scales will be populated in subsequent phases.
        </p>
      </div>
    </div>
  );
}

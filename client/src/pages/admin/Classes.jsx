import React from 'react';
import { School, Layers, CheckCircle2 } from 'lucide-react';

export default function Classes() {
  return (
    <div className="page-wrapper" style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Class & Section Management</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Class-wise student strength, average academic score, attendance rates, and assignment completion.
          </p>
        </div>
        <div className="pill-badge pill-teal">
          <School size={16} /> 10 Active Sections
        </div>
      </div>

      <div className="pastel-card" style={{ padding: '3rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Class Overview Interface Ready
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Section-wise performance comparisons, attendance metrics, and improvement trends will be populated in subsequent phases.
        </p>
      </div>
    </div>
  );
}

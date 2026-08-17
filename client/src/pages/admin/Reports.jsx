import React from 'react';
import { FileText, Download, Printer } from 'lucide-react';

export default function Reports() {
  return (
    <div className="page-wrapper" style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>School Administrative Reports</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Generate and export consolidated school performance summaries, attendance logs, and student appraisal reports.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-outline" style={{ gap: '0.4rem' }}>
            <Printer size={16} /> Print Report
          </button>
          <button className="btn btn-teal" style={{ gap: '0.4rem' }}>
            <Download size={16} /> Export CSV / PDF
          </button>
        </div>
      </div>

      <div className="pastel-card" style={{ padding: '3rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Reports Generator Interface Ready
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Standardized school reporting templates, export formats, and custom date range filters will be populated in subsequent phases.
        </p>
      </div>
    </div>
  );
}

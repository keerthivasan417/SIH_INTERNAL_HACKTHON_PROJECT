import React from 'react';
import { FileSpreadsheet, Download, Printer } from 'lucide-react';

export default function SuperAdminReports() {
  return (
    <div className="page-wrapper" style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>State Executive Reports & Policy Briefs</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Consolidated state-wide educational data exports for policy makers, SAMAGRA SHIKSHA, and district collectors.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-outline" style={{ gap: '0.4rem' }}>
            <Printer size={16} /> Print Brief
          </button>
          <button className="btn btn-teal" style={{ gap: '0.4rem' }}>
            <Download size={16} /> Export State Analytics (Excel / PDF)
          </button>
        </div>
      </div>

      <div className="pastel-card" style={{ padding: '3rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          State Reports Generator Ready
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          District-level roll-ups, scholarship readiness reports, and infrastructure health indices will be populated in subsequent phases.
        </p>
      </div>
    </div>
  );
}

import React from 'react';
import { GraduationCap, BookOpen, Clock } from 'lucide-react';

export default function Teachers() {
  return (
    <div className="page-wrapper" style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Teaching Faculty</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Faculty assignments, subject load distribution, and teaching engagement overview.
          </p>
        </div>
        <div className="pill-badge pill-green">
          <GraduationCap size={16} /> Total: 18 Teachers
        </div>
      </div>

      <div className="pastel-card" style={{ padding: '3rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Faculty Management Interface Ready
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Subject mapping, assigned classes, and teacher engagement summaries will be populated in subsequent phases.
        </p>
      </div>
    </div>
  );
}

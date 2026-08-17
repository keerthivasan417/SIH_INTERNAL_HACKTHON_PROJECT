import React from 'react';
import { TrendingUp, BookOpen, Award } from 'lucide-react';

export default function SchoolPerformance() {
  return (
    <div className="page-wrapper" style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Academic Performance & Analytics</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Subject proficiencies, examination trends, assignment outcomes, and learning progress across grades.
          </p>
        </div>
        <div className="pill-badge pill-green">
          <TrendingUp size={16} /> School GPA / Avg: 72.8%
        </div>
      </div>

      <div className="pastel-card" style={{ padding: '3rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Performance Analytics Interface Ready
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Subject-wise breakdowns (Math, Science, Odia, English, Social Studies) and assessment score distribution will be populated in subsequent phases.
        </p>
      </div>
    </div>
  );
}

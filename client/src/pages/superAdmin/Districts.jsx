import React, { useState } from 'react';
import { MapPin, Search, Filter } from 'lucide-react';

export default function Districts() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="page-wrapper" style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>District Governance & Performance</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            District-level aggregation across all 30 districts of Odisha (Mayurbhanj, Sundargarh, Koraput, Sambalpur, Ganjam, etc.).
          </p>
        </div>
        <div className="pill-badge pill-teal">
          <MapPin size={16} /> 30 Districts
        </div>
      </div>

      <div className="pastel-card" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Search size={18} color="var(--text-muted)" />
        <input
          type="text"
          className="input-field"
          style={{ width: '100%', maxWidth: '400px' }}
          placeholder="Search district name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="pastel-card" style={{ padding: '3rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          District Directory & Comparison Ready
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          District rankings, average scores, student counts, and block breakdowns will be populated in subsequent phases.
        </p>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { School, Search, Filter } from 'lucide-react';

export default function Schools() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="page-wrapper" style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>State School Directory</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Comprehensive directory of all 1,420 registered government and rural schools.
          </p>
        </div>
        <div className="pill-badge pill-teal">
          <School size={16} /> 1,420 Schools
        </div>
      </div>

      <div className="pastel-card" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Search size={18} color="var(--text-muted)" />
        <input
          type="text"
          className="input-field"
          style={{ width: '100%', maxWidth: '400px' }}
          placeholder="Search school by name, UDISE code, or district..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="pastel-card" style={{ padding: '3rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          School Directory Interface Ready
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          School lists, UDISE codes, HM contacts, student counts, and performance ratings will be populated in subsequent phases.
        </p>
      </div>
    </div>
  );
}

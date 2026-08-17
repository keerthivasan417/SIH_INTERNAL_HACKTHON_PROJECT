import React, { useState } from 'react';
import { Layers, Search, Filter } from 'lucide-react';

export default function Blocks() {
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');

  return (
    <div className="page-wrapper" style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Block Level Administration</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Cluster and block-level educational oversight, school density, and resource distribution.
          </p>
        </div>
        <div className="pill-badge pill-teal">
          <Layers size={16} /> 314 Educational Blocks
        </div>
      </div>

      <div className="pastel-card" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Filter size={18} color="var(--text-muted)" />
        <select 
          className="input-field"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          <option value="ALL">All Districts</option>
          <option value="Mayurbhanj">Mayurbhanj (26 Blocks)</option>
          <option value="Sundargarh">Sundargarh (17 Blocks)</option>
          <option value="Koraput">Koraput (14 Blocks)</option>
          <option value="Sambalpur">Sambalpur (9 Blocks)</option>
          <option value="Ganjam">Ganjam (22 Blocks)</option>
        </select>
      </div>

      <div className="pastel-card" style={{ padding: '3rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Block Analytics Interface Ready
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Block-wise school distributions, rural participation rates, and local interventions will be populated in subsequent phases.
        </p>
      </div>
    </div>
  );
}

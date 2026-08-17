import React, { useState } from 'react';
import { Users, Search, Filter } from 'lucide-react';

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');

  return (
    <div className="page-wrapper" style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Student Directory & Profiles</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            Comprehensive directory of enrolled students, academic tracking, and risk monitoring.
          </p>
        </div>
        <div className="pill-badge pill-teal">
          <Users size={16} /> Total: 486 Students
        </div>
      </div>

      {/* Filter Bar */}
      <div className="pastel-card" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '220px' }}>
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            className="input-field"
            style={{ width: '100%' }}
            placeholder="Search student name or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} color="var(--text-muted)" />
          <select 
            className="input-field"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="ALL">All Classes (6 to 10)</option>
            <option value="6">Class 6</option>
            <option value="7">Class 7</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
          </select>
        </div>
      </div>

      <div className="pastel-card" style={{ padding: '3rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Student Management Interface Ready
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Student list views, filter controls, and individual learning progress drawers will be populated in subsequent phases.
        </p>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Landmark, MapPin, Layers, School, Users, CalendarCheck, TrendingUp, AlertTriangle } from 'lucide-react';

export default function SuperAdminDashboard() {
  const [loading] = useState(false);

  return (
    <div className="page-wrapper" style={{ padding: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>State Education Command Center</h1>
              <span className="pill-badge pill-teal" style={{ fontSize: '0.75rem' }}>Odisha State</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
              Aggregated governance metrics across all 30 districts, 314 blocks, and rural schools.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <span className="pill-badge pill-teal">Odisha State: 30 Districts</span>
            <span className="pill-badge pill-yellow">Academic Year: 2026-27</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          Loading state governance data...
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Top Aggregated State KPI Cards */}
          <div className="grid-cols-4">
            <div className="pastel-card card-blue">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e40af' }}>TOTAL DISTRICTS</span>
                <MapPin size={20} color="#1e40af" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e3a8a' }}>30</div>
              <div style={{ fontSize: '0.78rem', color: '#3b82f6', marginTop: '0.25rem' }}>314 Educational Blocks</div>
            </div>

            <div className="pastel-card card-green">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#065f46' }}>RURAL SCHOOLS</span>
                <School size={20} color="#065f46" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#064e3b' }}>1,420</div>
              <div style={{ fontSize: '0.78rem', color: '#10b981', marginTop: '0.25rem' }}>Connected on Platform</div>
            </div>

            <div className="pastel-card card-yellow">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#92400e' }}>STATE ATTENDANCE</span>
                <CalendarCheck size={20} color="#92400e" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#78350f' }}>84.6%</div>
              <div style={{ fontSize: '0.78rem', color: '#d97706', marginTop: '0.25rem' }}>Active student participation</div>
            </div>

            <div className="pastel-card card-coral">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#991b1b' }}>HIGH-RISK CLUSTERS</span>
                <AlertTriangle size={20} color="#991b1b" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#7f1d1d' }}>18 Blocks</div>
              <div style={{ fontSize: '0.78rem', color: '#ef4444', marginTop: '0.25rem' }}>Targeted for resource allocation</div>
            </div>
          </div>

          <div className="pastel-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Super Admin Foundation Ready</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Phase 2 routing and layout initialization is complete. State-level comparative charts and district drill-downs will be populated in subsequent phases.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

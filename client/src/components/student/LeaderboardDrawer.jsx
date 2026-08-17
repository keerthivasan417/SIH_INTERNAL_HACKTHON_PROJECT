import React, { useState } from 'react';
import { X, Trophy } from 'lucide-react';
import Leaderboard from './Leaderboard';

export const LeaderboardDrawer = ({ isOpen, onClose, leaderboard = [], isOdia }) => {
  const [filter, setFilter] = useState('weekly');

  if (!isOpen) return null;

  return (
    <div className="rpg-drawer-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', zIndex: 9999, display: 'flex', justifyContent: 'flex-end' }}>
      <div className="rpg-drawer-content" onClick={(e) => e.stopPropagation()} style={{ width: '420px', maxWidth: '100vw', background: '#FFF', height: '100%', padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="drawer-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
          <div className="drawer-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Trophy size={22} color="#F59E0B" />
            <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#0F172A', margin: 0 }}>
              {isOdia ? 'ସ୍କୁଲ୍ ଲିଡରବୋର୍ଡ' : 'School Leaderboard'}
            </h2>
          </div>
          <button onClick={onClose} className="drawer-close-btn" style={{ background: '#F1F5F9', border: 'none', borderRadius: '10px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        <div className="drawer-body">
          <Leaderboard list={leaderboard} filter={filter} onFilterChange={setFilter} />
        </div>
      </div>
    </div>
  );
};

export default LeaderboardDrawer;

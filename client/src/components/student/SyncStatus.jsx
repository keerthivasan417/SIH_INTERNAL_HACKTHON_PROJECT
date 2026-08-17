import React, { useState, useEffect } from 'react';
import { useStudent } from '../../context/StudentContext';
import { RefreshCw, CheckCircle2 } from 'lucide-react';

export const SyncStatus = () => {
  const { isOnline, syncQueueCount } = useStudent();
  const [justSynced, setJustSynced] = useState(false);

  useEffect(() => {
    if (isOnline && syncQueueCount === 0) {
      setJustSynced(true);
      const timer = setTimeout(() => setJustSynced(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, syncQueueCount]);

  if (syncQueueCount > 0) {
    return (
      <div className="sync-status syncing" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '800', color: '#D97706', background: '#FEF3C7', padding: '4px 10px', borderRadius: '12px' }}>
        <RefreshCw size={14} className="spin-icon" />
        <span>Syncing... ({syncQueueCount} pending)</span>
      </div>
    );
  }

  return (
    <div className="sync-status synced" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '800', color: '#059669', background: '#ECFDF5', padding: '4px 10px', borderRadius: '12px' }}>
      <CheckCircle2 size={14} />
      <span>{justSynced ? 'Sync Complete ✓' : '🟢 Online — Synced'}</span>
    </div>
  );
};

export default SyncStatus;

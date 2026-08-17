import React from 'react';
import { useStudent } from '../../context/StudentContext';
import { Wifi, WifiOff } from 'lucide-react';

export const OfflineIndicator = () => {
  const { isOnline, t } = useStudent();

  return (
    <div className={`offline-badge ${isOnline ? 'online' : 'offline'}`}>
      <span className="indicator-dot"></span>
      {isOnline ? (
        <>
          <Wifi size={14} />
          <span>{t('online')}</span>
        </>
      ) : (
        <>
          <WifiOff size={14} />
          <span>{t('offline')}</span>
        </>
      )}
    </div>
  );
};

export default OfflineIndicator;

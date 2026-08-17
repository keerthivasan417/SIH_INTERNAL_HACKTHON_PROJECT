import React from 'react';
import { useStudent } from '../../context/StudentContext';
import LanguageSelector from './LanguageSelector';
import OfflineIndicator from './OfflineIndicator';
import SyncStatus from './SyncStatus';
import { Bell, Flame, Zap, Crown, Database } from 'lucide-react';

export const StudentHeader = () => {
  const { profile, lowDataMode, toggleLowDataMode, language, t } = useStudent();
  const isOdia = language === 'or';

  if (!profile) return null;

  return (
    <header className="student-app-header">
      <div className="header-left">
        <div className="avatar-frame-container">
          <img src={profile.avatar} alt={profile.name} className="student-header-avatar" />
          <span className="level-badge-mini">Lvl {profile.level}</span>
        </div>
        <div className="student-identity">
          <h2 className="student-name">{isOdia ? profile.nameOdia : profile.name}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span className="student-school-meta">{profile.school}</span>
            <span className="student-school-meta" style={{ fontSize: '11px', fontWeight: 'bold', color: '#4F46E5' }}>
              {isOdia ? `ଶ୍ରେଣୀ: ${profile.grade}` : `Class: ${profile.grade}`} • {profile.xp} XP
            </span>
          </div>
        </div>
      </div>

      <div className="header-right">
        {/* Network & Offline Status */}
        <OfflineIndicator />
        <SyncStatus />

        {/* Data Saver Mode Toggle */}
        <button
          onClick={toggleLowDataMode}
          className={`data-saver-btn ${lowDataMode ? 'active' : ''}`}
          title="Toggle Low Data Mode for low connectivity"
        >
          <Database size={15} />
          <span className="saver-text">{t('lowDataMode')}: {lowDataMode ? t('on') : t('off')}</span>
        </button>

        {/* Language Selector */}
        <LanguageSelector />
      </div>
    </header>
  );
};

export default StudentHeader;

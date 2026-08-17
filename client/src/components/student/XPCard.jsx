import React from 'react';
import { Zap } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const XPCard = ({ xp, xpToNextLevel }) => {
  const { t } = useStudent();
  const percentage = Math.min(100, Math.round((xp / (xpToNextLevel || 450)) * 100));

  return (
    <div className="gamification-card xp-card">
      <div className="card-header-row">
        <div className="card-icon-box xp-bg">
          <Zap size={22} className="xp-icon" />
        </div>
        <div className="card-info">
          <span className="card-label">{t('xp')}</span>
          <h3 className="card-value">{xp} XP</h3>
        </div>
      </div>
      <div className="progress-section">
        <div className="progress-bar-bg">
          <div className="progress-bar-fill xp-fill" style={{ width: `${percentage}%` }}></div>
        </div>
        <div className="progress-labels">
          <span>{percentage}%</span>
          <span>Target: {xpToNextLevel} XP</span>
        </div>
      </div>
    </div>
  );
};

export default XPCard;

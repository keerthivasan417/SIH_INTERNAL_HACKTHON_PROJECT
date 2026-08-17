import React from 'react';
import { Crown, Zap } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

const LEVEL_TITLES = {
  1: { en: 'Explorer', or: 'ଅନ୍ୱେଷକ' },
  2: { en: 'Learner', or: 'ଶିକ୍ଷାର୍ଥୀ' },
  3: { en: 'Thinker', or: 'ଚିନ୍ତକ' },
  4: { en: 'Problem Solver', or: 'ସମସ୍ୟା ସମାଧାନକାରୀ' },
  5: { en: 'Master', or: 'ମାଷ୍ଟର' }
};

export const LevelCard = ({ level = 1, xp = 0, xpToNextLevel = 100 }) => {
  const { t, language, profile } = useStudent();
  const isOdia = language === 'or';

  const currentLvl = profile?.level || level || 1;
  const currentXp = profile?.xp || xp || 0;
  const targetXp = profile?.xpToNextLevel || xpToNextLevel || (currentLvl * 150);

  const levelInfo = LEVEL_TITLES[currentLvl] || LEVEL_TITLES[5];
  const levelTitle = isOdia ? levelInfo.or : levelInfo.en;

  const progressPercent = Math.min(100, Math.round((currentXp / targetXp) * 100));

  return (
    <div className="gamification-card level-card" style={{ background: '#FFFFFF', borderRadius: '20px', padding: '18px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
      <div className="card-header-row" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div className="card-icon-box level-bg" style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <Crown size={24} className="level-icon" />
        </div>
        <div className="card-info" style={{ flex: 1 }}>
          <span className="card-label" style={{ fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>
            {t('level')} {currentLvl}
          </span>
          <h3 className="card-value" style={{ fontSize: '16px', fontWeight: '900', color: '#0F172A', margin: 0 }}>
            Level {currentLvl} — {levelTitle}
          </h3>
        </div>
        {profile?.coins !== undefined && (
          <span style={{ fontWeight: '800', color: '#B45309', background: '#FEF3C7', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            🪙 {profile.coins}
          </span>
        )}
      </div>

      {/* XP & PROGRESS BAR */}
      <div className="level-progress-section" style={{ marginTop: '10px' }}>
        <div className="progress-bar-bg" style={{ height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
          <div className="progress-bar-fill level-fill" style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)', transition: 'width 0.4s ease' }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', color: '#64748B', marginTop: '6px' }}>
          <span>Current: {currentXp} XP</span>
          <span>Target: {targetXp} XP</span>
        </div>
      </div>
    </div>
  );
};

export default LevelCard;

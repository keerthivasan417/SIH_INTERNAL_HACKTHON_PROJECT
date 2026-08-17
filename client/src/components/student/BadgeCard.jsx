import React from 'react';
import { Footprints, Trophy, Calculator, Flame, Award, Brain, Lock, Zap, Crown, CheckCircle2, Clock } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

const iconMap = {
  Footprints,
  Trophy,
  Calculator,
  Flame,
  Award,
  Brain,
  Zap,
  Crown
};

export const BadgeCard = ({ badge }) => {
  const { language } = useStudent();
  const IconComponent = iconMap[badge.icon] || Award;
  const isOdia = language === 'or';

  const isUnlocked = badge.status === 'unlocked' || badge.unlocked;
  const isInProgress = badge.status === 'in_progress' || (badge.progress > 0 && !isUnlocked);

  return (
    <div
      className={`badge-card ${isUnlocked ? 'unlocked' : (isInProgress ? 'in-progress' : 'locked')}`}
      style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '16px',
        border: isUnlocked ? '2px solid #10B981' : (isInProgress ? '2px solid #6366F1' : '1px solid #E2E8F0'),
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
        display: 'flex',
        gap: '14px',
        alignItems: 'center',
        opacity: isUnlocked ? 1 : (isInProgress ? 0.9 : 0.65)
      }}
    >
      <div
        className="badge-icon-wrapper"
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '14px',
          backgroundColor: isUnlocked ? `${badge.color || '#10B981'}20` : (isInProgress ? '#EEF2FF' : '#F1F5F9'),
          display: 'flex',
          alignItems: 'center',
          justify: 'center'
        }}
      >
        {isUnlocked ? (
          <IconComponent size={28} style={{ color: badge.color || '#10B981' }} />
        ) : isInProgress ? (
          <IconComponent size={26} style={{ color: '#6366F1' }} />
        ) : (
          <Lock size={22} style={{ color: '#94A3B8' }} />
        )}
      </div>

      <div className="badge-details" style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 className="badge-name" style={{ fontSize: '15px', fontWeight: '900', color: '#0F172A', margin: 0 }}>
            {isOdia ? badge.nameOdia : badge.name}
          </h4>
          <span
            style={{
              fontSize: '10px',
              fontWeight: '800',
              padding: '3px 8px',
              borderRadius: '8px',
              background: isUnlocked ? '#ECFDF5' : (isInProgress ? '#EEF2FF' : '#F1F5F9'),
              color: isUnlocked ? '#059669' : (isInProgress ? '#4F46E5' : '#64748B')
            }}
          >
            {isUnlocked ? 'Unlocked ✅' : (isInProgress ? 'In Progress ⏳' : 'Locked 🔒')}
          </span>
        </div>

        <p className="badge-desc" style={{ fontSize: '12px', color: '#64748B', margin: '4px 0 6px 0', lineHeight: '1.3' }}>
          {isOdia ? badge.descriptionOdia : badge.description}
        </p>
        
        {/* PROGRESS BAR FOR IN PROGRESS OR UNLOCKED */}
        {badge.target > 1 && (
          <div style={{ marginTop: '6px' }}>
            <div style={{ height: '5px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${Math.min(100, Math.round(((badge.progress || 0) / badge.target) * 100))}%`,
                  background: isUnlocked ? '#10B981' : '#6366F1'
                }}
              ></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: '700', color: '#94A3B8', marginTop: '2px' }}>
              <span>{badge.progress || 0} / {badge.target}</span>
              <span>{Math.min(100, Math.round(((badge.progress || 0) / badge.target) * 100))}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BadgeCard;

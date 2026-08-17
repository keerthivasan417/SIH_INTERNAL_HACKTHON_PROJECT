import React, { useEffect } from 'react';
import { useStudent } from '../../context/StudentContext';
import { Crown, Sparkles, X, Award, Trophy, Zap, Footprints, Flame, Calculator, Brain } from 'lucide-react';
import soundFX from '../../utils/audioFX';

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

export const AchievementPopup = () => {
  const { levelUpModal, setLevelUpModal, unlockedAchievement, setUnlockedAchievement, language, t } = useStudent();
  const isOdia = language === 'or';

  useEffect(() => {
    if (levelUpModal.open || unlockedAchievement) {
      soundFX.playStarChime();
    }
  }, [levelUpModal.open, unlockedAchievement]);

  if (!levelUpModal.open && !unlockedAchievement) return null;

  // 1. BADGE UNLOCK POPUP
  if (unlockedAchievement) {
    const IconComp = iconMap[unlockedAchievement.icon] || Award;
    return (
      <div className="modal-overlay" onClick={() => setUnlockedAchievement(null)} style={{ background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(6px)', position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div className="level-up-modal" onClick={(e) => e.stopPropagation()} style={{ background: '#FFFFFF', borderRadius: '24px', padding: '28px', maxWidth: '420px', width: '100%', textAlign: 'center', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', border: '2px solid #10B981' }}>
          <button className="close-modal-btn" onClick={() => setUnlockedAchievement(null)} style={{ position: 'absolute', top: '16px', right: '16px', background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} color="#64748B" />
          </button>

          <div className="modal-content text-center">
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)' }}>
              <IconComp size={40} color="white" />
            </div>

            <span style={{ fontSize: '11px', fontWeight: '900', color: '#10B981', background: '#ECFDF5', padding: '4px 12px', borderRadius: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              🎉 BADGE UNLOCKED!
            </span>

            <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#0F172A', margin: '10px 0 6px 0' }}>
              {isOdia ? unlockedAchievement.nameOdia : unlockedAchievement.name}
            </h2>
            
            <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.4', margin: '0 0 20px 0' }}>
              {isOdia ? unlockedAchievement.descriptionOdia : unlockedAchievement.description}
            </p>

            <button
              onClick={() => setUnlockedAchievement(null)}
              style={{ width: '100%', padding: '12px', borderRadius: '14px', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: 'white', border: 'none', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
            >
              Collect Badge Reward 🏆
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. LEVEL UP POPUP
  return (
    <div className="modal-overlay" onClick={() => setLevelUpModal({ open: false, level: 1 })} style={{ background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(6px)', position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="level-up-modal" onClick={(e) => e.stopPropagation()} style={{ background: '#FFFFFF', borderRadius: '24px', padding: '28px', maxWidth: '420px', width: '100%', textAlign: 'center', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', border: '2px solid #F59E0B' }}>
        <button className="close-modal-btn" onClick={() => setLevelUpModal({ open: false, level: 1 })} style={{ position: 'absolute', top: '16px', right: '16px', background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <X size={18} color="#64748B" />
        </button>

        <div className="modal-content text-center">
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)' }}>
            <Crown size={44} color="white" />
          </div>

          <span style={{ fontSize: '11px', fontWeight: '900', color: '#D97706', background: '#FEF3C7', padding: '4px 12px', borderRadius: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            👑 LEVEL UP!
          </span>

          <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#0F172A', margin: '10px 0 4px 0' }}>
            {t('levelUpTitle')}
          </h2>
          <p style={{ color: '#64748B', fontWeight: '700', fontSize: '14px', marginBottom: '14px' }}>
            {t('levelUpSub')} <strong>Level {levelUpModal.level}</strong>!
          </p>

          <p style={{ fontSize: '12px', color: '#64748B', lineHeight: '1.4', margin: '0 0 20px 0' }}>
            You've unlocked new badge frames and practice challenges in your student portal. Keep shining! 🌟
          </p>

          <button
            onClick={() => setLevelUpModal({ open: false, level: 1 })}
            style={{ width: '100%', padding: '12px', borderRadius: '14px', background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', color: 'white', border: 'none', fontWeight: '900', fontSize: '14px', cursor: 'pointer' }}
          >
            Keep Learning 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default AchievementPopup;

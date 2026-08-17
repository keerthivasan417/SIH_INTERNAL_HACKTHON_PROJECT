import React from 'react';
import { useStudent } from '../../context/StudentContext';
import BadgeCard from '../../components/student/BadgeCard';
import LevelCard from '../../components/student/LevelCard';
import StreakCard from '../../components/student/StreakCard';

export const Achievements = () => {
  const { t, badges, language } = useStudent();
  const isOdia = language === 'or';

  const unlockedCount = badges.filter(b => b.status === 'unlocked' || b.unlocked).length;

  return (
    <div className="achievements-page" style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto' }}>
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h1 className="page-title" style={{ fontSize: '24px', fontWeight: '900', color: '#0F172A' }}>
          🏆 {isOdia ? 'ବ୍ୟାଜ୍ ଏବଂ କୃତିତ୍ୱ' : 'BADGES & ACHIEVEMENTS'}
        </h1>
        <p className="page-sub" style={{ color: '#64748B', fontSize: '13px', fontWeight: '600', marginTop: '4px' }}>
          {isOdia
            ? 'ପାଠ, କ୍ୱିଜ୍ ଏବଂ ସ୍ଟ୍ରିକ୍ ସମ୍ପୂର୍ଣ୍ଣ କରି ସମସ୍ତ ୮ଟି ବିଶେଷ ବ୍ୟାଜ୍ ଅନଲକ୍ କରନ୍ତୁ!'
            : `Unlock badges as you complete lessons, quizzes, and maintain streaks! (${unlockedCount}/${badges.length} Unlocked)`}
        </p>
      </div>

      {/* TOP SUMMARY WIDGETS (Level & Streak) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <LevelCard />
        <StreakCard />
      </div>

      {/* BADGES GRID */}
      <div className="badges-grid-page" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {badges.map((badge) => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  );
};

export default Achievements;

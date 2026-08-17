import React from 'react';
import { Flame, Calendar, Trophy } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const StreakCard = ({ streak = 5, longestStreak = 12 }) => {
  const { t, profile } = useStudent();
  const currentStreak = profile?.streak || streak || 5;
  const maxStreak = profile?.longestStreak || longestStreak || 12;

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const activeDaysCount = Math.min(7, currentStreak);

  return (
    <div className="gamification-card streak-card" style={{ background: '#FFFFFF', borderRadius: '20px', padding: '18px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
      <div className="card-header-row" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
        <div className="card-icon-box streak-bg" style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <Flame size={24} className="streak-icon" />
        </div>
        <div className="card-info" style={{ flex: 1 }}>
          <span className="card-label" style={{ fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase' }}>
            {t('streak')}
          </span>
          <h3 className="card-value" style={{ fontSize: '16px', fontWeight: '900', color: '#0F172A', margin: 0 }}>
            {currentStreak} {t('days')} 🔥
          </h3>
        </div>
        <span style={{ fontSize: '12px', fontWeight: '800', color: '#EF4444', background: '#FEF2F2', padding: '4px 10px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Trophy size={13} /> Record: {maxStreak}d
        </span>
      </div>
      
      {/* WEEKLY ACTIVITY TRACKER CHIPS */}
      <div className="streak-calendar-row" style={{ display: 'flex', justifyContent: 'space-between', gap: '4px', margin: '10px 0 6px 0' }}>
        {days.map((day, idx) => {
          const isActive = idx < activeDaysCount;
          return (
            <div
              key={day}
              className={`streak-day-chip ${isActive ? 'active' : ''}`}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '6px 2px',
                borderRadius: '10px',
                background: isActive ? '#FEF2F2' : '#F8FAFC',
                border: isActive ? '1px solid #FCA5A5' : '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px'
              }}
            >
              <span className="day-name" style={{ fontSize: '10px', fontWeight: '800', color: isActive ? '#DC2626' : '#94A3B8' }}>{day}</span>
              <span className="day-flame" style={{ fontSize: '14px' }}>{isActive ? '🔥' : '⚪'}</span>
            </div>
          );
        })}
      </div>

      <div className="streak-footer" style={{ textAlign: 'center', fontSize: '11px', fontWeight: '700', color: '#64748B', marginTop: '6px' }}>
        <span>Weekly Active Status: {activeDaysCount}/7 Days Completed</span>
      </div>
    </div>
  );
};

export default StreakCard;

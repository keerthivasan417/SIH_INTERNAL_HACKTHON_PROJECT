import React from 'react';
import { useStudent } from '../../context/StudentContext';
import soundFX from '../../utils/audioFX';
import { Bell, Sparkles, Trophy, Calendar } from 'lucide-react';

export const NotificationsPage = () => {
  const { language } = useStudent();
  const isOdia = language === 'or';

  const list = [
    { id: 1, title: isOdia ? 'ଦୈନିକ କୁଇଜ୍ ପ୍ରସ୍ତୁତ!' : 'Daily Quest Available!', desc: 'Complete today math challenge for 50 bonus XP.', time: '2 hours ago', icon: '⭐' },
    { id: 2, title: isOdia ? 'ନୂତନ ମେଡାଲ୍ ଅନଲକ୍!' : 'New Badge Earned!', desc: 'You unlocked Science Master Level 2.', time: 'Yesterday', icon: '🏆' },
    { id: 3, title: isOdia ? 'ସାପ୍ତାହିକ ଲିଡରବୋର୍ଡ' : 'Weekly Leaderboard Updated', desc: 'You reached Top 5 in your district!', time: '2 days ago', icon: '🥇' }
  ];

  return (
    <div className="student-page-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div className="section-title-row" style={{ marginBottom: '24px' }}>
        <div>
          <h1 className="section-title-text" style={{ fontSize: '24px', fontWeight: '900', color: '#0F172A' }}>
            🔔 {isOdia ? 'ବିଜ୍ଞପ୍ତି' : 'NOTIFICATIONS & ALERTS'}
          </h1>
          <p style={{ color: '#64748B', fontSize: '13px', fontWeight: '600', marginTop: '4px' }}>
            {isOdia ? 'ଆପଣଙ୍କର ସଦ୍ୟତମ ଶିକ୍ଷଣ ଆଲର୍ଟ ଏବଂ ପୁରସ୍କାର ବିବରଣୀ' : 'Your latest learning activity reminders and achievement alerts'}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {list.map(item => (
          <div
            key={item.id}
            onClick={() => soundFX.playHover()}
            style={{
              background: '#FFFFFF',
              borderRadius: '18px',
              padding: '16px 20px',
              border: '2px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              cursor: 'pointer'
            }}
          >
            <span style={{ fontSize: '28px' }}>{item.icon}</span>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '15px', fontWeight: '900', color: '#0F172A', marginBottom: '2px' }}>{item.title}</h4>
              <p style={{ fontSize: '13px', color: '#64748B', fontWeight: '600' }}>{item.desc}</p>
            </div>
            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '700' }}>{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;

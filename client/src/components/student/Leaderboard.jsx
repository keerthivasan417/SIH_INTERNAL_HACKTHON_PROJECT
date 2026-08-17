import React, { useState } from 'react';
import { Trophy, TrendingUp, HeartHandshake, Flame, Sparkles } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const Leaderboard = ({ list = [], filter = 'weekly', onFilterChange }) => {
  const { profile, t, language } = useStudent();
  const isOdia = language === 'or';

  // Find logged-in user inside the list
  const currentUser = list.find(item => item.isCurrentUser) || {
    rank: 4,
    name: profile?.name ? `${profile.name} (You)` : 'Priya Dash (You)',
    xp: profile?.xp || 1140,
    level: profile?.level || 3,
    avatar: profile?.avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=150'
  };

  // Find user immediately ahead for gap calculation
  const nextUserAhead = list.find(item => item.rank === currentUser.rank - 1);
  const xpGap = nextUserAhead ? (nextUserAhead.xp - currentUser.xp) : 0;

  return (
    <div className="leaderboard-component" style={{ background: '#FFFFFF', borderRadius: '24px', padding: '20px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
      {/* MOTIVATIONAL BANNER FOR LOGGED-IN STUDENT */}
      <div
        className="encouraging-banner"
        style={{
          background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
          borderRadius: '16px',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
          border: '1px solid #C7D2FE'
        }}
      >
        <div style={{ background: '#6366F1', width: '36px', height: '36px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <Sparkles size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13px', fontWeight: '800', color: '#3730A3' }}>
            #{currentUser.rank} {currentUser.name} • {currentUser.xp} XP
          </div>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#4338CA', marginTop: '2px' }}>
            {xpGap > 0
              ? `🔥 ${xpGap} XP to reach #${currentUser.rank - 1}! Every step forward matters! 🚀`
              : '🌟 Outstanding work! You are leading the top learning chart! 🎉'}
          </div>
        </div>
      </div>

      {/* FILTER TABS (Weekly, Monthly, Subject, Class) */}
      {onFilterChange && (
        <div className="leaderboard-filter-tabs" style={{ display: 'flex', gap: '8px', marginBottom: '18px', overflowX: 'auto', paddingBottom: '4px' }}>
          {[
            { id: 'weekly', en: '📅 Weekly', or: '📅 ସାପ୍ତାହିକ' },
            { id: 'monthly', en: '🗓️ Monthly', or: '🗓️ ମାସିକ' },
            { id: 'subject', en: '📚 Subject', or: '📚 ବିଷୟଗତ' },
            { id: 'class', en: '🏫 Class 7', or: '🏫 ଶ୍ରେଣୀ ୭' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => onFilterChange(tab.id)}
              style={{
                padding: '8px 14px',
                borderRadius: '12px',
                border: 'none',
                background: filter === tab.id ? '#4F46E5' : '#F1F5F9',
                color: filter === tab.id ? '#FFFFFF' : '#64748B',
                fontWeight: '800',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              {isOdia ? tab.or : tab.en}
            </button>
          ))}
        </div>
      )}

      {/* LEADERBOARD LIST ROWS */}
      <div className="leaderboard-rows" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {list.map((item) => {
          const isMe = item.isCurrentUser;
          const rankEmoji = item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : item.rank === 3 ? '🥉' : `#${item.rank}`;

          return (
            <div
              key={item.rank + item.name}
              className={`leaderboard-row ${isMe ? 'current-user-row' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '16px',
                background: isMe ? '#FEF3C7' : '#F8FAFC',
                border: isMe ? '2px solid #F59E0B' : '1px solid #E2E8F0',
                transition: 'all 0.2s'
              }}
            >
              {/* Rank */}
              <div style={{ fontSize: '16px', fontWeight: '900', width: '32px', textAlign: 'center', color: '#475569' }}>
                {rankEmoji}
              </div>

              {/* Avatar */}
              <img
                src={item.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'}
                alt={item.name}
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: isMe ? '2px solid #D97706' : '1px solid #CBD5E1' }}
              />

              {/* Name & Details */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '900', color: isMe ? '#B45309' : '#0F172A' }}>
                  {item.name} {isMe ? '⭐' : ''}
                </div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748B' }}>
                  {item.school || 'GHS Koraput'} • Lvl {item.level}
                </div>
              </div>

              {/* XP Pill */}
              <div style={{ fontWeight: '900', fontSize: '13px', color: '#4F46E5', background: '#EEF2FF', padding: '6px 12px', borderRadius: '12px' }}>
                ⚡ {item.xp} XP
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;

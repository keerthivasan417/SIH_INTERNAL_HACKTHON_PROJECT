import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../../context/StudentContext';
import QuestCard from '../../components/student/QuestCard';
import ChallengeCard from '../../components/student/ChallengeCard';
import soundFX from '../../utils/audioFX';
import { Target, Swords, Star, Zap } from 'lucide-react';

export const DailyQuests = () => {
  const { language, t, quests, completeQuestAction, challenges, profile } = useStudent();
  const navigate = useNavigate();
  const isOdia = language === 'or';

  const [activeTab, setActiveTab] = useState('quests'); // 'quests' | 'challenges'

  // Quest stats
  const completedQuests = quests.filter(q => q.completed).length;
  const totalXpAvailable = quests.filter(q => !q.completed).reduce((sum, q) => sum + (q.xpReward || 0), 0);

  const handleComplete = async (questId) => {
    soundFX.playStarChime();
    await completeQuestAction(questId);
  };

  const handleChallengeAccept = (challengeId) => {
    soundFX.playWhoosh();
    navigate('/student/challenges');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
          🎯 {isOdia ? 'ଦୈନିକ ମିଶନ ଓ ପ୍ରତିଯୋଗିତା' : 'DAILY QUESTS & CHALLENGES'}
        </h1>
        <p style={{ color: '#64748B', fontSize: '13px', fontWeight: '600', marginTop: '6px' }}>
          {isOdia ? 'ମିଶନ ସଂପୂର୍ଣ କରନ୍ତୁ ଓ ବୋନସ XP ଅର୍ଜନ କରନ୍ତୁ!' : 'Complete daily missions and earn bonus XP rewards every day!'}
        </p>
      </div>

      {/* Stats strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)', borderRadius: '16px', padding: '16px', color: 'white', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: '900' }}>{completedQuests}/{quests.length}</div>
          <div style={{ fontSize: '12px', fontWeight: '700', opacity: 0.85 }}>{isOdia ? 'ମିଶନ ସଂପୂର୍ଣ' : 'Quests Done'}</div>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', borderRadius: '16px', padding: '16px', color: 'white', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: '900' }}>+{totalXpAvailable}</div>
          <div style={{ fontSize: '12px', fontWeight: '700', opacity: 0.85 }}>{isOdia ? 'XP ଉପଲବ୍ଧ' : 'XP Available'}</div>
        </div>
        <div style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', borderRadius: '16px', padding: '16px', color: 'white', textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: '900' }}>{profile?.streak || 5}🔥</div>
          <div style={{ fontSize: '12px', fontWeight: '700', opacity: 0.85 }}>{isOdia ? 'ଦିନ ସ୍ଟ୍ରିକ' : 'Day Streak'}</div>
        </div>
      </div>

      {/* Tab switcher */}
      <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '14px', padding: '4px', marginBottom: '20px', gap: '4px' }}>
        <button
          onClick={() => setActiveTab('quests')}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '800',
            fontSize: '13px',
            background: activeTab === 'quests' ? '#FFFFFF' : 'transparent',
            color: activeTab === 'quests' ? '#4F46E5' : '#64748B',
            boxShadow: activeTab === 'quests' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <Target size={16} /> {isOdia ? 'ଦୈନିକ ମିଶନ' : 'Daily Quests'}
        </button>
        <button
          onClick={() => setActiveTab('challenges')}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '800',
            fontSize: '13px',
            background: activeTab === 'challenges' ? '#FFFFFF' : 'transparent',
            color: activeTab === 'challenges' ? '#4F46E5' : '#64748B',
            boxShadow: activeTab === 'challenges' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <Swords size={16} /> {isOdia ? 'ପ୍ରତିଯୋଗିତା' : 'Challenges'}
        </button>
      </div>

      {/* Quest Cards — use existing QuestCard component */}
      {activeTab === 'quests' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {quests.map(quest => (
            <QuestCard key={quest.id} quest={quest} onComplete={handleComplete} />
          ))}
          {quests.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎉</div>
              <p style={{ fontWeight: '700' }}>{isOdia ? 'ସমস୍ତ ମିଶନ ସଂପୂର୍ଣ!' : 'All quests completed! Come back tomorrow!'}</p>
            </div>
          )}
        </div>
      )}

      {/* Challenge Cards — use existing ChallengeCard component */}
      {activeTab === 'challenges' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {challenges.map(ch => (
            <ChallengeCard key={ch.id} challenge={ch} onAccept={handleChallengeAccept} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyQuests;

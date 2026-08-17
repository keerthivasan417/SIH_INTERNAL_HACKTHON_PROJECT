import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../../context/StudentContext';
import { studentApi, MOCK_LESSONS } from '../../services/studentApi';
import soundFX from '../../utils/audioFX';

// ── Existing Components (reused — NOT duplicated) ──────────────────
import FloatingMovableOrbs from '../../components/student/FloatingMovableOrbs';
import QuestModal from '../../components/student/QuestModal';
import DailyQuestsDrawer from '../../components/student/DailyQuestsDrawer';
import LeaderboardDrawer from '../../components/student/LeaderboardDrawer';
import XPCard from '../../components/student/XPCard';
import LevelCard from '../../components/student/LevelCard';
import StreakCard from '../../components/student/StreakCard';
import LearningCard from '../../components/student/LearningCard';
import QuestCard from '../../components/student/QuestCard';
import ChallengeCard from '../../components/student/ChallengeCard';
import WeakTopicCard from '../../components/student/WeakTopicCard';
import RecommendationCard from '../../components/student/RecommendationCard';
import SubjectCard from '../../components/student/SubjectCard';
import ProgressChart from '../../components/student/ProgressChart';
import BadgeCard from '../../components/student/BadgeCard';

import { Play } from 'lucide-react';

export const StudentDashboard = () => {
  const {
    profile,
    language,
    changeLanguage,
    t,
    awardXP,
    quests,
    completeQuestAction,
    badges,
    subjects,
    challenges,
    leaderboardData,
    completedLessons,
    completeChallengeAction,
  } = useStudent();

  const navigate = useNavigate();
  const isOdia = language === 'or';

  // Local UI state only
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [isQuestsOpen, setIsQuestsOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  if (!profile) return null;

  // Derive data from unified context
  const currentLesson = MOCK_LESSONS.find(l => !completedLessons.includes(l.id)) || MOCK_LESSONS[0];
  const mathSubject = subjects.find(s => s.id === 'math') || subjects[0];
  const allWeakTopics = subjects.flatMap(s => s.weakTopics || []).slice(0, 4);
  const xpPercent = Math.min(100, Math.round((profile.xp / (profile.xpToNextLevel || 450)) * 100));

  // Recommendation built from real subject data
  const recommendation = mathSubject ? {
    title: `Revise: ${mathSubject.recommendedTopic}`,
    titleOdia: `ପୁନରୀକ୍ଷଣ: ${mathSubject.recommendedTopicOdia}`,
    reason: 'Your accuracy on Fractions dropped below 70%. A quick 5-min revision will help!',
    reasonOdia: 'ଭଗ୍ନାଂଶରେ ଆପଣଙ୍କ ସଠିକ୍‌ ହାର ୭୦% ତଳକୁ ଗଲା। ୫ ମିନିଟ୍ ପୁନରୀକ୍ଷଣ ସାହାଯ୍ୟ କରିବ!',
    xpReward: 25,
    actionLabel: 'Start Revision →',
    actionLabelOdia: 'ପୁନରୀକ୍ଷଣ ଆରମ୍ଭ →',
    targetUrl: '/student/lesson/les_frac_101'
  } : null;

  // Grade-based layout switch
  const numericGrade = parseInt(profile?.grade || '7', 10);
  const isHighSchool = numericGrade >= 9;

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFX.setEnabled(next);
  };

  const handleCategoryClick = (cat) => {
    soundFX.playHover();
    const routes = {
      Adventure: '/student/roadmap',
      Puzzle: '/student/quests',
      Learning: '/student/subjects',
      Creativity: '/student/virtual-lab',
    };
    navigate(routes[cat] || '/student/quests');
  };

  const handleClaimReward = () => {
    if (rewardClaimed) return;
    soundFX.playStarChime();
    setRewardClaimed(true);
    awardXP(50, 'Daily Reward Claimed', 30);
  };

  const handleQuestComplete = async (questId) => {
    soundFX.playStarChime();
    await completeQuestAction(questId);
  };

  const handleChallengeAccept = async (challengeId) => {
    soundFX.playStarChime();
    await completeChallengeAction(challengeId);
  };

  return (
    <div className="game-dashboard-v3">
      {/* Ambient background circles */}
      <FloatingMovableOrbs />



      {/* ── 2. HERO BANNER ─────────────────────────────────────────── */}
      <section className="game-hero-banner">
        <div className="hero-bg-decorations">
          <div className="hero-cloud c1" />
          <div className="hero-cloud c2" />
          <div className="hero-cloud c3" />
          <div className="hero-castle-art">🏰</div>
          <div className="hero-rocket-art">🚀</div>
        </div>
        <div className="hero-content-box">
          <div className="hero-subtitle-pill">
            <span>✨ {isOdia ? 'ମଜାଦାର ଶିକ୍ଷଣ ପ୍ଲାଟଫର୍ମ' : 'Fun Games For Smart Kids'} ⭐</span>
          </div>
          <h1 className="hero-3d-title">
            <span className="t-yellow">PLAY </span>
            <span className="t-pink">LEARN </span>
            <span className="t-cyan">GROW!</span>
          </h1>
          <div className="hero-buttons-row">
            <button onClick={() => navigate('/student/lesson/les_frac_101')} className="hero-btn-primary">
              🎮 {isOdia ? 'ଖେଳ ଆରମ୍ଭ କରନ୍ତୁ' : 'START LEARNING'}
            </button>
            <button onClick={() => navigate('/student/roadmap')} className="hero-btn-secondary">
              🗺️ {isOdia ? 'ସାହସିକ ମାନଚିତ୍ର' : 'VIEW ROADMAP'}
            </button>
          </div>
        </div>
      </section>

      {/* ── 3. XP / LEVEL / STREAK STRIP ─────────────────────────── */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <XPCard xp={profile.xp} xpToNextLevel={profile.xpToNextLevel} />
        <LevelCard level={profile.level} grade={profile.grade} />
        <StreakCard streak={profile.streak || 5} longestStreak={profile.longestStreak || 12} />
      </section>

      {/* ── 4. CONTINUE LEARNING ──────────────────────────────────── */}
      <section style={{ marginBottom: '24px' }}>
        <div className="section-title-row">
          <h3 className="section-title-text">📖 {isOdia ? 'ଶିକ୍ଷଣ ଜାରି ରଖନ୍ତୁ' : 'CONTINUE LEARNING'}</h3>
          <button onClick={() => navigate('/student/subjects')} className="see-all-pill-btn">{isOdia ? 'ସମସ୍ତ' : 'All Subjects'}</button>
        </div>
        <LearningCard lesson={currentLesson} />
      </section>

      {/* ── 5. QUICK CATEGORY DOCK ────────────────────────────────── */}
      <section className="game-category-dock">
        <div className="category-items-scroll">
          {[
            { cat: 'Adventure', icon: '🎮', labelOdia: 'ସାହସିକ', label: 'Adventure' },
            { cat: 'Puzzle', icon: '🧠', labelOdia: 'ଧାନ୍ଦା', label: 'Puzzle' },
            { cat: 'Learning', icon: '📚', labelOdia: 'ଶିକ୍ଷା', label: 'Learn' },
            { cat: 'Creativity', icon: '🎨', labelOdia: 'ସୃଜନ', label: 'Lab' },
          ].map(item => (
            <button key={item.cat} className="category-circle-btn" onClick={() => handleCategoryClick(item.cat)}>
              <div className={`category-icon-circle cat-${item.cat.toLowerCase()}`}>{item.icon}</div>
              <span className="category-label">{isOdia ? item.labelOdia : item.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── 6. GRADE-BASED MAIN CONTENT ──────────────────────────── */}
      {!isHighSchool ? (
        /* ── Classes 5–8: Gamified Layout ── */
        <div className="game-main-content-layout">
          {/* LEFT: Popular games + Quests + Subjects */}
          <div className="game-left-primary-col" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

            {/* Popular Games Grid */}
            <div>
              <div className="section-title-row">
                <h3 className="section-title-text">🎮 {isOdia ? 'ଲୋକପ୍ରିୟ ଖେଳ' : 'POPULAR GAMES'}</h3>
                <button onClick={() => navigate('/student/games')} className="see-all-pill-btn">{isOdia ? 'ସମସ୍ତ' : 'See All'}</button>
              </div>
              <div className="popular-games-grid">
                {[
                  { emoji: '🤠', title: 'JUNGLE ADVENTURE', sub: 'Fractions & Shapes', xp: 100, bg: 'bg-jungle', route: '/student/lesson/les_frac_101' },
                  { emoji: '🐱', title: 'BLOCK PUZZLE', sub: 'Geometry Puzzles', xp: 80, bg: 'bg-block', route: '/student/quiz/quiz_1' },
                  { emoji: '🚀', title: 'SPACE MISSION', sub: 'Solar System Science', xp: 150, bg: 'bg-space', route: '/student/virtual-lab' },
                  { emoji: '🔢', title: 'NUMBER FUN', sub: 'Rapid Math Challenge', xp: 90, bg: 'bg-numbers', route: '/student/quiz/quiz_2' },
                  { emoji: '🎨', title: 'COLOR WORLD', sub: 'Art & Symmetry Lab', xp: 70, bg: 'bg-color', route: '/student/virtual-lab' },
                  { emoji: '🦖', title: 'DINO RUN', sub: 'Grammar & Vocab', xp: 110, bg: 'bg-dino', route: '/student/challenges' },
                ].map(game => (
                  <div key={game.title} className="game-tile-card" onClick={() => { soundFX.playHover(); navigate(game.route); }}>
                    <div className={`game-card-art-box ${game.bg}`}>
                      <span className="game-art-emoji">{game.emoji}</span>
                      <div className="game-play-badge-btn"><Play size={16} fill="#10B981" /></div>
                    </div>
                    <div className="game-card-info-box">
                      <span className="game-card-title">{game.title}</span>
                      <span className="game-card-sub">{game.sub}</span>
                      <span className="game-card-reward-tag">⭐ +{game.xp} XP</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Quests Section */}
            <div>
              <div className="section-title-row">
                <h3 className="section-title-text">🎯 {isOdia ? 'ଦୈନିକ ମିଶନ' : 'DAILY QUESTS'}</h3>
                <button onClick={() => navigate('/student/quests')} className="see-all-pill-btn">{isOdia ? 'ସମସ୍ତ' : 'View All'}</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {quests.slice(0, 4).map(quest => (
                  <QuestCard key={quest.id} quest={quest} onComplete={handleQuestComplete} />
                ))}
              </div>
            </div>

            {/* Subject Progress Section */}
            <div>
              <div className="section-title-row">
                <h3 className="section-title-text">📊 {isOdia ? 'ବିଷୟ ଅଗ୍ରଗତି' : 'SUBJECT PROGRESS'}</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
                {subjects.slice(0, 4).map(subject => (
                  <SubjectCard key={subject.id} subject={subject} />
                ))}
              </div>
            </div>

            {/* Peer Challenges */}
            <div>
              <div className="section-title-row">
                <h3 className="section-title-text">⚔️ {isOdia ? 'ପ୍ରତିଯୋଗିତା' : 'CHALLENGES'}</h3>
                <button onClick={() => navigate('/student/challenges')} className="see-all-pill-btn">{isOdia ? 'ସମସ୍ତ' : 'All Challenges'}</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {challenges.slice(0, 2).map(ch => (
                  <ChallengeCard key={ch.id} challenge={ch} onAccept={handleChallengeAccept} />
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: Widgets */}
          <div className="game-side-widgets-col">
            {/* Daily Reward */}
            <div className="widget-card-daily-reward">
              <div className="reward-title-row">🎁 {isOdia ? 'ଦୈନିକ ପୁରସ୍କାର' : 'DAILY REWARD'}</div>
              <p className="reward-subtitle">{isOdia ? 'ଆପଣଙ୍କ ଉପହାର ସଂଗ୍ରହ କରନ୍ତୁ!' : 'Collect your daily gift!'}</p>
              <div className="gift-box-3d">🎁</div>
              <button onClick={handleClaimReward} className="claim-reward-btn" disabled={rewardClaimed}>
                {rewardClaimed ? `✅ ${isOdia ? 'ଦାବି ହୋଇଛି (+50 XP)' : 'CLAIMED (+50 XP)'}` : (isOdia ? 'ଏବେ ଦାବି କରନ୍ତୁ' : 'CLAIM NOW')}
              </button>
            </div>

            {/* Level Progress — uses real profile data */}
            <div className="widget-card-level-progress">
              <div className="level-header-row">
                <div className="level-star-badge">{profile.level}</div>
                <div className="level-title-box">
                  <span className="level-sub-tag">{isOdia ? 'ସ୍ତର ଅଗ୍ରଗତି' : 'LEVEL PROGRESS'}</span>
                  <span className="level-name">{profile.grade} {isOdia ? 'ପ୍ଲେୟର' : 'Player'}!</span>
                </div>
              </div>
              <div className="level-progress-bar-bg">
                <div className="level-progress-fill" style={{ width: `${xpPercent}%` }} />
              </div>
              <div className="level-xp-values">
                <span>{profile.xp} / {profile.xpToNextLevel} XP</span>
                <span>🎁 {isOdia ? 'ପର ସ୍ତର ଖୋଲ' : 'Next Level'}</span>
              </div>
            </div>

            {/* AI Recommendation */}
            {recommendation && <RecommendationCard recommendation={recommendation} />}

            {/* Weak Topics */}
            {allWeakTopics.length > 0 && (
              <WeakTopicCard subject={mathSubject?.name} weakTopics={allWeakTopics} />
            )}

            {/* Recent Badges */}
            <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '16px', border: '2px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
              <div className="section-title-row" style={{ marginBottom: '12px' }}>
                <h4 className="section-title-text" style={{ fontSize: '16px' }}>🏅 {isOdia ? 'ସଦ୍ୟ ଅର୍ଜିତ ବ୍ୟାଜ' : 'RECENT BADGES'}</h4>
                <button onClick={() => navigate('/student/achievements')} className="see-all-pill-btn">{isOdia ? 'ସମସ୍ତ' : 'All'}</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {badges.filter(b => b.unlocked).slice(0, 3).map(badge => (
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
              </div>
            </div>

            {/* Overall Progress Chart */}
            <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '16px', border: '2px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
              <h4 className="section-title-text" style={{ fontSize: '16px', marginBottom: '12px' }}>📊 {isOdia ? 'ସାମଗ୍ରୀ ଅଗ୍ରଗତି' : 'OVERALL PROGRESS'}</h4>
              <ProgressChart subjects={subjects} />
            </div>

            {/* AI Mascot Tip */}
            <div className="widget-card-parent-tip" onClick={() => navigate('/student/ai-buddy')} style={{ cursor: 'pointer' }}>
              <div className="monster-mascot-avatar">👾</div>
              <div className="tip-content-box">
                <h5>🤖 {isOdia ? 'AI ଶିକ୍ଷଣ ସାଥୀ' : 'AI LEARNING BUDDY'}</h5>
                <p>{isOdia ? 'ଯେ କୌଣସି ପ୍ରଶ୍ନ ଜିଜ୍ଞାସା କରନ୍ତୁ!' : 'Ask me anything anytime — I\'m here to help!'}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ── Classes 9–12: Exam Hub Layout ── */
        <div className="highschool-board-hub">
          <div className="section-title-row">
            <h3 className="section-title-text">🎯 BOARD EXAM PREPARATION HUB</h3>
            <span className="exam-perc-badge">Predicted Board Score: {Math.round(subjects.reduce((a, s) => a + s.accuracy, 0) / subjects.length)}%</span>
          </div>

          {/* XP/Level/Streak strip for seniors */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <XPCard xp={profile.xp} xpToNextLevel={profile.xpToNextLevel} />
            <LevelCard level={profile.level} grade={profile.grade} />
            <StreakCard streak={profile.streak || 5} longestStreak={profile.longestStreak || 12} />
          </div>

          <div className="exam-prep-grid">
            {subjects.map(subject => (
              <div
                key={subject.id}
                className="exam-subject-card"
                onClick={() => navigate(`/student/lessons?subject=${subject.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="exam-sub-header">
                  <span style={{ color: subject.color }}>{subject.name}</span>
                  <span className="exam-perc-badge">{subject.accuracy}% Accuracy</span>
                </div>
                <p className="game-card-sub" style={{ margin: '6px 0' }}>{subject.currentTopic}</p>
                <div className="level-progress-bar-bg" style={{ height: '8px', background: '#F1F5F9' }}>
                  <div className="level-progress-fill" style={{ width: `${subject.progress}%`, background: subject.color }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748B', marginTop: '6px', fontWeight: 700 }}>
                  <span>{subject.completedLessons}/{subject.totalLessons} Lessons</span>
                  <span>{subject.progress}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quests for seniors */}
          <div style={{ marginTop: '24px' }}>
            <div className="section-title-row">
              <h4 className="section-title-text" style={{ fontSize: '16px' }}>🎯 {isOdia ? 'ଦୈନିକ ମିଶନ' : 'DAILY EXAM QUESTS'}</h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quests.map(q => <QuestCard key={q.id} quest={q} onComplete={handleQuestComplete} />)}
            </div>
          </div>
        </div>
      )}

      {/* ── DRAWERS & MODALS ─────────────────────────────────────── */}
      <QuestModal
        isOpen={Boolean(selectedChapter)}
        chapter={selectedChapter}
        onClose={() => setSelectedChapter(null)}
        onStartLesson={() => navigate('/student/lesson/les_frac_101')}
        isOdia={isOdia}
        onAskAI={() => navigate('/student/ai-buddy')}
      />

      <DailyQuestsDrawer
        isOpen={isQuestsOpen}
        onClose={() => setIsQuestsOpen(false)}
        quests={quests}
        onClaimQuest={async (id) => {
          soundFX.playStarChime();
          await completeQuestAction(id);
        }}
        isOdia={isOdia}
      />

      <LeaderboardDrawer
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        leaderboard={leaderboardData}
        isOdia={isOdia}
      />
    </div>
  );
};

export default StudentDashboard;

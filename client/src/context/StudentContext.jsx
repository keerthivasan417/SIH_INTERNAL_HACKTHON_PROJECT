import React, { createContext, useContext, useState, useEffect } from 'react';
import { studentApi, MOCK_SUBJECTS, MOCK_DAILY_QUESTS, MOCK_PEER_CHALLENGES, MOCK_LEADERBOARD } from '../services/studentApi';
import { translations } from '../utils/translations';

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('or'); // Default to Odia
  const [lowDataMode, setLowDataMode] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncQueueCount, setSyncQueueCount] = useState(0);
  const [levelUpModal, setLevelUpModal] = useState({ open: false, level: 1 });
  const [notification, setNotification] = useState(null);

  // Unified Student Progress State Data
  const [quests, setQuests] = useState(MOCK_DAILY_QUESTS);
  const [badges, setBadges] = useState([]);
  const [subjects, setSubjects] = useState(MOCK_SUBJECTS);
  const [challenges, setChallenges] = useState(MOCK_PEER_CHALLENGES);
  const [leaderboardData, setLeaderboardData] = useState(MOCK_LEADERBOARD);
  const [completedLessons, setCompletedLessons] = useState(['les_water_201']);
  const [quizResults, setQuizResults] = useState([]);
  const [unlockedAchievement, setUnlockedAchievement] = useState(null);

  // Initialize Network Listeners & Load Profile
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      const queue = studentApi.getSyncQueue();
      if (queue.length > 0) {
        showNotification('Online! Syncing offline progress...', 'info');
        setTimeout(() => {
          studentApi.clearSyncQueue();
          setSyncQueueCount(0);
          showNotification('All progress successfully synced to server! ✅', 'success');
        }, 1500);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      showNotification('Switched to Offline Mode. Continuing without disruption.', 'warning');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial Data Fetch
    fetchStudentProfile();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const fetchStudentProfile = async () => {
    try {
      setLoading(true);
      const data = await studentApi.getProfile();
      const loadedQuests = await studentApi.getDailyQuests();
      const loadedBadges = await studentApi.getBadges();
      const loadedSubjects = await studentApi.getSubjects();
      const loadedLeaderboard = await studentApi.getLeaderboard('top');

      // Ensure profile has coins & streak default values
      if (!data.coins) data.coins = 150;
      if (!data.streak) data.streak = 5;
      if (!data.longestStreak) data.longestStreak = 12;

      setProfile(data);
      setQuests(loadedQuests);
      setBadges(loadedBadges);
      setSubjects(loadedSubjects);
      setLeaderboardData(loadedLeaderboard);

      if (data.language) setLanguage(data.language);
      if (data.lowDataMode !== undefined) setLowDataMode(data.lowDataMode);
      setSyncQueueCount(studentApi.getSyncQueue().length);
    } catch (err) {
      console.error('Error loading student profile:', err);
    } finally {
      setLoading(false);
    }
  };

  // Switch Language (Odia / English)
  const changeLanguage = async (newLang) => {
    setLanguage(newLang);
    if (profile) {
      const updated = await studentApi.updateProfile({ language: newLang });
      setProfile(updated);
    }
  };

  // Toggle Low Data Mode
  const toggleLowDataMode = async () => {
    const nextVal = !lowDataMode;
    setLowDataMode(nextVal);
    if (profile) {
      const updated = await studentApi.updateProfile({ lowDataMode: nextVal });
      setProfile(updated);
    }
    showNotification(`Data Saver Mode: ${nextVal ? 'ON' : 'OFF'}`, 'info');
  };

  // Translation helper function
  const t = (key) => {
    const langDict = translations[language] || translations.en;
    return langDict[key] || translations.en[key] || key;
  };

  // Display Toast Notification
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Award XP Helper with Level Up & Coins Calculation
  const awardXP = async (amount, reason, bonusCoins = 10) => {
    try {
      const result = await studentApi.addXP(amount, reason);
      const updatedProf = result?.updatedProfile || profile;
      const currentCoins = Number(updatedProf?.coins) || 150;
      const newCoins = currentCoins + bonusCoins;
      const updatedProfileWithCoins = { ...updatedProf, coins: newCoins };

      setProfile(updatedProfileWithCoins);
      localStorage.setItem('ama_siksha_student_profile', JSON.stringify(updatedProfileWithCoins));

      if (result?.leveledUp) {
        setLevelUpModal({ open: true, level: updatedProf.level });
      }
      showNotification(`+${amount} XP & +${bonusCoins} Coins Gained! (${reason})`, 'success');
      return result;
    } catch (err) {
      console.error("awardXP error:", err);
    }
  };

  // Complete a Quest Method (Phase 3 System)
  const completeQuestAction = async (questId) => {
    const targetQuest = quests.find(q => q.id === questId);
    if (!targetQuest || targetQuest.completed) return;

    const res = await studentApi.completeQuest(questId);
    setQuests(res.quests);

    const xp = targetQuest.xpReward || 20;
    const coins = targetQuest.coinReward || 10;
    await awardXP(xp, `Quest Completed: ${targetQuest.title}`, coins);

    // Auto-check achievement unlocks
    if (!badges.find(b => b.id === 'b_first_step')?.unlocked) {
      const updatedBadges = badges.map(b => b.id === 'b_first_step' ? { ...b, unlocked: true, unlockedAt: new Date().toISOString().split('T')[0] } : b);
      setBadges(updatedBadges);
      setUnlockedAchievement(updatedBadges.find(b => b.id === 'b_first_step'));
    }
  };

  // Complete / Accept a Challenge Method (Phase 5 System: +30 XP for Daily Challenge)
  const completeChallengeAction = async (challengeId) => {
    const target = challenges.find(c => c.id === challengeId);
    if (!target || target.status === 'completed') return;

    const updated = challenges.map(c => {
      if (c.id === challengeId) {
        return {
          ...c,
          status: 'completed',
          myScore: 95,
          peerScore: 80,
          winner: 'me'
        };
      }
      return c;
    });

    setChallenges(updated);
    localStorage.setItem('ama_siksha_peer_challenges', JSON.stringify(updated));

    // Phase 5 standard: Daily challenge -> +30 XP
    const xp = 30;
    const coins = target?.rewardCoins || 15;
    await awardXP(xp, `Challenge Passed: ${target?.topic || 'Daily Challenge'}`, coins);
  };

  // Complete a Lesson Method (Phase 5 System: +10 XP for Lesson Complete)
  const completeLessonAction = async (lessonId, xpReward = 10) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
    }
    // Phase 5 standard: Lesson complete -> +10 XP
    await awardXP(10, 'Lesson Completed', 10);

    // Auto check First Lesson badge unlock
    const firstLessonBadge = badges.find(b => b.id === 'b_first_lesson');
    if (firstLessonBadge && !firstLessonBadge.unlocked) {
      const updatedBadges = badges.map(b => b.id === 'b_first_lesson' ? { ...b, unlocked: true, status: 'unlocked', unlockedAt: new Date().toISOString().split('T')[0] } : b);
      setBadges(updatedBadges);
      setUnlockedAchievement(updatedBadges.find(b => b.id === 'b_first_lesson'));
    }

    // Update quest progress if applicable
    const questToUpdate = quests.find(q => !q.completed && q.title.toLowerCase().includes('lesson'));
    if (questToUpdate) {
      await completeQuestAction(questToUpdate.id);
    }
  };

  // Complete a Quiz Method (Phase 5 System: +20 XP for Quiz Complete, +50 XP for Perfect Quiz)
  const completeQuizAction = async (quizId, score, totalQuestions) => {
    const accuracy = Math.round((score / totalQuestions) * 100);
    const isPerfect = accuracy === 100;
    
    // Phase 5 standard: Perfect quiz -> +50 XP, Normal quiz complete -> +20 XP
    const xpEarned = isPerfect ? 50 : 20;

    const newQuizResult = { quizId, score, totalQuestions, accuracy, date: new Date().toISOString() };
    setQuizResults(prev => [...prev, newQuizResult]);
    await awardXP(xpEarned, `Quiz Passed (${accuracy}%)`, isPerfect ? 30 : 15);

    // Check for Perfect Score badge unlock
    if (isPerfect) {
      const perfectBadge = badges.find(b => b.id === 'b_perfect_score');
      if (perfectBadge && !perfectBadge.unlocked) {
        const updatedBadges = badges.map(b => b.id === 'b_perfect_score' ? { ...b, unlocked: true, status: 'unlocked', unlockedAt: new Date().toISOString().split('T')[0] } : b);
        setBadges(updatedBadges);
        setUnlockedAchievement(updatedBadges.find(b => b.id === 'b_perfect_score'));
      }
    }

    // Check for Quiz Master badge unlock (score 90%+)
    if (accuracy >= 90) {
      const quizMasterBadge = badges.find(b => b.id === 'b_quiz_master');
      if (quizMasterBadge && !quizMasterBadge.unlocked) {
        const updatedBadges = badges.map(b => b.id === 'b_quiz_master' ? { ...b, unlocked: true, status: 'unlocked', unlockedAt: new Date().toISOString().split('T')[0] } : b);
        setBadges(updatedBadges);
        setUnlockedAchievement(updatedBadges.find(b => b.id === 'b_quiz_master'));
      }
    }

    // Update quest progress
    const questToUpdate = quests.find(q => !q.completed && q.title.toLowerCase().includes('quiz'));
    if (questToUpdate) {
      await completeQuestAction(questToUpdate.id);
    }

    return newQuizResult;
  };

  return (
    <StudentContext.Provider
      value={{
        profile,
        setProfile,
        loading,
        language,
        changeLanguage,
        lowDataMode,
        toggleLowDataMode,
        isOnline,
        syncQueueCount,
        levelUpModal,
        setLevelUpModal,
        notification,
        showNotification,
        awardXP,
        quests,
        completeQuestAction,
        completeLessonAction,
        completeQuizAction,
        completeChallengeAction,
        badges,
        subjects,
        challenges,
        leaderboardData,
        completedLessons,
        quizResults,
        unlockedAchievement,
        setUnlockedAchievement,
        t,
        fetchStudentProfile
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);


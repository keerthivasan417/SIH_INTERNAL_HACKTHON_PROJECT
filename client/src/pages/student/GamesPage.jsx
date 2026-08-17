import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../../context/StudentContext';
import soundFX from '../../utils/audioFX';
import {
  Gamepad2, Play, Sparkles, Trophy, Clock, CheckCircle2, XCircle,
  RotateCcw, ArrowRight, Star, Zap, Shield, HelpCircle, Layers, Flame
} from 'lucide-react';

// Topic-Connected Educational Games Dataset
const CURRICULUM_GAMES = [
  {
    id: 'game_fraction_match',
    name: 'Fraction Match & Memory',
    nameOdia: 'ଭଗ୍ନାଂଶ ଯୋଡ଼ି ସଜାଡ଼ିବା ଖେଳ',
    subject: 'Mathematics',
    subjectOdia: 'ଗଣିତ',
    topic: 'Fractions',
    topicOdia: 'ଭଗ୍ନାଂଶ',
    type: 'Match the Pair / Memory Cards',
    emoji: '🍕',
    bg: 'bg-jungle',
    description: 'Match fraction numbers with visual shapes and real-world representations.',
    descriptionOdia: 'ଭଗ୍ନାଂଶ ସଂଖ୍ୟାଗୁଡ଼ିକୁ ସଠିକ୍ ଦୃଶ୍ୟମାନ ଆକୃତି ସହ ମିଶାନ୍ତୁ।',
    difficulties: {
      Easy: {
        timeLimit: 60,
        pairs: [
          { id: 1, text: '1/2', match: 'Half Chapati (1 of 2)' },
          { id: 2, text: '3/4', match: '3 shaded out of 4' },
          { id: 3, text: '1/4', match: 'Quarter Sambalpuri Border' }
        ]
      },
      Medium: {
        timeLimit: 45,
        pairs: [
          { id: 1, text: '1/2', match: 'Half Chapati (1 of 2)' },
          { id: 2, text: '3/4', match: '3 shaded out of 4' },
          { id: 3, text: '2/4', match: '2 shaded out of 4 (Equivalent to 1/2)' },
          { id: 4, text: '5/8', match: '5 slices ate from 8' }
        ]
      },
      Hard: {
        timeLimit: 35,
        pairs: [
          { id: 1, text: '1/2', match: 'Half Chapati (1 of 2)' },
          { id: 2, text: '3/4', match: '3 shaded out of 4' },
          { id: 3, text: '4/8', match: '4 out of 8 equal pieces' },
          { id: 4, text: '3/6', match: '3 out of 6 flower petals' },
          { id: 5, text: '7/10', match: '7 filled water bottles' }
        ]
      }
    }
  },
  {
    id: 'game_water_cycle',
    name: 'Water Cycle Sequence Quest',
    nameOdia: 'ଜଳ ଚକ୍ର କ୍ରମ ସଜାଡ଼ିବା',
    subject: 'Science',
    subjectOdia: 'ବିଜ୍ଞାନ',
    topic: 'Water Cycle & Atmosphere',
    topicOdia: 'ଜଳ ଚକ୍ର ଓ ବାୟୁମଣ୍ଡଳ',
    type: 'Arrange in Correct Order',
    emoji: '🌊',
    bg: 'bg-space',
    description: 'Arrange nature events in the correct natural water cycle order.',
    descriptionOdia: 'ପ୍ରାକୃତିକ ଜଳ ଚକ୍ରର ପର୍ଯ୍ୟାୟଗୁଡ଼ିକୁ ସଠିକ୍ କ୍ରମରେ ସଜାନ୍ତୁ।',
    difficulties: {
      Easy: {
        steps: [
          { step: 1, text: 'Sun heats Chilika Lake water (Evaporation)' },
          { step: 2, text: 'Vapor cools to form dark clouds (Condensation)' },
          { step: 3, text: 'Rain falls over Koraput hills (Precipitation)' }
        ]
      },
      Medium: {
        steps: [
          { step: 1, text: 'Sun heats ocean surface water' },
          { step: 2, text: 'Water vapor rises into atmosphere (Evaporation)' },
          { step: 3, text: 'Vapor condenses into cloud droplets' },
          { step: 4, text: 'Heavy clouds shower rain (Precipitation)' }
        ]
      },
      Hard: {
        steps: [
          { step: 1, text: 'Solar radiation warms land & water bodies' },
          { step: 2, text: 'Water converts into invisible water vapor' },
          { step: 3, text: 'Plant transpiration releases moisture' },
          { step: 4, text: 'Condensation forms rain clouds' },
          { step: 5, text: 'Precipitation refills rivers and Chilika Lake' }
        ]
      }
    }
  },
  {
    id: 'game_grammar_speed',
    name: 'Preposition Speed Challenge',
    nameOdia: 'ବ୍ୟାକରଣ ପ୍ରିପୋଜିସନ୍ ଶୀଘ୍ର ଖେଳ',
    subject: 'English',
    subjectOdia: 'ଇଂରାଜୀ',
    topic: 'Grammar & Vocabulary',
    topicOdia: 'ବ୍ୟାକରଣ',
    type: 'Fill in the Blank / Timed Challenge',
    emoji: '🦖',
    bg: 'bg-dino',
    description: 'Test your English grammar speed by picking the correct preposition.',
    descriptionOdia: 'ସଠିକ୍ ପ୍ରିପୋଜିସନ୍ ବାଛି ଇଂରାଜୀ ବ୍ୟାକରଣ ଦକ୍ଷତା ପ୍ରମାଣ କରନ୍ତୁ।',
    difficulties: {
      Easy: {
        questions: [
          { text: 'The peacock is sitting ___ the branch.', options: ['on', 'in', 'under'], ans: 'on' },
          { text: 'Fish swim ___ the Chilika water.', options: ['in', 'above', 'over'], ans: 'in' },
          { text: 'The sun rises ___ the east.', options: ['in', 'on', 'at'], ans: 'in' }
        ]
      },
      Medium: {
        questions: [
          { text: 'The cat jumped ___ the wall.', options: ['over', 'into', 'under'], ans: 'over' },
          { text: 'Akash walked ___ the village bridge.', options: ['across', 'in', 'at'], ans: 'across' },
          { text: 'She is good ___ solving math puzzles.', options: ['at', 'on', 'in'], ans: 'at' }
        ]
      },
      Hard: {
        questions: [
          { text: 'We have been studying ___ morning.', options: ['since', 'for', 'from'], ans: 'since' },
          { text: 'The train arrived ___ time.', options: ['on', 'at', 'in'], ans: 'on' },
          { text: 'Divide these sweets ___ the four children.', options: ['among', 'between', 'into'], ans: 'among' }
        ]
      }
    }
  }
];

export const GamesPage = () => {
  const { language, t, awardXP, quests, completeQuestAction } = useStudent();
  const navigate = useNavigate();
  const isOdia = language === 'or';

  // Game flow states
  const [selectedGame, setSelectedGame] = useState(null);
  const [difficulty, setDifficulty] = useState('Easy'); // Easy, Medium, Hard
  const [gameMode, setGameMode] = useState('library'); // 'library' | 'playing' | 'complete'

  // Gameplay state
  const [secondsSpent, setSecondsSpent] = useState(0);
  const [currentTaskIdx, setCurrentTaskIdx] = useState(0);
  const [userSelectedPairs, setUserSelectedPairs] = useState({});
  const [userOrder, setUserOrder] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [gameCompleteData, setGameCompleteData] = useState(null);

  // Timer effect during active gameplay
  useEffect(() => {
    let timer = null;
    if (gameMode === 'playing') {
      timer = setInterval(() => {
        setSecondsSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameMode]);

  // Start selected game
  const handleLaunchGame = (game) => {
    setSelectedGame(game);
    setDifficulty('Easy');
    setGameMode('setup');
    soundFX.playHover();
  };

  const handleStartPlay = () => {
    setSecondsSpent(0);
    setCurrentTaskIdx(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setUserSelectedPairs({});
    
    if (selectedGame.id === 'game_water_cycle') {
      // Shuffle steps for arrangement game
      const steps = [...selectedGame.difficulties[difficulty].steps];
      const shuffled = [...steps].sort(() => Math.random() - 0.5);
      setUserOrder(shuffled);
    }

    setGameMode('playing');
    soundFX.playWhoosh();
  };

  // Complete game action
  const triggerGameCompletion = async (finalCorrect, totalTasks) => {
    soundFX.playStarChime();
    const finalWrong = totalTasks - finalCorrect;
    const accuracy = Math.round((finalCorrect / totalTasks) * 100);

    const diffMultiplier = difficulty === 'Easy' ? 1 : (difficulty === 'Medium' ? 1.5 : 2);
    const xpEarned = Math.round(40 * diffMultiplier);
    const coinsEarned = Math.round(20 * diffMultiplier);

    const completeData = {
      gameTitle: selectedGame.name,
      gameTitleOdia: selectedGame.nameOdia,
      topic: selectedGame.topic,
      difficulty,
      score: accuracy,
      accuracy,
      timeSpentSeconds: secondsSpent,
      correctAnswers: finalCorrect,
      wrongAnswers: finalWrong,
      totalTasks,
      xpEarned,
      coinsEarned
    };

    setGameCompleteData(completeData);
    setGameMode('complete');

    // ── GAME COMPLETE → XP REWARD → QUEST UPDATE → ACHIEVEMENT CHECK → ROADMAP UPDATE ──
    await awardXP(xpEarned, `Completed Game: ${selectedGame.name} (${difficulty})`, coinsEarned);

    // Auto-update game quest if available
    const gameQuest = quests.find(q => !q.completed && (q.id === 'quest_game' || q.title.toLowerCase().includes('game')));
    if (gameQuest) {
      await completeQuestAction(gameQuest.id);
    }
  };

  // Answer handler for Matching / Multiple choice
  const handleMatchSelect = (leftId, rightText, correctMatchText, totalPairs) => {
    const isCorrect = rightText === correctMatchText;
    if (isCorrect) {
      soundFX.playSuccess();
      const newCorrect = correctAnswers + 1;
      setCorrectAnswers(newCorrect);
      setUserSelectedPairs(prev => ({ ...prev, [leftId]: rightText }));

      if (Object.keys(userSelectedPairs).length + 1 >= totalPairs) {
        triggerGameCompletion(newCorrect, totalPairs);
      }
    } else {
      soundFX.playError();
      setWrongAnswers(prev => prev + 1);
    }
  };

  // Answer handler for Question Options
  const handleQuestionAnswer = (selectedAns, correctAns, totalQuestions) => {
    const isCorrect = selectedAns === correctAns;
    let nextCorrect = correctAnswers;
    if (isCorrect) {
      soundFX.playSuccess();
      nextCorrect += 1;
      setCorrectAnswers(nextCorrect);
    } else {
      soundFX.playError();
      setWrongAnswers(prev => prev + 1);
    }

    if (currentTaskIdx + 1 < totalQuestions) {
      setCurrentTaskIdx(prev => prev + 1);
    } else {
      triggerGameCompletion(nextCorrect, totalQuestions);
    }
  };

  // Re-order drag step for Water Cycle
  const handleMoveStep = (fromIdx, toIdx) => {
    const newArr = [...userOrder];
    const [moved] = newArr.splice(fromIdx, 1);
    newArr.splice(toIdx, 0, moved);
    setUserOrder(newArr);
    soundFX.playHover();
  };

  const handleVerifyOrder = () => {
    let correctCount = 0;
    userOrder.forEach((item, idx) => {
      if (item.step === idx + 1) correctCount++;
    });
    triggerGameCompletion(correctCount, userOrder.length);
  };

  return (
    <div className="student-page-container" style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* ── 1. LIBRARY VIEW ────────────────────────────────────────────── */}
      {gameMode === 'library' && (
        <>
          <div className="section-title-row" style={{ marginBottom: '24px' }}>
            <div>
              <h1 className="section-title-text" style={{ fontSize: '24px', fontWeight: '900', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px' }}>
                🎮 {isOdia ? 'ଶିକ୍ଷଣ ଖେଳ ଗ୍ୟାଲେରୀ' : 'EDUCATIONAL GAMES HUB'}
              </h1>
              <p style={{ color: '#64748B', fontSize: '13px', fontWeight: '600', marginTop: '4px' }}>
                {isOdia
                  ? 'ପ୍ରତ୍ୟେକ ଖେଳ ପାଠ୍ୟକ୍ରମ ପ୍ରସଙ୍ଗ ସହ ଜଡ଼ିତ! ଖେଳନ୍ତୁ, ଅଭ୍ୟାସ କରନ୍ତୁ ଏବଂ ଦକ୍ଷତା ହାସଲ କରନ୍ତୁ।'
                  : 'Play curriculum-connected mini-games! Learn → Play → Practice → Master.'}
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
            {CURRICULUM_GAMES.map(game => (
              <div
                key={game.id}
                className="game-tile-card"
                style={{ background: '#FFFFFF', borderRadius: '18px', padding: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
              >
                <div className={`game-card-art-box ${game.bg}`} style={{ height: '120px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <span style={{ fontSize: '56px' }}>{game.emoji}</span>
                  <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(255,255,255,0.9)', padding: '4px 10px', borderRadius: '10px', fontSize: '11px', fontWeight: '800', color: '#0F172A' }}>
                    {game.type}
                  </div>
                </div>

                <div className="game-card-info-box" style={{ marginTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#4F46E5', background: '#EEF2FF', padding: '2px 8px', borderRadius: '8px' }}>
                      {isOdia ? game.subjectOdia : game.subject}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748B' }}>
                      {isOdia ? game.topicOdia : game.topic}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#0F172A', margin: '6px 0 4px 0' }}>
                    {isOdia ? game.nameOdia : game.name}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748B', lineHeight: '1.4', margin: '0 0 14px 0' }}>
                    {isOdia ? game.descriptionOdia : game.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleLaunchGame(game)}
                    style={{ width: '100%', padding: '10px', borderRadius: '12px', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: 'white', border: 'none', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  >
                    <Play size={16} fill="currentColor" /> {isOdia ? 'ଖେଳ ଆରମ୍ଭ କରନ୍ତୁ' : 'Play Game'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── 2. GAME SETUP & DIFFICULTY SELECTOR ───────────────────────── */}
      {gameMode === 'setup' && selectedGame && (
        <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '28px', border: '1px solid #E2E8F0', textAlign: 'center', maxWidth: '600px', margin: '20px auto', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}>
          <span style={{ fontSize: '64px' }}>{selectedGame.emoji}</span>
          <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#0F172A', marginTop: '10px' }}>
            {isOdia ? selectedGame.nameOdia : selectedGame.name}
          </h2>
          <p style={{ color: '#64748B', fontSize: '13px', marginTop: '4px' }}>
            Topic: <strong>{isOdia ? selectedGame.topicOdia : selectedGame.topic}</strong>
          </p>

          <div style={{ margin: '24px 0' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#334155', marginBottom: '12px' }}>
              {isOdia ? 'କଠିନତା ସ୍ତର ବାଛନ୍ତୁ' : 'SELECT DIFFICULTY LEVEL:'}
            </h4>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              {['Easy', 'Medium', 'Hard'].map(lvl => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setDifficulty(lvl)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '12px',
                    fontWeight: '900',
                    border: difficulty === lvl ? '2px solid #4F46E5' : '1px solid #CBD5E1',
                    background: difficulty === lvl ? '#EEF2FF' : '#F8FAFC',
                    color: difficulty === lvl ? '#4F46E5' : '#64748B',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {lvl === 'Easy' ? '🟢 Easy' : (lvl === 'Medium' ? '🟡 Medium' : '🔴 Hard')}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setGameMode('library')}
              style={{ flex: 1, padding: '12px', borderRadius: '12px', background: '#F1F5F9', border: 'none', fontWeight: '800', color: '#64748B', cursor: 'pointer' }}
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleStartPlay}
              style={{ flex: 2, padding: '12px', borderRadius: '12px', background: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)', color: 'white', border: 'none', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Play size={18} fill="currentColor" /> {isOdia ? 'ଖେଳ ଚାଲୁ କରନ୍ତୁ' : 'Start Challenge'}
            </button>
          </div>
        </div>
      )}

      {/* ── 3. ACTIVE GAMEPLAY ENGINE ──────────────────────────────────── */}
      {gameMode === 'playing' && selectedGame && (
        <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '24px', border: '1px solid #E2E8F0', boxShadow: '0 10px 25px rgba(0,0,0,0.06)' }}>
          {/* HEADER STRIP */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #F1F5F9' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#4F46E5', background: '#EEF2FF', padding: '2px 8px', borderRadius: '8px' }}>
                {difficulty} • {selectedGame.type}
              </span>
              <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#0F172A', marginTop: '4px' }}>
                {isOdia ? selectedGame.nameOdia : selectedGame.name}
              </h2>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ background: '#FFFBEB', color: '#D97706', padding: '6px 14px', borderRadius: '12px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                <Clock size={16} /> {Math.floor(secondsSpent / 60)}:{(secondsSpent % 60).toString().padStart(2, '0')}
              </div>
              <div style={{ background: '#ECFDF5', color: '#059669', padding: '6px 14px', borderRadius: '12px', fontWeight: '800', fontSize: '13px' }}>
                Score: {correctAnswers}
              </div>
            </div>
          </div>

          {/* GAME MECHANIC 1: FRACTION MATCHING */}
          {selectedGame.id === 'game_fraction_match' && (
            <div>
              <p style={{ textAlign: 'center', fontWeight: '700', color: '#475569', marginBottom: '20px' }}>
                Click a fraction on the left, then click its matching visual representation on the right!
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* LEFT ITEMS */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {selectedGame.difficulties[difficulty].pairs.map(pair => {
                    const isDone = Boolean(userSelectedPairs[pair.id]);
                    return (
                      <div
                        key={pair.id}
                        style={{
                          padding: '16px',
                          borderRadius: '14px',
                          border: isDone ? '2px solid #10B981' : '2px dashed #6366F1',
                          background: isDone ? '#ECFDF5' : '#EEF2FF',
                          fontWeight: '900',
                          fontSize: '20px',
                          color: isDone ? '#059669' : '#4F46E5',
                          textAlign: 'center'
                        }}
                      >
                        {pair.text} {isDone && ' ✅'}
                      </div>
                    );
                  })}
                </div>

                {/* RIGHT MATCHES */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {selectedGame.difficulties[difficulty].pairs.map(pair => (
                    <button
                      key={pair.id}
                      type="button"
                      onClick={() => handleMatchSelect(pair.id, pair.match, pair.match, selectedGame.difficulties[difficulty].pairs.length)}
                      style={{
                        padding: '16px',
                        borderRadius: '14px',
                        border: '1px solid #CBD5E1',
                        background: '#F8FAFC',
                        fontWeight: '700',
                        fontSize: '13px',
                        color: '#1E293B',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      🎯 {pair.match}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* GAME MECHANIC 2: WATER CYCLE SEQUENCE */}
          {selectedGame.id === 'game_water_cycle' && (
            <div>
              <p style={{ textAlign: 'center', fontWeight: '700', color: '#475569', marginBottom: '16px' }}>
                Move and arrange the water cycle steps into the exact natural order (1 → 2 → 3)!
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {userOrder.map((item, idx) => (
                  <div
                    key={item.text}
                    style={{
                      padding: '14px 18px',
                      borderRadius: '14px',
                      background: '#F8FAFC',
                      border: '1px solid #CBD5E1',
                      display: 'flex',
                      justify: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ background: '#4F46E5', color: 'white', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '13px' }}>
                        {idx + 1}
                      </span>
                      <span style={{ fontWeight: '700', color: '#1E293B', fontSize: '14px' }}>{item.text}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveStep(idx, idx - 1)}
                        style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', background: 'white', cursor: 'pointer' }}
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        disabled={idx === userOrder.length - 1}
                        onClick={() => handleMoveStep(idx, idx + 1)}
                        style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', background: 'white', cursor: 'pointer' }}
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleVerifyOrder}
                style={{ width: '100%', padding: '14px', borderRadius: '14px', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: 'white', border: 'none', fontWeight: '900', fontSize: '15px', cursor: 'pointer' }}
              >
                Verify & Submit Sequence
              </button>
            </div>
          )}

          {/* GAME MECHANIC 3: GRAMMAR TIMED CHALLENGE */}
          {selectedGame.id === 'game_grammar_speed' && (
            <div>
              {(() => {
                const qList = selectedGame.difficulties[difficulty].questions;
                const currentQ = qList[currentTaskIdx];
                return (
                  <div style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
                    <div style={{ fontSize: '12px', fontWeight: '800', color: '#64748B', marginBottom: '8px' }}>
                      Question {currentTaskIdx + 1} of {qList.length}
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#0F172A', marginBottom: '24px' }}>
                      "{currentQ.text}"
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {currentQ.options.map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleQuestionAnswer(opt, currentQ.ans, qList.length)}
                          style={{
                            padding: '16px',
                            borderRadius: '14px',
                            border: '2px solid #E2E8F0',
                            background: '#F8FAFC',
                            fontWeight: '800',
                            fontSize: '16px',
                            color: '#1E293B',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          👉 {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* ── 4. GAME COMPLETE SCREEN (Exact Specs Requirements) ───────────── */}
      {gameMode === 'complete' && gameCompleteData && (
        <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '32px', border: '1px solid #E2E8F0', textAlign: 'center', maxWidth: '550px', margin: '20px auto', boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '64px', marginBottom: '10px' }}>🏆</div>
          <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#0F172A', margin: 0 }}>
            GAME COMPLETE
          </h1>
          <p style={{ color: '#64748B', fontWeight: '700', fontSize: '13px', marginTop: '4px' }}>
            Topic: {gameCompleteData.topic} ({gameCompleteData.difficulty})
          </p>

          {/* STATS SUMMARY GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', margin: '24px 0' }}>
            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '22px', fontWeight: '900', color: '#4F46E5' }}>{gameCompleteData.score}%</div>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748B' }}>Score</div>
            </div>
            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '22px', fontWeight: '900', color: '#10B981' }}>{gameCompleteData.accuracy}%</div>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748B' }}>Accuracy</div>
            </div>
            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '22px', fontWeight: '900', color: '#D97706' }}>{gameCompleteData.timeSpentSeconds}s</div>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748B' }}>Time Taken</div>
            </div>
            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '22px', fontWeight: '900', color: '#059669' }}>
                {gameCompleteData.correctAnswers} / {gameCompleteData.totalTasks}
              </div>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748B' }}>Correct / Wrong ({gameCompleteData.wrongAnswers})</div>
            </div>
          </div>

          {/* REWARDS BANNER */}
          <div style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', borderRadius: '16px', padding: '16px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '24px', border: '1px solid #F59E0B' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={22} fill="#D97706" color="#D97706" />
              <span style={{ fontSize: '18px', fontWeight: '900', color: '#78350F' }}>+{gameCompleteData.xpEarned} XP</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '22px' }}>🪙</span>
              <span style={{ fontSize: '18px', fontWeight: '900', color: '#78350F' }}>+{gameCompleteData.coinsEarned} Coins</span>
            </div>
          </div>

          {/* WORKFLOW PIPELINE INDICATOR */}
          <div style={{ background: '#F1F5F9', borderRadius: '12px', padding: '10px', fontSize: '11px', fontWeight: '800', color: '#475569', marginBottom: '24px' }}>
            ✅ GAME COMPLETE → ✅ XP REWARD → ✅ QUEST UPDATE → ✅ ROADMAP UPDATE
          </div>

          {/* ACTION BUTTONS */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setGameMode('library')}
              style={{ flex: 1, padding: '12px', borderRadius: '12px', background: '#F1F5F9', border: 'none', fontWeight: '800', color: '#64748B', cursor: 'pointer' }}
            >
              Games Hub
            </button>
            <button
              type="button"
              onClick={() => navigate('/student/roadmap')}
              style={{ flex: 2, padding: '12px', borderRadius: '12px', background: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)', color: 'white', border: 'none', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              View Roadmap Map <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamesPage;

import React, { useState } from 'react';
import { Star, Lock, Check, Sparkles, Bot, Trophy, Award, Compass, Zap, Play } from 'lucide-react';
import soundFX from '../../utils/audioFX';
import ChampionRewardModal from './ChampionRewardModal';
import TopicQuizModal from './TopicQuizModal';

export const RPGGameMap = ({ chapters, activeSubject, activeGrade, onSelectChapter, isOdia, onOpenAI, profile }) => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [particles, setParticles] = useState([]);

  // 5-Question Challenge Quiz state
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [activeChapterQuiz, setActiveChapterQuiz] = useState(null);

  // Champion Reward Modal state
  const [rewardModalOpen, setRewardModalOpen] = useState(false);
  const [selectedRewardLevel, setSelectedRewardLevel] = useState(1);
  const [selectedLevelTitle, setSelectedLevelTitle] = useState('Fundamentals Mastered');

  // Exact 5-step node positions matching Reference Image 2
  const nodePositions = [
    { left: '16%', top: '78%' }, // Step 1 (Bottom Left)
    { left: '72%', top: '63%' }, // Step 2 (Lower Right)
    { left: '32%', top: '38%' }, // Step 3 (Center Teal Cavern)
    { left: '30%', top: '16%' }, // Step 4 (Upper Left Purple Ruins)
    { left: '74%', top: '6%' }   // Step 5 (Top Right Magical Star Shrine)
  ];

  // Spawn magical gold star particles on node click
  const createParticles = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: e.clientX - rect.left + (Math.random() * 40 - 20),
      y: e.clientY - rect.top + (Math.random() * 40 - 20),
      size: Math.random() * 14 + 10,
      angle: (i * 45) * (Math.PI / 180)
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 800);
  };

  // Launch 5-Question Topic Challenge Modal on level click
  const handleNodeClick = (chapter, e) => {
    createParticles(e);
    setSelectedNodeId(chapter.id);
    setActiveChapterQuiz(chapter);
    setQuizModalOpen(true);
  };

  // When all 5 questions are submitted -> Trigger Champion Congratulations Modal!
  const handleQuizComplete = (score, total) => {
    setQuizModalOpen(false);
    if (activeChapterQuiz) {
      setSelectedRewardLevel(activeChapterQuiz.step || 1);
      setSelectedLevelTitle(isOdia ? activeChapterQuiz.titleOdia : activeChapterQuiz.title);
    }
    setRewardModalOpen(true);
  };

  const handleNodeHover = (chapterId) => {
    setHoveredNode(chapterId);
    if (chapterId) {
      soundFX.playHover();
    }
  };


  return (
    <div className="rpg-game-map-container fantasy-v2">
      {/* 850PX HIGH SCROLLABLE FANTASY MAP CANVAS */}
      <div className="map-canvas-v2 chess-kids-theme">

        {/* ------------------------------------------------------------- */}
        {/* 1. TERRAIN BACKGROUND GRADIENTS & FLOATING ASSETS             */}
        {/* ------------------------------------------------------------- */}
        <div className="terrain-bg-layer">
          <div className="zone-top-purple">
            <div className="cloud-float-slow" style={{ top: '20px', left: '10%', width: '120px', height: '35px', opacity: 0.15 }}></div>
            <div className="cloud-float-slow" style={{ top: '60px', left: '50%', width: '180px', height: '45px', opacity: 0.12, animationDelay: '-8s' }}></div>
            <div className="cloud-float-slow" style={{ top: '110px', left: '80%', width: '140px', height: '40px', opacity: 0.1, animationDelay: '-15s' }}></div>
          </div>
          <div className="zone-middle-teal"></div>
          <div className="zone-bottom-green"></div>
        </div>

        {/* Floating Fireflies / Magical Orbs */}
        <div className="magic-firefly" style={{ left: '15%', top: '75%', animationDelay: '0s' }}></div>
        <div className="magic-firefly" style={{ left: '85%', top: '68%', animationDelay: '-1s' }}></div>
        <div className="magic-firefly" style={{ left: '45%', top: '45%', animationDelay: '-2.5s' }}></div>
        <div className="magic-firefly" style={{ left: '25%', top: '25%', animationDelay: '-0.8s' }}></div>
        <div className="magic-firefly" style={{ left: '70%', top: '15%', animationDelay: '-3.2s' }}></div>
        <div className="magic-firefly" style={{ left: '38%', top: '80%', animationDelay: '-1.8s' }}></div>

        {/* ------------------------------------------------------------- */}
        {/* COACH SPEECH BUBBLE AT TOP LEFT (MATCHING USER REFERENCE IMAGE) */}
        {/* ------------------------------------------------------------- */}
        <div className="chess-coach-banner">
          <div className="coach-avatar-circle">👨‍🏫</div>
          <div className="coach-speech-bubble-v3">
            {isOdia
              ? 'ପ୍ରତିଦିନ ସ୍ତର ସମ୍ପୂର୍ଣ୍ଣ କରିବା ଦ୍ୱାରା ନୂଆ ବ୍ୟାଜ୍ ଏବଂ ବୋନସ୍ ମୁଦ୍ରା (+100 COINS) ଅନଲକ୍ ହୁଏ!'
              : 'Completing daily levels unlocks champion trophies & bonus gold coins (+100 COINS)! Keep going!'}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2. ENVIRONMENT DECORATIVE ASSETS (COTTAGE, RUINS, CRYSTALS)   */}
        {/* ------------------------------------------------------------- */}
        
        {/* Bottom Right: Cozy Wooden Fantasy Cottage with Thatched Roof */}
        <div className="map-asset cottage-v2">
          <div className="cottage-roof-v2"></div>
          <div className="cottage-wall-v2">
            <div className="cottage-window-glow"></div>
            <div className="cottage-window-glow window-2"></div>
            <div className="cottage-door-v2"></div>
          </div>
          <div className="cottage-chimney">
            <div className="smoke-puff p1"></div>
            <div className="smoke-puff p2"></div>
          </div>
        </div>

        {/* Bottom Left & Right Bushes */}
        <div className="map-asset bush-cluster bush-left-bottom"></div>
        <div className="map-asset bush-cluster bush-right-bottom"></div>
        <div className="map-asset bush-cluster bush-mid-right"></div>

        {/* Giant Cyan 3D Crystal Spires */}
        <div className="map-asset crystal-spire-3d spire-1">
          <div className="facet f1"></div>
          <div className="facet f2"></div>
          <div className="facet f3"></div>
        </div>
        <div className="map-asset crystal-spire-3d spire-2">
          <div className="facet f1"></div>
          <div className="facet f2"></div>
          <div className="facet f3"></div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 4. DYNAMIC SVG COBBLESTONE ROADWAY PERFECTLY SNAP-ALIGNED     */}
        {/* ------------------------------------------------------------- */}
        <svg className="rpg-path-svg-v2" viewBox="0 0 1000 850" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pathGoldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FACC15" />
              <stop offset="50%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#CA8A04" />
            </linearGradient>
            <linearGradient id="pathActiveGlow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFB703" />
              <stop offset="100%" stopColor="#00E5FF" />
            </linearGradient>
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Path Base & Textures */}
          <path
            d="M 160 663 C 380 720, 680 620, 720 535 C 760 430, 500 330, 320 323 C 200 310, 220 180, 300 136 C 420 80, 600 55, 740 51"
            fill="none"
            stroke="#451A03"
            strokeWidth="56"
            strokeLinecap="round"
          />
          <path
            d="M 160 663 C 380 720, 680 620, 720 535 C 760 430, 500 330, 320 323 C 200 310, 220 180, 300 136 C 420 80, 600 55, 740 51"
            fill="none"
            stroke="url(#pathGoldGrad)"
            strokeWidth="42"
            strokeLinecap="round"
            strokeDasharray="14 6"
          />
          <path
            d="M 160 663 C 380 720, 680 620, 720 535 C 760 430, 500 330, 320 323 C 200 310, 220 180, 300 136 C 420 80, 600 55, 740 51"
            fill="none"
            stroke="#78350F"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="4 12"
          />
          <path
            d="M 160 663 C 380 720, 680 620, 720 535"
            fill="none"
            stroke="url(#pathActiveGlow)"
            strokeWidth="12"
            strokeLinecap="round"
            filter="url(#glowFilter)"
            className="path-animated-flow"
          />
        </svg>

        {/* ------------------------------------------------------------- */}
        {/* 5. ISOMETRIC WOODEN STUMP LEVEL NODES (CHESS KIDS STYLE)      */}
        {/* ------------------------------------------------------------- */}
        {chapters.map((chapter, idx) => {
          const pos = nodePositions[idx] || nodePositions[0];
          const isCompleted = chapter.status === 'completed';
          const isCurrent = chapter.status === 'current';
          const isLocked = chapter.status === 'locked';

          return (
            <div
              key={chapter.id}
              className={`rpg-node-v2 ${chapter.status} ${hoveredNode === chapter.id ? 'hovered' : ''}`}
              style={{ left: pos.left, top: pos.top }}
              onMouseEnter={() => handleNodeHover(chapter.id)}
              onMouseLeave={() => handleNodeHover(null)}
              onClick={(e) => handleNodeClick(chapter, e)}
            >
              {/* 3D floating island shadow base */}
              <div className="floating-island-base"></div>

              {/* STUDENT HERO AVATAR BOUNCING ON ACTIVE CHECKPOINT */}
              {isCurrent && profile && (
                <div className="hero-avatar-node-overlay">
                  <div className="hero-speech-bubble-mini">
                    <span>ACTIVE LEVEL</span>
                  </div>
                  <img
                    src={profile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt={profile.name}
                    className="hero-avatar-img-v2"
                  />
                  <div className="active-location-ring"></div>
                </div>
              )}

              {/* 3D GLOWING STAR / TROPHY BADGE */}
              <div className="node-star-3d-wrapper">
                {isCompleted && (
                  <div className="star-3d gold-glow">
                    <span className="star-symbol">🏆</span>
                    <div className="star-aura gold"></div>
                  </div>
                )}
                {isCurrent && (
                  <div className="star-3d active-cyan-glow">
                    <span className="star-symbol active">⭐</span>
                    <div className="star-aura cyan"></div>
                    <div className="pulse-beacon"></div>
                  </div>
                )}
                {isLocked && (
                  <div className="star-3d locked-dim">
                    <Lock size={22} className="lock-icon-v2" />
                    <div className="star-aura dark"></div>
                  </div>
                )}
              </div>

              {/* 3D ISOMETRIC WOODEN LOG STUMP WITH CARVED STEP NUMBERS */}
              <div className="wood-stump-3d">
                <div className="wood-ring-carving"></div>
                <span className="stump-step-number">{chapter.step}</span>
              </div>

              {/* NODE TITLE BADGE */}
              <div className="node-info-badge">
                {isCurrent && <span className="current-badge-pill">PLAY NOW</span>}
                <span className="node-title-text">
                  {isOdia ? chapter.titleOdia : chapter.title}
                </span>
                <span className="node-xp-badge">+{chapter.xp} XP</span>
              </div>

              {/* HOVER TOOLTIP CARD */}
              {hoveredNode === chapter.id && (
                <div className="node-hover-tooltip-v2">
                  <div className="tooltip-top-row">
                    <span className="tt-step">LEVEL {chapter.step}</span>
                    <span className={`tt-diff ${chapter.difficulty.toLowerCase()}`}>
                      {chapter.difficulty}
                    </span>
                  </div>
                  <h4 className="tt-title">{isOdia ? chapter.titleOdia : chapter.title}</h4>
                  <div className="tt-meta-row">
                    <span>⏱️ {chapter.time}</span>
                    <span>🪙 +100 Coins</span>
                  </div>
                  <p className="tt-status">
                    {isCompleted
                      ? '🏆 Completed! Click to view Champion Reward (+100 Coins)'
                      : isCurrent
                      ? '🚀 Active Level! Click to play'
                      : '🔒 Complete previous levels to unlock'}
                  </p>
                </div>
              )}

              {/* SPARKLE PARTICLES OVERLAY ON CLICK */}
              {particles.map((pt) => (
                <span
                  key={pt.id}
                  className="magic-click-particle"
                  style={{
                    left: pt.x,
                    top: pt.y,
                    width: pt.size,
                    height: pt.size
                  }}
                >
                  ⭐
                </span>
              ))}
            </div>
          );
        })}

        {/* ------------------------------------------------------------- */}
        {/* 6. BOTTOM PRIMARY ACTION BUTTON (MATCHING REFERENCE IMAGE)     */}
        {/* ------------------------------------------------------------- */}
        <div className="roadmap-bottom-action-bar">
          <button
            onClick={() => {
              const ch = chapters[0] || { step: 1, title: 'Fundamentals Mastered', titleOdia: 'ମୌଳିକ ସ୍ତର', xp: 50 };
              setActiveChapterQuiz(ch);
              setQuizModalOpen(true);
            }}
            className="big-solve-puzzles-btn"
          >
            <Play size={26} fill="white" />
            {isOdia ? 'ସ୍ତର ୧ ପ୍ରଶ୍ନୋତ୍ତର ଆରମ୍ଭ କରନ୍ତୁ' : 'START 5-QUESTION LEVEL 1 CHALLENGE'}
          </button>
        </div>

        {/* AI COMPANION MASCOT ON MAP */}
        <div className="rpg-mascot-guide-v2" onClick={onOpenAI} style={{ right: '3%', left: 'auto' }}>
          <div className="mascot-speech-bubble-v2">
            <span className="sparkle">✨</span>
            <p>
              {isOdia
                ? 'ନମସ୍କାର! ୫ଟି ପ୍ରଶ୍ନର ଉତ୍ତର ଦେଇ ସୁନା ମୁଦ୍ରା ଜିତନ୍ତୁ!'
                : 'Answer 5 topic questions to unlock Champion Trophy & Coins!'}
            </p>
          </div>
          <div className="mascot-avatar-v2">
            <Bot size={34} />
            <div className="online-beacon"></div>
          </div>
        </div>

      </div>

      {/* ── 5-QUESTION TOPIC CHALLENGE MODAL ───────────────────────── */}
      <TopicQuizModal
        isOpen={quizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        chapter={activeChapterQuiz}
        onCompleteAll={handleQuizComplete}
        isOdia={isOdia}
      />

      {/* ── CHAMPION REWARD MODAL WITH EXPLODING COIN SHOWER ───────── */}
      <ChampionRewardModal
        isOpen={rewardModalOpen}
        onClose={() => setRewardModalOpen(false)}
        levelNumber={selectedRewardLevel}
        levelTitle={selectedLevelTitle}
        isOdia={isOdia}
      />
    </div>
  );
};

export default RPGGameMap;

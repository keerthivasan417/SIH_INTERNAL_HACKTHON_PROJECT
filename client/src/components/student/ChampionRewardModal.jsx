import React, { useEffect, useState } from 'react';
import { Trophy, Coins, Sparkles, Star, Award, CheckCircle2 } from 'lucide-react';
import soundFX from '../../utils/audioFX';
import { useStudent } from '../../context/StudentContext';

export const ChampionRewardModal = ({ isOpen, onClose, levelNumber = 1, levelTitle = 'Fundamentals Mastered', isOdia }) => {
  const { awardXP } = useStudent();
  const [claimed, setClaimed] = useState(false);
  const [coinsList, setCoinsList] = useState([]);

  useEffect(() => {
    if (isOpen) {
      soundFX.playLevelComplete();
      setClaimed(false);

      // Generate 24 floating animated coin particles for the explosion effect
      const generated = Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 85 + 5}%`,
        delay: `${Math.random() * 0.6}s`,
        size: Math.random() * 16 + 20,
        speed: `${Math.random() * 1.5 + 1.5}s`
      }));
      setCoinsList(generated);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClaim = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (claimed) return;
    setClaimed(true);
    soundFX.playStarChime();
    try {
      if (awardXP) {
        await awardXP(150, `Level ${levelNumber} Champion Reward`, 100);
      }
    } catch (err) {
      console.error("Reward error:", err);
    }
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div className="champion-reward-overlay">
      {/* ── COIN SHOWER / EXPLOSION PARTICLES ────────────────────── */}
      <div className="coin-shower-container">
        {coinsList.map(coin => (
          <div
            key={coin.id}
            className="raining-gold-coin"
            style={{
              left: coin.left,
              animationDelay: coin.delay,
              fontSize: `${coin.size}px`,
              animationDuration: coin.speed
            }}
          >
            🪙
          </div>
        ))}
      </div>

      {/* ── MODAL CARD ───────────────────────────────────────────── */}
      <div className="champion-reward-card">
        {/* Glow backdrop */}
        <div className="trophy-glow-aura"></div>

        {/* 🏆 TROPHY HERO ART */}
        <div className="trophy-icon-wrapper">
          <div className="trophy-badge-ring">
            <Trophy size={68} className="trophy-golden-svg" />
          </div>
          <div className="sparkle-orbit s1">✨</div>
          <div className="sparkle-orbit s2">⭐</div>
          <div className="sparkle-orbit s3">🌟</div>
        </div>

        {/* HEADER TEXT */}
        <div className="champion-header-text">
          <span className="champion-tag-pill">
            🏆 {isOdia ? 'ସ୍ତର ସମ୍ପୂର୍ଣ୍ଣ ବିଜେତା' : `LEVEL ${levelNumber} CHAMPION!`}
          </span>
          <h2 className="champion-main-title">
            {isOdia ? 'ଅଭିନନ୍ଦନ! ଆପଣ ବିଜୟୀ!' : 'LEVEL COMPLETED!'}
          </h2>
          <p className="champion-sub-desc">
            {isOdia
              ? `ଆପଣ ସ୍ତର ${levelNumber} ସମ୍ପୂର୍ଣ୍ଣ କରିଛନ୍ତି: ${levelTitle}!`
              : `You crushed Level ${levelNumber}: ${levelTitle}! Collect your grand prize below.`}
          </p>
        </div>

        {/* REWARDS GRID BOX */}
        <div className="champion-rewards-grid">
          <div className="reward-item-pill coins">
            <div className="reward-icon-circle coin">🪙</div>
            <div className="reward-details">
              <span className="reward-amt">+100</span>
              <span className="reward-lbl">{isOdia ? 'ସୁନା ମୁଦ୍ରା' : 'Gold Coins'}</span>
            </div>
          </div>

          <div className="reward-item-pill xp">
            <div className="reward-icon-circle xp">⭐</div>
            <div className="reward-details">
              <span className="reward-amt">+150</span>
              <span className="reward-lbl">{isOdia ? 'ଏକ୍ସପି ପଏଣ୍ଟ' : 'XP Points'}</span>
            </div>
          </div>

          <div className="reward-item-pill badge">
            <div className="reward-icon-circle badge">🥇</div>
            <div className="reward-details">
              <span className="reward-amt">CHAMPION</span>
              <span className="reward-lbl">{isOdia ? 'ବ୍ୟାଜ ମିଳିଲା' : 'Level Badge'}</span>
            </div>
          </div>
        </div>

        {/* ACTION CLAIM BUTTON */}
        <button
          type="button"
          onClick={handleClaim}
          className={`claim-champion-btn ${claimed ? 'claimed' : ''}`}
        >
          {claimed ? (
            <>
              <CheckCircle2 size={20} />
              {isOdia ? 'ଦାବି ହୋଇଗଲା!' : 'REWARD CLAIMED!'}
            </>
          ) : (
            <>
              <Sparkles size={20} />
              {isOdia ? 'ପୁରସ୍କାର ସଂଗ୍ରହ କରନ୍ତୁ (+100 COINS)' : 'CLAIM CHAMPION REWARD (+100 COINS)'}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChampionRewardModal;

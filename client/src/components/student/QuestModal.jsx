import React from 'react';
import { X, Play, Trophy, Sparkles, BookOpen, Bot, CheckCircle, Clock, Zap, Target } from 'lucide-react';

export const QuestModal = ({ quest, chapter, onClose, onStartLesson, onOpenAI, onCompleteQuest, isOdia }) => {
  // Support both quest and chapter object format
  const activeItem = quest || chapter;
  if (!activeItem) return null;

  const isQuest = Boolean(quest || activeItem.current !== undefined);
  const title = isOdia ? (activeItem.titleOdia || activeItem.title) : activeItem.title;
  const description = isOdia ? (activeItem.descriptionOdia || activeItem.description || activeItem.concept) : (activeItem.description || activeItem.concept || 'Complete learning tasks to earn bonus rewards.');

  const isCompleted = activeItem.completed || activeItem.status === 'completed';
  const currentProgress = activeItem.current || (isCompleted ? 1 : 0);
  const targetProgress = activeItem.target || 1;
  const progressPercent = Math.min(100, Math.round((currentProgress / targetProgress) * 100));

  const questState = isCompleted ? 'completed' : currentProgress > 0 ? 'in_progress' : 'available';

  const xpReward = activeItem.xpReward || activeItem.xp || 20;
  const coinReward = activeItem.coinReward || activeItem.gems || 10;

  return (
    <div className="quest-modal-overlay" onClick={onClose}>
      <div className="quest-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* MODAL HEADER */}
        <div className="quest-modal-header">
          <div className="step-tag-pill">
            <Target size={14} /> {isQuest ? 'DAILY QUEST' : `STEP ${activeItem.step}`}
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <X size={20} />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="quest-modal-body">
          <div className="chapter-title-group" style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
            <h2 className="modal-chapter-title">{title}</h2>
            <span className={`diff-badge-pill ${questState}`}>
              {questState === 'completed'
                ? (isOdia ? 'ସମ୍ପୂର୍ଣ୍ଣ' : 'State: Completed')
                : questState === 'in_progress'
                ? (isOdia ? 'ଜାରି ରହିଛି' : 'State: In Progress')
                : (isOdia ? 'ଉପଲବ୍ଧ' : 'State: Available')}
            </span>
          </div>

          {/* REWARDS & STATS ROW */}
          <div className="quest-rewards-banner">
            <div className="reward-item">
              <span className="reward-icon">⚡</span>
              <div>
                <span className="reward-val">+{xpReward} XP</span>
                <span className="reward-lbl">{isOdia ? 'XP ପୁରସ୍କାର' : 'XP Reward'}</span>
              </div>
            </div>
            <div className="reward-item">
              <span className="reward-icon">🪙</span>
              <div>
                <span className="reward-val">+{coinReward} Coins</span>
                <span className="reward-lbl">{isOdia ? 'ମୁଦ୍ରା ପୁରସ୍କାର' : 'Coins'}</span>
              </div>
            </div>
            <div className="reward-item">
              <span className="reward-icon">🎯</span>
              <div>
                <span className="reward-val">{currentProgress}/{targetProgress}</span>
                <span className="reward-lbl">{isOdia ? 'ଅଗ୍ରଗତି' : 'Progress'}</span>
              </div>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div style={{ margin: '16px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700', marginBottom: '6px', color: '#475569' }}>
              <span>{isOdia ? 'ମିଶନ ଅଗ୍ରଗତି' : 'Mission Completion'}</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="progress-bar-bg" style={{ height: '10px', borderRadius: '5px', background: '#E2E8F0', overflow: 'hidden' }}>
              <div className="progress-bar-fill" style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #10B981 0%, #059669 100%)', transition: 'width 0.4s ease' }} />
            </div>
          </div>

          {/* CONCEPT OVERVIEW */}
          <div className="concept-overview-box">
            <h4 className="box-title">
              <BookOpen size={16} /> {isOdia ? 'ବିବରଣୀ ଓ ଲକ୍ଷ୍ୟ' : 'Quest Details'}
            </h4>
            <p className="concept-text">{description}</p>
          </div>

          {/* STATUS NOTIFICATION */}
          {isCompleted && (
            <div className="quest-status-banner completed" style={{ marginTop: '12px' }}>
              <CheckCircle size={18} />
              <span>{isOdia ? 'ଆପଣ ଏହି ଦୈନିକ ମିଶନ ସମ୍ପୂର୍ଣ୍ଣ କରିସାରିଛନ୍ତି!' : 'You have completed this daily quest! Excellent job!'}</span>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="quest-modal-footer">
          {onOpenAI && (
            <button onClick={onOpenAI} className="secondary-ai-btn">
              <Bot size={18} /> Ask AI Companion
            </button>
          )}

          {isCompleted ? (
            <button disabled className="primary-launch-btn disabled">
              <CheckCircle size={18} /> {isOdia ? 'ସମ୍ପୂର୍ଣ୍ଣ ହେଲା' : 'Completed'}
            </button>
          ) : (
            <button
              onClick={async () => {
                if (onCompleteQuest && quest) {
                  await onCompleteQuest(quest.id);
                  onClose();
                } else if (onStartLesson && chapter) {
                  onStartLesson(chapter);
                }
              }}
              className="primary-launch-btn"
            >
              <Play size={18} fill="currentColor" />
              {questState === 'in_progress'
                ? (isOdia ? 'ଦାବି କରନ୍ତୁ (+XP & Coins)' : 'Claim Reward (+XP & Coins)')
                : (isOdia ? 'ମିଶନ ଆରମ୍ଭ କରନ୍ତୁ' : 'Complete Quest')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestModal;

import React from 'react';
import { CheckCircle, Zap, Coins, Clock, Sparkles } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const QuestCard = ({ quest, onComplete, onOpenModal }) => {
  const { language, t } = useStudent();
  const isOdia = language === 'or';
  const progressPercent = Math.min(100, Math.round((quest.current / quest.target) * 100));

  const questState = quest.completed
    ? 'completed'
    : quest.current > 0
    ? 'in_progress'
    : 'available';

  return (
    <div
      className={`quest-card state-${questState} ${quest.completed ? 'quest-done' : ''}`}
      onClick={() => onOpenModal && onOpenModal(quest)}
      style={{ cursor: onOpenModal ? 'pointer' : 'default' }}
    >
      {/* HEADER ROW */}
      <div className="quest-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h4 className="quest-title">{isOdia ? quest.titleOdia : quest.title}</h4>
          <span className={`quest-state-pill ${questState}`}>
            {questState === 'completed'
              ? (isOdia ? 'ସମ୍ପୂର୍ଣ୍ଣ' : 'Completed')
              : questState === 'in_progress'
              ? (isOdia ? 'ଜାରି ରହିଛି' : 'In Progress')
              : (isOdia ? 'ଉପଲବ୍ଧ' : 'Available')}
          </span>
        </div>

        <div className="quest-rewards-badges" style={{ display: 'flex', gap: '6px' }}>
          <span className="quest-xp-badge">
            <Zap size={13} /> +{quest.xpReward} XP
          </span>
          {quest.coinReward && (
            <span className="quest-coin-badge" style={{ background: '#FEF3C7', color: '#D97706', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '3px' }}>
              🪙 +{quest.coinReward}
            </span>
          )}
        </div>
      </div>

      {/* DESCRIPTION */}
      {quest.description && (
        <p className="quest-desc-text" style={{ fontSize: '12px', color: '#64748B', margin: '4px 0 10px 0' }}>
          {isOdia ? quest.descriptionOdia : quest.description}
        </p>
      )}

      {/* PROGRESS BAR */}
      <div className="quest-progress-row">
        <div className="progress-bar-bg">
          <div className="progress-bar-fill quest-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <span className="quest-count">{quest.current}/{quest.target}</span>
      </div>

      {/* ACTION BUTTON */}
      <div className="quest-action-row" style={{ marginTop: '10px' }}>
        {quest.completed ? (
          <span className="quest-completed-tag">
            <CheckCircle size={16} /> {isOdia ? 'ସମ୍ପୂର୍ଣ୍ଣ ହେଲା' : 'Completed'}
          </span>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onComplete(quest.id);
            }}
            className="quest-claim-btn"
          >
            {questState === 'in_progress' ? (isOdia ? 'ଦାବି କରନ୍ତୁ' : 'Claim Reward') : (isOdia ? 'ଆରମ୍ଭ କରନ୍ତୁ' : 'Complete Quest')}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestCard;

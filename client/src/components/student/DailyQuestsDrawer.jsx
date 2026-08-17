import React from 'react';
import { X, Target, Trophy, Sparkles, Check, Zap } from 'lucide-react';

export const DailyQuestsDrawer = ({ isOpen, onClose, quests, onCompleteQuest, isOdia }) => {
  if (!isOpen) return null;

  return (
    <div className="rpg-drawer-overlay" onClick={onClose}>
      <div className="rpg-drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title">
            <Target size={22} className="title-icon" />
            <h2>{isOdia ? 'ଦୈନିକ କ୍ୱେଷ୍ଟ' : 'Daily Quests Hub'}</h2>
          </div>
          <button onClick={onClose} className="drawer-close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          <p className="drawer-sub">
            {isOdia
              ? 'ଦୈନିକ ଲକ୍ଷ୍ୟ ପୂରଣ କରି ଅଧିକ XP ଏବଂ ସୁନା ମୁଦ୍ରା ଜିତନ୍ତୁ!'
              : 'Complete daily learning missions to earn extra XP & gold coins!'}
          </p>

          <div className="drawer-quests-list">
            {quests.map((quest) => {
              const progressPct = Math.min(100, Math.round((quest.current / quest.target) * 100));
              const qState = quest.completed ? 'completed' : quest.current > 0 ? 'in_progress' : 'available';

              return (
                <div key={quest.id} className={`drawer-quest-card ${quest.completed ? 'completed' : ''}`}>
                  <div className="quest-top">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span className="quest-title-text">
                        {isOdia ? quest.titleOdia : quest.title}
                      </span>
                      {quest.description && (
                        <span style={{ fontSize: '11px', color: '#64748B' }}>
                          {isOdia ? quest.descriptionOdia : quest.description}
                        </span>
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                      <span className="quest-reward-tag">+{quest.xpReward} XP</span>
                      {quest.coinReward && (
                        <span style={{ background: '#FEF3C7', color: '#D97706', padding: '2px 6px', borderRadius: '8px', fontSize: '11px', fontWeight: '800' }}>
                          🪙 +{quest.coinReward}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="quest-progress-bar-wrap">
                    <div className="bar-bg">
                      <div className="bar-fill" style={{ width: `${progressPct}%` }}></div>
                    </div>
                    <span className="count-label">
                      {quest.current}/{quest.target}
                    </span>
                  </div>

                  <div className="quest-bottom">
                    {quest.completed ? (
                      <span className="completed-tag">
                        <Check size={14} /> {isOdia ? 'ସମ୍ପୂର୍ଣ୍ଣ' : 'Completed'}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onCompleteQuest(quest.id)}
                        className="claim-quest-btn"
                      >
                        {qState === 'in_progress' ? (isOdia ? 'ଦାବି କରନ୍ତୁ' : 'Claim Reward') : (isOdia ? 'ସମ୍ପୂର୍ଣ୍ଣ କରନ୍ତୁ' : 'Complete Quest')}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyQuestsDrawer;

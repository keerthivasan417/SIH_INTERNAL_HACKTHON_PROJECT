import React from 'react';
import { Swords, Trophy, CheckCircle, Clock, Zap, Crown, Flame, ShieldAlert } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const ChallengeCard = ({ challenge, onAccept }) => {
  const { language, t } = useStudent();
  const isOdia = language === 'or';

  const typeConfig = {
    daily: { color: '#3B82F6', bg: '#EFF6FF', icon: Flame, label: isOdia ? 'ଦୈନିକ ଆହ୍ବାନ' : 'Daily Challenge' },
    weekly: { color: '#8B5CF6', bg: '#F5F3FF', icon: Trophy, label: isOdia ? 'ସାପ୍ତାହିକ ଆହ୍ବାନ' : 'Weekly Challenge' },
    subject: { color: '#10B981', bg: '#ECFDF5', icon: Zap, label: isOdia ? 'ବିଷୟଗତ ଆହ୍ବାନ' : 'Subject Challenge' },
    boss: { color: '#EF4444', bg: '#FEF2F2', icon: ShieldAlert, label: isOdia ? 'ବସ୍ ଆହ୍ବାନ' : 'Boss Challenge' },
  };

  const config = typeConfig[challenge.type] || typeConfig.daily;
  const TypeIcon = config.icon;

  return (
    <div className={`challenge-card type-${challenge.type || 'daily'} ${challenge.status}`}>
      <div className="chal-header">
        <div className="challenger-info">
          <img src={challenge.challengerAvatar} alt={challenge.challengerName} className="challenger-avatar" />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h4 className="challenger-name">{challenge.challengerName}</h4>
              <span
                className="challenge-type-pill"
                style={{
                  background: config.bg,
                  color: config.color,
                  border: `1px solid ${config.color}40`,
                  fontSize: '10px',
                  fontWeight: '800',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px'
                }}
              >
                <TypeIcon size={11} /> {challenge.typeLabel || config.label}
              </span>
            </div>
            <span className="chal-time">{challenge.createdAt}</span>
          </div>
        </div>

        <div className="chal-rewards-group" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span className="chal-reward"><Trophy size={14} /> +{challenge.rewardXp} XP</span>
          {challenge.rewardCoins && (
            <span style={{ background: '#FEF3C7', color: '#D97706', padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '800' }}>
              🪙 +{challenge.rewardCoins}
            </span>
          )}
        </div>
      </div>

      <div className="chal-body">
        <h4 className="chal-topic">{isOdia ? challenge.topicOdia : challenge.topic}</h4>
        <span className="chal-sub-tag">{isOdia ? challenge.subjectOdia : challenge.subject}</span>
      </div>

      {challenge.status === 'pending' && (
        <div className="chal-actions">
          <button
            type="button"
            onClick={() => onAccept(challenge.id)}
            className="accept-chal-btn"
            style={{ background: config.color }}
          >
            <Swords size={16} />
            <span>{isOdia ? 'ଆହ୍ବାନ ଗ୍ରହଣ କରନ୍ତୁ' : 'Accept & Play Challenge'}</span>
          </button>
        </div>
      )}

      {challenge.status === 'completed' && (
        <div className="chal-results-row">
          <div className="score-box my-score">
            <span>You</span>
            <strong>{challenge.myScore}%</strong>
          </div>
          <span className="vs-tag">VS</span>
          <div className="score-box peer-score">
            <span>{challenge.challengerName.split(' ')[0]}</span>
            <strong>{challenge.peerScore}%</strong>
          </div>
          <div className={`winner-tag ${challenge.winner === 'me' ? 'won' : 'lost'}`}>
            {challenge.winner === 'me' ? '🎉 You Won!' : 'Good Match!'}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeCard;

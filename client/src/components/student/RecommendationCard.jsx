import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const RecommendationCard = ({ recommendation }) => {
  const { language, t } = useStudent();
  const navigate = useNavigate();
  const isOdia = language === 'or';

  if (!recommendation) return null;

  return (
    <div className="recommendation-card">
      <div className="rec-header">
        <div className="rec-badge">
          <Sparkles size={16} className="sparkle-icon" />
          <span>{t('aiRecommendations')}</span>
        </div>
        <span className="rec-xp"><Zap size={14} /> +{recommendation.xpReward} XP</span>
      </div>

      <h4 className="rec-title">{isOdia ? recommendation.titleOdia : recommendation.title}</h4>
      <p className="rec-reason">{isOdia ? recommendation.reasonOdia : recommendation.reason}</p>

      <button
        onClick={() => navigate(recommendation.targetUrl)}
        className="rec-action-btn"
      >
        <span>{isOdia ? recommendation.actionLabelOdia : recommendation.actionLabel}</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default RecommendationCard;

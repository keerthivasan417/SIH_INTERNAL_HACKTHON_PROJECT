import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const WeakTopicCard = ({ subject, weakTopics = [] }) => {
  const { language, t } = useStudent();
  const navigate = useNavigate();
  const isOdia = language === 'or';

  if (!weakTopics || weakTopics.length === 0) return null;

  return (
    <div className="weak-topic-card">
      <div className="weak-topic-header">
        <AlertCircle size={18} className="alert-icon" />
        <h4>{t('weakTopicsTitle')}</h4>
      </div>

      <div className="topic-chips-list">
        {weakTopics.map((topic, idx) => (
          <span key={idx} className="topic-chip">
            {topic}
          </span>
        ))}
      </div>

      <p className="weak-topic-msg">
        {isOdia
          ? 'କ୍ୱିଜ୍ ପ୍ରଦର୍ଶନ ଆଧାରରେ ଏହି ବିଷୟଗୁଡ଼ିକରେ ଅଭ୍ୟାସ ଆବଶ୍ୟକ।'
          : 'Based on quiz scores, these topics need a quick 5-min revision.'}
      </p>

      <button
        onClick={() => navigate('/student/lessons')}
        className="revision-btn"
      >
        <RefreshCw size={14} />
        <span>{t('revisionRecommended')}</span>
      </button>
    </div>
  );
};

export default WeakTopicCard;

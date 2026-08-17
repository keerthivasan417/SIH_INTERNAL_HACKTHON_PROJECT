import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, FlaskConical, BookOpen, Feather, Globe, Monitor, ChevronRight } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

const iconMap = {
  Calculator,
  FlaskConical,
  BookOpen,
  Feather,
  Globe,
  Monitor
};

export const SubjectCard = ({ subject }) => {
  const { language, t } = useStudent();
  const navigate = useNavigate();
  const isOdia = language === 'or';
  const IconComp = iconMap[subject.icon] || BookOpen;

  return (
    <div className="subject-card" style={{ borderColor: subject.color + '40' }}>
      <div className="subject-card-top">
        <div className="sub-icon-circle" style={{ backgroundColor: subject.lightColor, color: subject.color }}>
          <IconComp size={24} />
        </div>
        <div className="sub-header-meta">
          <h3 className="sub-title">{isOdia ? subject.nameOdia : subject.name}</h3>
          <span className="sub-topic-name">
            {isOdia ? subject.currentTopicOdia : subject.currentTopic}
          </span>
        </div>
      </div>

      <div className="subject-card-progress">
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${subject.progress}%`, backgroundColor: subject.color }}></div>
        </div>
        <div className="progress-stats-row">
          <span>{subject.progress}% Progress</span>
          <span>{subject.accuracy}% Accuracy</span>
        </div>
      </div>

      <div className="subject-card-actions">
        <button
          onClick={() => navigate(`/student/lessons?subject=${subject.id}`)}
          className="sub-btn"
          style={{ backgroundColor: subject.lightColor, color: subject.color }}
        >
          <span>{t('lessons')}</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default SubjectCard;

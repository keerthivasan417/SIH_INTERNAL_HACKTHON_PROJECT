import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Download, CheckCircle, Zap } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const LessonCard = ({ lesson }) => {
  const { language, t } = useStudent();
  const navigate = useNavigate();
  const isOdia = language === 'or';

  return (
    <div className={`lesson-card ${lesson.completed ? 'completed' : ''}`}>
      <div className="lesson-card-header">
        <div className="lesson-subject-tag">{isOdia ? lesson.subjectOdia : lesson.subject}</div>
        <div className="lesson-xp-tag"><Zap size={13} /> +{lesson.xpReward} XP</div>
      </div>

      <h4 className="lesson-title">{isOdia ? lesson.titleOdia : lesson.title}</h4>
      <p className="lesson-objective">{isOdia ? lesson.learningObjectiveOdia : lesson.learningObjective}</p>

      <div className="lesson-card-meta">
        <span className="meta-item"><Clock size={14} /> {lesson.duration}</span>
        {lesson.isDownloaded && (
          <span className="meta-item downloaded-tag"><Download size={14} /> {t('downloaded')}</span>
        )}
      </div>

      <div className="lesson-card-footer">
        <button
          onClick={() => navigate(`/student/lesson/${lesson.id}`)}
          className="open-lesson-btn"
        >
          {lesson.completed ? (
            <>
              <CheckCircle size={16} /> <span>{t('completed')} (Review)</span>
            </>
          ) : (
            <>
              <BookOpen size={16} /> <span>{t('startLesson')}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default LessonCard;

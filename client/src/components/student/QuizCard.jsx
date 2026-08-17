import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, Zap, ShieldCheck } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const QuizCard = ({ quiz }) => {
  const { language, t } = useStudent();
  const navigate = useNavigate();
  const isOdia = language === 'or';

  return (
    <div className="quiz-card">
      <div className="quiz-card-header">
        <span className="quiz-subject-badge">{isOdia ? quiz.subjectOdia : quiz.subject}</span>
        <span className="quiz-difficulty">{quiz.difficulty}</span>
      </div>

      <h4 className="quiz-title">{isOdia ? quiz.titleOdia : quiz.title}</h4>

      <div className="quiz-meta-row">
        <span><HelpCircle size={15} /> {quiz.totalQuestions} Questions</span>
        <span><Zap size={15} /> +{quiz.xpReward} XP</span>
      </div>

      <button
        onClick={() => navigate(`/student/quiz/${quiz.id}`)}
        className="start-quiz-btn"
      >
        <ShieldCheck size={16} />
        <span>{t('takeQuiz')}</span>
      </button>
    </div>
  );
};

export default QuizCard;

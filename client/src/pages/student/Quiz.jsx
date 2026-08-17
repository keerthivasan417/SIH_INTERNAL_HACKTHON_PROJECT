import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStudent } from '../../context/StudentContext';
import { quizApi } from '../../services/quizApi';
import soundFX from '../../utils/audioFX';
import { HelpCircle, Clock, ChevronRight, ChevronLeft, Send, Lightbulb } from 'lucide-react';

export const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { language, t, completeQuizAction } = useStudent();
  const isOdia = language === 'or';

  const [quiz, setQuiz] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showHint, setShowHint] = useState(false);
  const [secondsSpent, setSecondsSpent] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    quizApi.getQuizById(quizId).then(setQuiz);

    const timer = setInterval(() => {
      setSecondsSpent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [quizId]);

  if (!quiz) return <div className="loading-state">{t('loading')}</div>;

  const currentQ = quiz.questions[currentIdx];
  const progressPercent = Math.round(((currentIdx + 1) / quiz.questions.length) * 100);

  const handleSelectOption = (optIdx) => {
    setUserAnswers({ ...userAnswers, [currentIdx]: optIdx });
  };

  const handleSubmitQuiz = async () => {
    setSubmitting(true);
    try {
      const attempt = await quizApi.submitQuiz(quiz.id, userAnswers, secondsSpent);
      // ── Notify unified context: updates XP, quests, badges, leaderboard ──
      await completeQuizAction(
        quiz.id,
        attempt.correctCount,
        quiz.questions.length,
        attempt.xpGained || 50
      );
      soundFX.playStarChime();
      navigate(`/student/quiz-result/${attempt.attemptId}`);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="quiz-page">
      {/* QUIZ HEADER */}
      <div className="quiz-top-bar">
        <div>
          <span className="quiz-subject-tag">{isOdia ? quiz.subjectOdia : quiz.subject}</span>
          <h2 className="quiz-active-title">{isOdia ? quiz.titleOdia : quiz.title}</h2>
        </div>

        <div className="quiz-timer-pill">
          <Clock size={16} />
          <span>{Math.floor(secondsSpent / 60)}:{(secondsSpent % 60).toString().padStart(2, '0')}</span>
        </div>
      </div>

      {/* QUESTION PROGRESS BAR */}
      <div className="quiz-progress-section">
        <div className="progress-bar-bg">
          <div className="progress-bar-fill quiz-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <div className="quiz-progress-text">
          <span>Question {currentIdx + 1} of {quiz.questions.length}</span>
          <span>{progressPercent}% Complete</span>
        </div>
      </div>

      {/* QUESTION CARD */}
      <div className="quiz-question-card">
        <h3 className="q-text">
          {isOdia ? currentQ.questionOdia : currentQ.question}
        </h3>

        {/* OPTIONS */}
        <div className="quiz-options-list">
          {currentQ.options.map((optionText, oIdx) => {
            const isSelected = userAnswers[currentIdx] === oIdx;
            return (
              <button
                key={oIdx}
                onClick={() => handleSelectOption(oIdx)}
                className={`quiz-option-btn ${isSelected ? 'selected' : ''}`}
              >
                <span className="opt-letter">{String.fromCharCode(65 + oIdx)}.</span>
                <span className="opt-label">{optionText}</span>
              </button>
            );
          })}
        </div>

        {/* HINT BUTTON */}
        <div className="hint-section">
          <button onClick={() => setShowHint(!showHint)} className="hint-btn">
            <Lightbulb size={16} />
            <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
          </button>
          {showHint && (
            <div className="hint-content">
              💡 Hint: Focus on the numerator (top number) vs denominator (bottom total).
            </div>
          )}
        </div>
      </div>

      {/* NAVIGATION CONTROLS */}
      <div className="quiz-nav-footer">
        <button
          disabled={currentIdx === 0}
          onClick={() => { setCurrentIdx(currentIdx - 1); setShowHint(false); }}
          className="quiz-prev-btn"
        >
          <ChevronLeft size={18} /> Previous
        </button>

        {currentIdx < quiz.questions.length - 1 ? (
          <button
            onClick={() => { setCurrentIdx(currentIdx + 1); setShowHint(false); }}
            className="quiz-next-btn"
          >
            Next <ChevronRight size={18} />
          </button>
        ) : (
          <button
            onClick={handleSubmitQuiz}
            disabled={submitting}
            className="quiz-submit-btn"
          >
            <Send size={18} /> {submitting ? 'Submitting...' : t('submitQuiz')}
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;

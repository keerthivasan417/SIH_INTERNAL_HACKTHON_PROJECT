import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStudent } from '../../context/StudentContext';
import { quizApi } from '../../services/quizApi';
import { Trophy, CheckCircle, XCircle, Zap, Sparkles, ArrowRight, RefreshCw, BookOpen, Clock, Target, Award } from 'lucide-react';

export const QuizResult = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const { language, t } = useStudent();
  const isOdia = language === 'or';

  const [attempt, setAttempt] = useState(null);

  useEffect(() => {
    quizApi.getAttemptById(attemptId).then(setAttempt);
  }, [attemptId]);

  if (!attempt) return <div className="loading-state">{t('loading')}</div>;

  const isPassed = attempt.scorePercentage >= 60;
  const wrongCount = attempt.totalQuestions - attempt.correctCount;
  const coinsEarned = Math.round(attempt.xpGained / 2);

  return (
    <div className="quiz-result-page" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* SCORE CARD */}
      <div className={`result-score-card ${isPassed ? 'passed' : 'failed'}`} style={{ background: '#FFFFFF', borderRadius: '24px', padding: '28px', border: '1px solid #E2E8F0', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
        <div className="trophy-icon-wrapper" style={{ fontSize: '56px', marginBottom: '10px' }}>
          {isPassed ? '🏆' : '🔄'}
        </div>

        <h1 className="score-percentage" style={{ fontSize: '36px', fontWeight: '900', color: isPassed ? '#10B981' : '#EF4444', margin: 0 }}>
          {attempt.scorePercentage}%
        </h1>
        <p className="score-subtitle" style={{ color: '#64748B', fontWeight: '700', marginTop: '6px' }}>
          {isPassed
            ? (isOdia ? 'ସମସ୍ତ ଅଭିନନ୍ଦନ! ଆପଣ କ୍ୱିଜ୍ ସଫଳତାର ସହ ପାସ୍ କରିଛନ୍ତି।' : 'Congratulations! Quiz Passed Successfully!')
            : (isOdia ? 'ପୁନର୍ବାର ପ୍ରଚେଷ୍ଟା କରନ୍ତୁ।' : 'Keep practicing to improve your score!')}
        </p>

        {/* PERFORMANCE STATS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', margin: '20px 0 10px 0' }}>
          <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#4F46E5' }}>{attempt.scorePercentage}%</div>
            <div style={{ fontSize: '10px', fontWeight: '800', color: '#64748B' }}>Score / Accuracy</div>
          </div>
          <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#D97706' }}>{attempt.timeSpentSeconds || 45}s</div>
            <div style={{ fontSize: '10px', fontWeight: '800', color: '#64748B' }}>Time Taken</div>
          </div>
          <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#10B981' }}>{attempt.correctCount} / {attempt.totalQuestions}</div>
            <div style={{ fontSize: '10px', fontWeight: '800', color: '#64748B' }}>Correct / Wrong ({wrongCount})</div>
          </div>
          <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#78350F' }}>+{attempt.xpGained} XP</div>
            <div style={{ fontSize: '10px', fontWeight: '800', color: '#64748B' }}>Coins (+{coinsEarned} 🪙)</div>
          </div>
        </div>
      </div>

      {/* PERFORMANCE ANALYSIS & ADAPTIVE RECOMMENDATION */}
      <div className="adaptive-recommendation-card" style={{ background: '#EEF2FF', border: '1px solid #C7D2FE', borderRadius: '20px', padding: '20px', marginBottom: '20px' }}>
        <div className="rec-header" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4F46E5', fontWeight: '900', marginBottom: '8px' }}>
          <Sparkles size={20} />
          <h3>🤖 PERFORMANCE ANALYSIS & ADAPTIVE ENGINE</h3>
        </div>
        <p className="rec-text" style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5', margin: '0 0 12px 0' }}>
          {isOdia ? attempt.adaptiveRecommendationOdia : attempt.adaptiveRecommendation}
        </p>
        <div className="diff-level-tag" style={{ fontSize: '12px', fontWeight: '800', color: '#4338CA' }}>
          Recommended Next Adjusted Difficulty: <strong>{attempt.newDifficultyLevel || 'Medium'}</strong>
        </div>
      </div>

      {/* QUESTION BY QUESTION REVIEW */}
      <div className="question-review-section" style={{ background: '#FFFFFF', borderRadius: '20px', padding: '20px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
        <h3 className="section-subtitle" style={{ fontSize: '16px', fontWeight: '900', color: '#0F172A', marginBottom: '14px' }}>
          📋 Question Review
        </h3>
        <div className="review-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {attempt.detailedResults.map((res, idx) => (
            <div key={idx} className={`review-item ${res.isCorrect ? 'correct' : 'incorrect'}`} style={{ padding: '14px', borderRadius: '14px', background: res.isCorrect ? '#ECFDF5' : '#FEF2F2', border: res.isCorrect ? '1px solid #A7F3D0' : '1px solid #FCA5A5' }}>
              <div className="item-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="q-num" style={{ fontWeight: '800', color: '#0F172A' }}>Q{idx + 1}.</span>
                {res.isCorrect ? (
                  <span className="res-tag correct" style={{ color: '#059669', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}><CheckCircle size={16} /> Correct</span>
                ) : (
                  <span className="res-tag incorrect" style={{ color: '#DC2626', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}><XCircle size={16} /> Incorrect</span>
                )}
              </div>
              <h4 className="q-title" style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B', margin: '0 0 6px 0' }}>
                {isOdia ? res.questionOdia : res.question}
              </h4>
              <p className="exp-text" style={{ fontSize: '12px', color: '#475569', margin: 0 }}>
                💡 <strong>Explanation:</strong> {isOdia ? res.explanationOdia : res.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="result-actions-footer" style={{ display: 'flex', gap: '12px' }}>
        <button onClick={() => navigate('/student/quiz/quiz_frac_01')} className="retake-btn" style={{ flex: 1, padding: '14px', borderRadius: '14px', background: '#F1F5F9', border: 'none', fontWeight: '800', color: '#64748B', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <RefreshCw size={18} /> Re-test Quiz
        </button>

        <button onClick={() => navigate('/student/roadmap')} className="continue-lesson-btn" style={{ flex: 2, padding: '14px', borderRadius: '14px', background: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)', color: 'white', border: 'none', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <BookOpen size={18} /> Back to Roadmap <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default QuizResult;

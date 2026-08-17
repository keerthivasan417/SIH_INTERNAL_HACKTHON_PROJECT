import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStudent } from '../../context/StudentContext';
import { studentApi } from '../../services/studentApi';
import { aiApi } from '../../services/aiApi';
import soundFX from '../../utils/audioFX';
import {
  Volume2,
  VolumeX,
  CheckCircle,
  HelpCircle,
  Sparkles,
  ArrowLeft,
  Zap,
  Download,
  BookOpen,
  Award
} from 'lucide-react';

export const LessonDetail = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { language, t, completeLessonAction, showNotification } = useStudent();
  const isOdia = language === 'or';

  const [lesson, setLesson] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedPracticeOption, setSelectedPracticeOption] = useState(null);
  const [practiceFeedback, setPracticeFeedback] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    studentApi.getLessonById(lessonId).then((data) => {
      setLesson(data);
      setCompleted(data?.completed || false);
    });
  }, [lessonId]);

  if (!lesson) return <div className="loading-state">{t('loading')}</div>;

  const handleAudioNarration = () => {
    if (isPlayingAudio) {
      aiApi.stopSpeech();
      setIsPlayingAudio(false);
    } else {
      const textToSpeak = isOdia
        ? `${lesson.titleOdia}. ${lesson.content.explanationOdia}`
        : `${lesson.title}. ${lesson.content.explanation}`;
      
      const success = aiApi.speakText(textToSpeak, isOdia ? 'or-IN' : 'en-US');
      if (success) {
        setIsPlayingAudio(true);
      } else {
        showNotification('Audio narration not supported on this browser version.', 'warning');
      }
    }
  };

  const handleCheckPractice = (index) => {
    setSelectedPracticeOption(index);
    if (index === lesson.practiceQuestion.correctAnswer) {
      setPracticeFeedback({ success: true, msg: isOdia ? 'ସଠିକ୍ ଉତ୍ତର! ଉତ୍ସାହଜନକ! 🎉' : 'Correct Answer! Great Job! 🎉' });
    } else {
      setPracticeFeedback({
        success: false,
        msg: isOdia ? `ଭୁଲ୍ ଉତ୍ତର। ସୂଚନା: ${lesson.practiceQuestion.hint}` : `Incorrect. Hint: ${lesson.practiceQuestion.hint}`
      });
    }
  };

  const handleMarkComplete = async () => {
    soundFX.playStarChime();
    // ── completeLessonAction cascades XP, quest, and badge updates ──
    await completeLessonAction(lesson.id, lesson.xpReward || 20);
    setCompleted(true);
  };

  return (
    <div className="lesson-detail-page">
      <button onClick={() => navigate(-1)} className="back-nav-btn">
        <ArrowLeft size={18} /> <span>Back</span>
      </button>

      {/* HEADER CARD */}
      <div className="lesson-header-card">
        <div className="lesson-meta-bar">
          <span className="sub-pill">{isOdia ? lesson.subjectOdia : lesson.subject}</span>
          <span className="diff-pill">{lesson.difficulty}</span>
          <span className="xp-pill"><Zap size={14} /> +{lesson.xpReward} XP</span>
        </div>

        <h1 className="lesson-main-title">{isOdia ? lesson.titleOdia : lesson.title}</h1>

        <div className="objective-box">
          <strong>🎯 Objective: </strong>
          <span>{isOdia ? lesson.learningObjectiveOdia : lesson.learningObjective}</span>
        </div>

        {/* Listen to Lesson Audio Button */}
        <button
          onClick={handleAudioNarration}
          className={`audio-listen-btn ${isPlayingAudio ? 'playing' : ''}`}
        >
          {isPlayingAudio ? <VolumeX size={20} /> : <Volume2 size={20} />}
          <span>{isPlayingAudio ? 'Stop Narration' : t('listenAudio')}</span>
        </button>
      </div>

      {/* EXPLANATION SECTION */}
      <div className="lesson-content-card">
        <h3 className="section-subtitle">📌 Explanation / ବ୍ୟାଖ୍ୟା</h3>
        <p className="explanation-text">
          {isOdia ? lesson.content.explanationOdia : lesson.content.explanation}
        </p>

        <div className="example-box">
          <h4 className="example-title">💡 Example:</h4>
          <p>{isOdia ? lesson.content.exampleOdia : lesson.content.example}</p>
        </div>

        {/* VISUAL EXPLANATION CANVAS */}
        {lesson.content.visualType === 'fraction-grid' && (
          <div className="visual-explanation-container">
            <h4 className="visual-title">🎨 Visual Model (3/4 Fraction)</h4>
            <div className="fraction-grid-model">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`fraction-cell ${i <= 3 ? 'shaded' : 'empty'}`}
                >
                  Part {i} {i <= 3 ? ' (3/4)' : ''}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* PRACTICE QUESTION SECTION */}
      <div className="practice-question-card">
        <h3 className="section-subtitle">✏️ Quick Practice / ଅଭ୍ୟାସ ପ୍ରଶ୍ନ</h3>
        <p className="practice-q">
          {isOdia ? lesson.practiceQuestion.questionOdia : lesson.practiceQuestion.question}
        </p>

        <div className="practice-options-grid">
          {lesson.practiceQuestion.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleCheckPractice(idx)}
              className={`practice-opt-btn ${selectedPracticeOption === idx ? 'selected' : ''}`}
            >
              {opt}
            </button>
          ))}
        </div>

        {practiceFeedback && (
          <div className={`practice-feedback-banner ${practiceFeedback.success ? 'success' : 'error'}`}>
            {practiceFeedback.msg}
          </div>
        )}
      </div>

      {/* FOOTER ACTIONS */}
      <div className="lesson-detail-footer">
        {completed ? (
          <div className="completed-banner">
            <CheckCircle size={22} />
            <span>Lesson Completed! You earned +{lesson.xpReward} XP!</span>
          </div>
        ) : (
          <button onClick={handleMarkComplete} className="complete-lesson-btn">
            <CheckCircle size={20} />
            <span>{t('markComplete')}</span>
          </button>
        )}

        <button
          onClick={() => navigate('/student/quiz/quiz_frac_01')}
          className="take-lesson-quiz-btn"
        >
          <HelpCircle size={18} />
          <span>{t('takeQuiz')}</span>
        </button>
      </div>
    </div>
  );
};

export default LessonDetail;

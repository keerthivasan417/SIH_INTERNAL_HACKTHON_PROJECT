import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../../context/StudentContext';
import { studentApi, MOCK_ROADMAP_TOPICS } from '../../services/studentApi';
import RPGGameMap from '../../components/student/RPGGameMap';
import QuestModal from '../../components/student/QuestModal';
import LessonCard from '../../components/student/LessonCard';
import {
  GRADE_OPTIONS,
  SUBJECT_OPTIONS,
  MAP_CHAPTERS_DATA
} from '../../utils/gradeCurriculumData';
import { MapPin, Sparkles, Filter, Trophy } from 'lucide-react';
import soundFX from '../../utils/audioFX';

export const LearningRoadmap = () => {
  const { profile, language, t, subjects, completedLessons, awardXP } = useStudent();
  const navigate = useNavigate();
  const isOdia = language === 'or';

  const [activeGrade, setActiveGrade] = useState('class7');
  const [activeSubject, setActiveSubject] = useState('math');
  const [selectedChapter, setSelectedChapter] = useState(null);

  // Get chapters for active grade & subject from the MAP_CHAPTERS_DATA utility
  const currentGradeChapters =
    MAP_CHAPTERS_DATA[activeGrade]?.[activeSubject] ||
    MAP_CHAPTERS_DATA['class7']['math'];

  // Compute roadmap progress
  const completedCount = currentGradeChapters.filter(c => c.status === 'completed').length;
  const totalCount = currentGradeChapters.length;

  // Get the "recommended next" chapter
  const recommendedChapter = currentGradeChapters.find(c => c.status === 'current');

  // Count subjects by completion from context
  const currentSubjectData = subjects.find(s => s.id === activeSubject);

  const handleSelectChapter = (chapter) => {
    soundFX.playHover();
    setSelectedChapter(chapter);
  };

  const handleStartLesson = async (chapter) => {
    setSelectedChapter(null);
    soundFX.playWhoosh();
    if (chapter?.status === 'current') {
      await awardXP(chapter?.xpReward || 25, `Started: ${chapter?.title}`, 10);
    }
    navigate('/student/lesson/les_frac_101');
  };

  return (
    <div className="learning-roadmap-page-v2" style={{ padding: '16px', maxWidth: '1280px', margin: '0 auto' }}>

      {/* ── PAGE HEADER ─────────────────────────────────────── */}
      <div style={{ background: '#FFFFFF', padding: '20px 24px', borderRadius: '24px', marginBottom: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', border: '2px solid #F1F5F9' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              🗺️ {isOdia ? 'ସାହସିକ ଶିକ୍ଷଣ ମାନଚିତ୍ର' : 'FANTASY ADVENTURE ROADMAP'}
            </h1>
            <p style={{ fontSize: '13px', color: '#64748B', fontWeight: '600', marginTop: '6px' }}>
              {isOdia
                ? 'ଆପଣଙ୍କ ଶିକ୍ଷଣ ଯାତ୍ରା ଅନୁସରଣ କରି ନୂଆ ଅଧ୍ୟାୟ ଅନଲକ୍ କରନ୍ତୁ!'
                : 'Follow your RPG path, complete missions and unlock new topics!'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Progress badge */}
            <div style={{
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '16px',
              fontSize: '13px',
              fontWeight: '900',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 10px rgba(16,185,129,0.3)'
            }}>
              <Trophy size={14} />
              {completedCount} / {totalCount} {isOdia ? 'ବିଷୟ ସମ୍ପୂର୍ଣ' : 'Topics Done'}
            </div>

            <button
              onClick={() => navigate('/student/dashboard')}
              className="hero-btn-secondary"
              style={{ padding: '10px 18px', fontSize: '13px' }}
            >
              🏠 {isOdia ? 'ଘର' : 'Home'}
            </button>
          </div>
        </div>

        {/* Recommended Next pill */}
        {recommendedChapter && (
          <div style={{
            marginTop: '14px',
            background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
            border: '2px solid #A5B4FC',
            borderRadius: '14px',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13px',
            fontWeight: '700',
            color: '#4338CA'
          }}>
            <Sparkles size={16} />
            <span>
              {isOdia ? 'ପ୍ରସ୍ତାବିତ ପରବର୍ତ୍ତୀ:' : 'Recommended Next:'}
              {' '}<strong>{isOdia ? recommendedChapter.titleOdia : recommendedChapter.title}</strong>
              {' — '}{recommendedChapter.estimatedMinutes} mins • +{recommendedChapter.xpReward || 30} XP
            </span>
          </div>
        )}

        {/* Subject progress strip from context */}
        {currentSubjectData && (
          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748B' }}>
              {isOdia ? currentSubjectData.nameOdia : currentSubjectData.name}:
            </span>
            <div style={{ flex: 1, background: '#E2E8F0', borderRadius: '8px', height: '8px', overflow: 'hidden' }}>
              <div style={{ width: `${currentSubjectData.progress}%`, height: '100%', background: currentSubjectData.color, borderRadius: '8px', transition: 'width 0.4s ease' }} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '800', color: currentSubjectData.color }}>{currentSubjectData.progress}%</span>
          </div>
        )}

        {/* Grade selector */}
        <div className="grade-pills-scroll" style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {GRADE_OPTIONS.map(grade => (
            <button
              key={grade.id}
              onClick={() => { soundFX.playWhoosh(); setActiveGrade(grade.id); }}
              className={`grade-pill-btn ${activeGrade === grade.id ? 'active' : ''}`}
            >
              <span>{isOdia ? grade.labelOdia : grade.label}</span>
              {activeGrade === grade.id && <Sparkles size={12} />}
            </button>
          ))}
        </div>

        {/* Subject selector */}
        <div className="subject-pills-scroll" style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {SUBJECT_OPTIONS.map(sub => (
            <button
              key={sub.id}
              onClick={() => { soundFX.playHover(); setActiveSubject(sub.id); }}
              className={`subject-pill-btn ${activeSubject === sub.id ? 'active' : ''}`}
              style={{ '--sub-accent': sub.color, '--sub-light': sub.lightColor }}
            >
              <span>{isOdia ? sub.nameOdia : sub.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── RPG FANTASY MAP (existing component — not duplicated) ─── */}
      <RPGGameMap
        chapters={currentGradeChapters}
        activeSubject={activeSubject}
        activeGrade={activeGrade}
        onSelectChapter={handleSelectChapter}
        isOdia={isOdia}
        onOpenAI={() => navigate('/student/ai-buddy')}
        profile={profile}
      />

      {/* ── QUEST / CHAPTER DETAIL MODAL ─────────────────────────── */}
      <QuestModal
        isOpen={Boolean(selectedChapter)}
        chapter={selectedChapter}
        onClose={() => setSelectedChapter(null)}
        onStartLesson={() => handleStartLesson(selectedChapter)}
        isOdia={isOdia}
        onAskAI={() => {
          setSelectedChapter(null);
          navigate('/student/ai-buddy');
        }}
      />
    </div>
  );
};

export default LearningRoadmap;

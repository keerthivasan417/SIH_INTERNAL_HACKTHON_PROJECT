import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, Play } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

export const LearningCard = ({ lesson }) => {
  const { language, t, subjects } = useStudent();
  const navigate = useNavigate();
  const isOdia = language === 'or';

  if (!lesson) return null;

  const subjectData = subjects.find(s => s.id === lesson.subjectId) || {
    progress: 40,
    color: '#4F46E5'
  };

  return (
    <div className="learning-hero-card" style={{ padding: '20px', borderRadius: '24px', background: '#FFFFFF', border: '2px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
      <div className="card-top-tag" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span className="subject-pill" style={{ background: subjectData.color || '#4F46E5', color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '800' }}>
          {isOdia ? lesson.subjectOdia : lesson.subject}
        </span>
        <span className="xp-tag" style={{ color: '#059669', fontWeight: '800', fontSize: '13px' }}>
          +{lesson.xpReward} XP
        </span>
      </div>

      <div style={{ marginBottom: '8px' }}>
        <span style={{ fontSize: '11px', fontWeight: '900', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {isOdia ? 'ଅଧ୍ୟାୟ:' : 'Chapter:'} {isOdia ? lesson.chapterOdia || 'ଅଧ୍ୟାୟ ୧: ମୌଳିକ ଧାରଣା' : lesson.chapter || 'Chapter 1: Foundational Concepts'}
        </span>
      </div>

      <h3 className="hero-lesson-title" style={{ fontSize: '18px', fontWeight: '900', color: '#0F172A', margin: '0 0 8px 0', lineHeight: 1.3 }}>
        {isOdia ? lesson.titleOdia : lesson.title}
      </h3>

      <p className="hero-lesson-objective" style={{ fontSize: '13px', color: '#475569', margin: '0 0 16px 0', lineHeight: 1.4 }}>
        <strong>{isOdia ? 'ପ୍ରସଙ୍ଗ:' : 'Topic:'}</strong> {isOdia ? lesson.learningObjectiveOdia : lesson.learningObjective}
      </p>

      {/* Progress section */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '800', color: '#64748B', marginBottom: '6px' }}>
          <span>{isOdia ? 'ବିଷୟ ଅଗ୍ରଗତି' : 'Subject Progress'}</span>
          <span>{subjectData.progress}%</span>
        </div>
        <div style={{ background: '#E2E8F0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${subjectData.progress}%`, height: '100%', background: subjectData.color || '#4F46E5', borderRadius: '4px' }} />
        </div>
      </div>

      <div className="hero-card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="time-info" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', color: '#64748B' }}>
          <Clock size={16} />
          <span>{t('estimatedTime')}: {lesson.duration}</span>
        </div>
        <button
          onClick={() => navigate(`/student/lesson/${lesson.id}`)}
          className="continue-btn"
          style={{
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '16px',
            fontWeight: '900',
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(16,185,129,0.2)'
          }}
        >
          <Play size={14} fill="currentColor" />
          <span>{t('continueLearning')}</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default LearningCard;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../../context/StudentContext';
import soundFX from '../../utils/audioFX';
import { Target, Clock, CheckCircle2, Trophy, ArrowRight } from 'lucide-react';

export const AssessmentsPage = () => {
  const { language, profile } = useStudent();
  const navigate = useNavigate();
  const isOdia = language === 'or';

  const quizzes = [
    { id: 'quiz_1', title: isOdia ? 'ଗଣିତ ପରୀକ୍ଷା - ଭିନ୍ନସଂଖ୍ୟା' : 'Fractions Mastery Assessment', questions: 10, time: '15 mins', xp: 120, status: 'available' },
    { id: 'quiz_2', title: isOdia ? 'ବିଜ୍ଞାନ - ସୌରଜଗତ' : 'Solar System & Science Test', questions: 8, time: '10 mins', xp: 100, status: 'available' },
    { id: 'quiz_3', title: isOdia ? 'ଇଂରାଜୀ ବ୍ୟାକରଣ' : 'English Grammar Quiz', questions: 12, time: '12 mins', xp: 90, status: 'completed' }
  ];

  return (
    <div className="student-page-container" style={{ padding: '20px', maxWidth: '1280px', margin: '0 auto' }}>
      <div className="section-title-row" style={{ marginBottom: '24px' }}>
        <div>
          <h1 className="section-title-text" style={{ fontSize: '24px', fontWeight: '900', color: '#0F172A' }}>
            🎯 {isOdia ? 'ମୂଲ୍ୟାଙ୍କନ ଓ କୁଇଜ୍' : 'ASSESSMENTS & QUIZZES'}
          </h1>
          <p style={{ color: '#64748B', fontSize: '13px', fontWeight: '600', marginTop: '4px' }}>
            {isOdia ? 'ଆପଣଙ୍କର ଜ୍ଞାନ ପରୀକ୍ଷା କରନ୍ତୁ ଏବଂ ପୁରସ୍କାର ଜିତନ୍ତୁ!' : 'Test your subject knowledge with timed quizzes and earn report badges!'}
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {quizzes.map(q => (
          <div
            key={q.id}
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '20px',
              border: '2px solid #E2E8F0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#4F46E5', background: '#EEF2FF', padding: '4px 10px', borderRadius: '10px' }}>
                  {q.time}
                </span>
                <span className="star-xp-tag">⭐ +{q.xp} XP</span>
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: '900', color: '#0F172A', marginBottom: '6px' }}>{q.title}</h3>
              <p style={{ fontSize: '13px', color: '#64748B', fontWeight: '600' }}>{q.questions} Questions • Timed Challenge</p>
            </div>

            <button
              onClick={() => {
                soundFX.playWhoosh();
                navigate(`/student/quiz/${q.id}`);
              }}
              className="hero-btn-primary"
              style={{ marginTop: '20px', width: '100%', justifyContent: 'center', padding: '12px' }}
            >
              {isOdia ? 'ଆରମ୍ଭ କରନ୍ତୁ' : 'START ASSESSMENT'} <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentsPage;

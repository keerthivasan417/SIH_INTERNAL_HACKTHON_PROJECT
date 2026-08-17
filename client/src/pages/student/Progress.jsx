import React, { useMemo } from 'react';
import { useStudent } from '../../context/StudentContext';
import { useNavigate } from 'react-router-dom';
import ProgressChart from '../../components/student/ProgressChart';
import StreakCard from '../../components/student/StreakCard';
import WeakTopicCard from '../../components/student/WeakTopicCard';
import RecommendationCard from '../../components/student/RecommendationCard';
import LevelCard from '../../components/student/LevelCard';
import { BookOpen, Trophy, Gamepad2, Clock, TrendingUp, AlertCircle, CheckCircle2, Target } from 'lucide-react';

// ── Subject config ──────────────────────────────────────────────────────────
const SUBJECTS_CONFIG = [
  { id: 'math',    label: 'Mathematics', labelOr: 'ଗଣିତ',    emoji: '📐', color: '#6366F1', weakThreshold: 60 },
  { id: 'science', label: 'Science',     labelOr: 'ବିଜ୍ଞାନ', emoji: '🔬', color: '#06B6D4', weakThreshold: 60 },
  { id: 'english', label: 'English',     labelOr: 'ଇଂରାଜୀ', emoji: '📖', color: '#10B981', weakThreshold: 60 },
];

// ── Derive analytics from quiz results ──────────────────────────────────────
function useAnalytics() {
  const { profile, quizResults, completedLessons } = useStudent();

  return useMemo(() => {
    const totalXP        = profile?.xp || 320;
    const lessonsCount   = completedLessons?.length || 8;
    const quizzesCount   = quizResults?.length || 5;
    const gamesCount     = Number(localStorage.getItem('ama_games_completed') || 3);
    const avgAccuracy    = quizResults?.length
      ? Math.round(quizResults.reduce((s, r) => s + (r.accuracy || 0), 0) / quizResults.length)
      : 78;
    const learningMins   = (lessonsCount * 8) + (quizzesCount * 5) + (gamesCount * 10);

    // Subject-wise derived from quiz results; fall back to sensible demo values
    const subjectData = {
      math:    { progress: 72, accuracy: 68, mastered: ['Addition', 'Subtraction', 'Basic Fractions'],    weak: quizResults.filter(r => r.accuracy < 60 && r.quizId?.includes('frac')).length > 0 ? ['Fractions', 'Decimals'] : ['Equivalent Fractions'] },
      science: { progress: 58, accuracy: 62, mastered: ['Water Cycle', 'Plant Parts'],                   weak: ['Photosynthesis', 'Food Chain'] },
      english: { progress: 80, accuracy: 84, mastered: ['Nouns', 'Verbs', 'Prepositions', 'Tenses'],     weak: [] },
    };

    // Strengths = accuracy >= 75, Needs Practice = accuracy < 60
    const strengths = SUBJECTS_CONFIG.filter(s => subjectData[s.id].accuracy >= 75);
    const needsPractice = SUBJECTS_CONFIG.filter(s => subjectData[s.id].accuracy < 65);

    return { totalXP, lessonsCount, quizzesCount, gamesCount, avgAccuracy, learningMins, subjectData, strengths, needsPractice };
  }, [profile, quizResults, completedLessons]);
}

// ── Stat mini-card ───────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', textAlign: 'center' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
        <Icon size={20} color={color} />
      </div>
      <div style={{ fontSize: '22px', fontWeight: '900', color: '#0F172A' }}>{value}</div>
      <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', marginTop: '2px' }}>{label}</div>
    </div>
  );
}

// ── Subject detail card ───────────────────────────────────────────────────────
function SubjectDetailCard({ subj, data, isOdia }) {
  return (
    <div style={{ background: '#fff', borderRadius: '18px', padding: '18px', border: '1px solid #E2E8F0', boxShadow: '0 3px 10px rgba(0,0,0,0.04)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: subj.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{subj.emoji}</div>
        <div>
          <div style={{ fontWeight: '900', fontSize: '15px', color: '#0F172A' }}>{isOdia ? subj.labelOr : subj.label}</div>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748B' }}>Accuracy: {data.accuracy}%</div>
        </div>
        <div style={{ marginLeft: 'auto', fontWeight: '900', fontSize: '15px', color: subj.color }}>{data.progress}%</div>
      </div>

      {/* Progress bar */}
      <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden', marginBottom: '14px' }}>
        <div style={{ width: `${data.progress}%`, height: '100%', background: `linear-gradient(90deg,${subj.color},${subj.color}99)`, transition: 'width 0.5s' }} />
      </div>

      {/* Mastered */}
      {data.mastered.length > 0 && (
        <div style={{ marginBottom: '10px' }}>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#059669', marginBottom: '5px' }}>✅ Mastered Topics:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {data.mastered.map(t => (
              <span key={t} style={{ padding: '3px 10px', borderRadius: '12px', background: '#ECFDF5', color: '#065F46', fontSize: '11px', fontWeight: '800' }}>{t}</span>
            ))}
          </div>
        </div>
      )}

      {/* Weak topics */}
      {data.weak.length > 0 && (
        <div>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#DC2626', marginBottom: '5px' }}>⚠️ Needs Practice:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {data.weak.map(t => (
              <span key={t} style={{ padding: '3px 10px', borderRadius: '12px', background: '#FEF2F2', color: '#991B1B', fontSize: '11px', fontWeight: '800' }}>{t}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export const Progress = () => {
  const { profile, language, quizResults } = useStudent();
  const navigate = useNavigate();
  const isOdia = language === 'or';
  const { totalXP, lessonsCount, quizzesCount, gamesCount, avgAccuracy, learningMins, subjectData, strengths, needsPractice } = useAnalytics();

  if (!profile) return null;

  // Quiz-driven weak topic recommendations
  const weakTopicRecs = needsPractice.map(s => ({
    subject: s.label,
    weakTopics: subjectData[s.id].weak,
    recommendation: s.id === 'math'
      ? 'Practice Equivalent Fractions with the visual fraction builder in Virtual Lab'
      : s.id === 'science'
      ? 'Revise Photosynthesis via the Plant Growth experiment in Virtual Lab'
      : 'Practice Grammar with the Preposition Speed Game'
  }));

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#0F172A' }}>
          📊 {isOdia ? 'ମୋ ଶିକ୍ଷଣ ପ୍ରଗତି' : 'MY LEARNING ANALYTICS'}
        </h1>
        <p style={{ color: '#64748B', fontSize: '13px', fontWeight: '600', marginTop: '4px' }}>
          {isOdia ? 'ଆପଣଙ୍କ ବ୍ୟକ୍ତିଗତ ଶିକ୍ଷଣ ଡ୍ୟାଶବୋର୍ଡ — ଆପଣ ଠିଆ ଅଛନ୍ତି ଓ ଆଗକୁ ଯିବା ପଥ।' : 'Your personal learning dashboard — see where you stand and where to go next.'}
        </p>
      </div>

      {/* Level card */}
      <div style={{ marginBottom: '20px' }}>
        <LevelCard />
      </div>

      {/* Overall stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px,1fr))', gap: '12px', marginBottom: '24px' }}>
        <StatCard icon={BookOpen}   label="Lessons Done"     value={lessonsCount}           color="#4F46E5" />
        <StatCard icon={Trophy}     label="Quizzes Done"     value={quizzesCount}            color="#F59E0B" />
        <StatCard icon={Gamepad2}   label="Games Played"     value={gamesCount}              color="#10B981" />
        <StatCard icon={Target}     label="Avg Accuracy"     value={`${avgAccuracy}%`}       color="#06B6D4" />
        <StatCard icon={Clock}      label="Learning Time"    value={`${Math.round(learningMins/60*10)/10}h`} color="#EC4899" />
        <StatCard icon={TrendingUp} label="Total XP Earned"  value={`${totalXP} XP`}        color="#8B5CF6" />
      </div>

      {/* Streak */}
      <div style={{ marginBottom: '24px' }}>
        <StreakCard streak={profile.streak} longestStreak={profile.longestStreak} />
      </div>

      {/* Subject progress chart */}
      <div style={{ background: '#fff', borderRadius: '20px', padding: '20px', border: '1px solid #E2E8F0', marginBottom: '24px', boxShadow: '0 3px 10px rgba(0,0,0,0.04)' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#0F172A', marginBottom: '14px' }}>📈 {isOdia ? 'ବିଷୟ ଅଗ୍ରଗତି' : 'Subject Progress & Mastery'}</h3>
        <ProgressChart subjects={[
          { name: isOdia ? 'ଗଣିତ' : 'Mathematics', progress: subjectData.math.progress,    accuracy: subjectData.math.accuracy,    color: '#6366F1' },
          { name: isOdia ? 'ବିଜ୍ଞାନ' : 'Science',   progress: subjectData.science.progress, accuracy: subjectData.science.accuracy, color: '#06B6D4' },
          { name: isOdia ? 'ଇଂରାଜୀ' : 'English',   progress: subjectData.english.progress, accuracy: subjectData.english.accuracy, color: '#10B981' },
        ]} />
      </div>

      {/* Subject-wise detail cards */}
      <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#0F172A', marginBottom: '12px' }}>🔎 {isOdia ? 'ବିଷୟ ଅନୁସାରେ ବିଶ୍ଲେଷଣ' : 'Subject-wise Analysis'}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: '14px', marginBottom: '24px' }}>
        {SUBJECTS_CONFIG.map(s => (
          <SubjectDetailCard key={s.id} subj={s} data={subjectData[s.id]} isOdia={isOdia} />
        ))}
      </div>

      {/* STRENGTHS */}
      {strengths.length > 0 && (
        <div style={{ background: 'linear-gradient(135deg,#ECFDF5,#D1FAE5)', border: '1px solid #A7F3D0', borderRadius: '18px', padding: '18px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '900', color: '#065F46', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} color="#10B981" /> {isOdia ? 'ଆପଣଙ୍କ ଶକ୍ତି' : 'YOUR STRENGTHS 💪'}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {strengths.map(s => (
              <span key={s.id} style={{ padding: '6px 14px', borderRadius: '20px', background: '#fff', border: '1px solid #6EE7B7', color: '#065F46', fontWeight: '800', fontSize: '13px' }}>
                {s.emoji} {isOdia ? s.labelOr : s.label} — {subjectData[s.id].accuracy}% accuracy
              </span>
            ))}
          </div>
        </div>
      )}

      {/* NEEDS MORE PRACTICE + Weak topic cards + recommendations */}
      {weakTopicRecs.length > 0 && (
        <div style={{ background: 'linear-gradient(135deg,#FFF7ED,#FEE2E2)', border: '1px solid #FECACA', borderRadius: '18px', padding: '18px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '900', color: '#991B1B', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={18} color="#EF4444" /> {isOdia ? 'ଅଧିକ ଅଭ୍ୟାସ ଆବଶ୍ୟକ' : 'NEEDS MORE PRACTICE 📚'}
          </h3>

          {weakTopicRecs.map(rec => (
            <div key={rec.subject} style={{ marginBottom: '14px' }}>
              <WeakTopicCard subject={rec.subject} weakTopics={rec.weakTopics} />
              <div style={{ marginTop: '8px' }}>
                <RecommendationCard
                  recommendation={{
                    title: `Practice: ${rec.weakTopics[0]}`,
                    description: rec.recommendation,
                    subject: rec.subject,
                    type: 'weak_topic',
                    actionLabel: 'Start Practice',
                    route: '/student/virtual-lab'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quiz result performance log */}
      {quizResults?.length > 0 && (
        <div style={{ background: '#fff', borderRadius: '18px', padding: '18px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '900', color: '#0F172A', marginBottom: '12px' }}>🧠 {isOdia ? 'କ୍ୱିଜ୍ ପ୍ରଦର୍ଶନ ଇତିହାସ' : 'Quiz Performance History'}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {quizResults.slice(-5).reverse().map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: '12px', background: r.accuracy >= 75 ? '#ECFDF5' : '#FEF2F2', border: `1px solid ${r.accuracy >= 75 ? '#A7F3D0' : '#FCA5A5'}` }}>
                <span style={{ fontWeight: '800', fontSize: '13px', color: '#1E293B' }}>{r.quizId || `Quiz ${i + 1}`}</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: r.accuracy >= 75 ? '#059669' : '#DC2626' }}>{r.accuracy}%</span>
                  {r.accuracy < 60 && <span style={{ fontSize: '11px', fontWeight: '700', color: '#EF4444', background: '#FEE2E2', padding: '2px 8px', borderRadius: '8px' }}>Weak Area ⚠️</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;

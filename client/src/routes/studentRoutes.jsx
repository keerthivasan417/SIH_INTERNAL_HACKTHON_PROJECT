import React from 'react';
import { Route } from 'react-router-dom';
import { BookOpen, Sparkles } from 'lucide-react';

function StudentPlaceholder({ title }) {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="pastel-card" style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'var(--teal-light)', color: 'var(--teal-primary)', marginBottom: '1rem' }}>
          <Sparkles size={32} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--teal-primary)' }}>Student Module: {title}</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          Gamified learning, quests, quizzes, and learning roadmaps (Managed by Priya).
        </p>
      </div>
    </div>
  );
}

export const studentRoutes = (
  <Route path="/student">
    <Route index element={<StudentPlaceholder title="Student Dashboard" />} />
    <Route path="roadmap" element={<StudentPlaceholder title="Roadmap" />} />
    <Route path="subjects" element={<StudentPlaceholder title="Subjects" />} />
    <Route path="lessons" element={<StudentPlaceholder title="Lessons" />} />
    <Route path="lesson-detail" element={<StudentPlaceholder title="Lesson Detail" />} />
    <Route path="quiz" element={<StudentPlaceholder title="Quiz" />} />
    <Route path="quiz-result" element={<StudentPlaceholder title="Quiz Result" />} />
    <Route path="progress" element={<StudentPlaceholder title="Progress" />} />
    <Route path="achievements" element={<StudentPlaceholder title="Achievements" />} />
    <Route path="leaderboard" element={<StudentPlaceholder title="Leaderboard" />} />
    <Route path="quests" element={<StudentPlaceholder title="Quests" />} />
    <Route path="peer-challenges" element={<StudentPlaceholder title="Peer Challenges" />} />
    <Route path="virtual-lab" element={<StudentPlaceholder title="Virtual Lab" />} />
    <Route path="ai-doubt" element={<StudentPlaceholder title="AI Doubt" />} />
    <Route path="profile" element={<StudentPlaceholder title="Student Profile" />} />
  </Route>
);

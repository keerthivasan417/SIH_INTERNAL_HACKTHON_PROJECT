import React from 'react';
import { Route } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

function TeacherPlaceholder({ title }) {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="pastel-card" style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'var(--pastel-green)', color: '#059669', marginBottom: '1rem' }}>
          <GraduationCap size={32} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#065f46' }}>Teacher Module: {title}</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          Teacher class logs, assignments, attendance, and performance (Managed by Renita).
        </p>
      </div>
    </div>
  );
}

export const teacherRoutes = (
  <Route path="/teacher">
    <Route index element={<TeacherPlaceholder title="Teacher Dashboard" />} />
    <Route path="classes" element={<TeacherPlaceholder title="Classes" />} />
    <Route path="students" element={<TeacherPlaceholder title="Students" />} />
    <Route path="student-detail" element={<TeacherPlaceholder title="Student Detail" />} />
    <Route path="assignments" element={<TeacherPlaceholder title="Assignments" />} />
    <Route path="create-assignment" element={<TeacherPlaceholder title="Create Assignment" />} />
    <Route path="attendance" element={<TeacherPlaceholder title="Attendance" />} />
    <Route path="quizzes" element={<TeacherPlaceholder title="Quizzes" />} />
    <Route path="create-quiz" element={<TeacherPlaceholder title="Create Quiz" />} />
    <Route path="performance" element={<TeacherPlaceholder title="Performance" />} />
    <Route path="risk-alerts" element={<TeacherPlaceholder title="Risk Alerts" />} />
    <Route path="resources" element={<TeacherPlaceholder title="Resources" />} />
    <Route path="profile" element={<TeacherPlaceholder title="Teacher Profile" />} />
  </Route>
);

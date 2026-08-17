import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { StudentProvider } from './context/StudentContext';
import StudentHeader from './components/student/StudentHeader';
import StudentBottomNav from './components/student/StudentBottomNav';
import AchievementPopup from './components/student/AchievementPopup';
import AIRobotCompanion from './components/student/AIRobotCompanion';
import NeuralBackground from './components/common/NeuralBackground';

// Landing Page
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import LearningRoadmap from './pages/student/LearningRoadmap';
import Subjects from './pages/student/Subjects';
import Lessons from './pages/student/Lessons';
import LessonDetail from './pages/student/LessonDetail';
import Quiz from './pages/student/Quiz';
import QuizResult from './pages/student/QuizResult';
import Progress from './pages/student/Progress';
import Achievements from './pages/student/Achievements';
import DailyQuests from './pages/student/DailyQuests';
import PeerChallenges from './pages/student/PeerChallenges';
import LeaderboardPage from './pages/student/LeaderboardPage';
import VirtualLab from './pages/student/VirtualLab';
import AIDoubtSolver from './pages/student/AIDoubtSolver';
import Profile from './pages/student/Profile';

// New Independent Student Feature Pages
import GamesPage from './pages/student/GamesPage';
import AssessmentsPage from './pages/student/AssessmentsPage';
import AIBuddyPage from './pages/student/AIBuddyPage';
import BackpackPage from './pages/student/BackpackPage';
import OfflineLearningPage from './pages/student/OfflineLearningPage';
import NotificationsPage from './pages/student/NotificationsPage';

const StudentLayout = () => (
  <StudentProvider>
    <div className="student-app-layout">
      <NeuralBackground nodeCount={80} connectDist={180} opacity={0.12} />
      <StudentHeader />
      <AchievementPopup />
      <AIRobotCompanion />
      <main className="student-main-content">
        <Routes>
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/roadmap" element={<LearningRoadmap />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lesson/:lessonId" element={<LessonDetail />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/assessments" element={<AssessmentsPage />} />
          <Route path="/quiz/:quizId" element={<Quiz />} />
          <Route path="/quiz-result/:attemptId" element={<QuizResult />} />
          <Route path="/ai-buddy" element={<AIBuddyPage />} />
          <Route path="/ai-doubt" element={<AIDoubtSolver />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/backpack" element={<BackpackPage />} />
          <Route path="/offline" element={<OfflineLearningPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/quests" element={<DailyQuests />} />
          <Route path="/challenges" element={<PeerChallenges />} />
          <Route path="/virtual-lab" element={<VirtualLab />} />
          <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
        </Routes>
      </main>
      <StudentBottomNav />
    </div>
  </StudentProvider>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/student/*" element={<StudentLayout />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

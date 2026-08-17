import { db } from '../config/firebase.js';

// Fallback in-memory arrays if Firestore is not available/enabled
const fallbackClasses = [
  { id: 'c1', className: '8-A', totalStudents: 15, subject: 'Mathematics' },
  { id: 'c2', className: '8-B', totalStudents: 17, subject: 'Science' }
];

const fallbackStudents = [
  {
    id: 's1',
    studentId: 'RE0801',
    name: 'Rahul Senapati',
    class: '8-A',
    attendanceRate: 72,
    avgQuizScore: 48,
    learningTimeHours: 12,
    improvementPercentage: -5,
    riskLevel: 'HIGH',
    subjectPerformance: { 'Mathematics': 42, 'Science': 58, 'English': 50, 'Social Science': 46 },
    topicMastery: [
      { subject: 'Mathematics', topicName: 'Fractions', masteryScore: 35, mistakeCount: 8, status: 'Weak' },
      { subject: 'Mathematics', topicName: 'Decimals', masteryScore: 48, mistakeCount: 5, status: 'Average' },
      { subject: 'Science', topicName: 'Electricity', masteryScore: 60, mistakeCount: 2, status: 'Average' }
    ],
    riskIndicators: [
      'Last 5 quizzes average below 50%',
      'Mathematics active learning sessions declining',
      'Inactive for 6 consecutive days',
      'Fractions topic mastery index at 35%'
    ],
    gamification: { xp: 120, level: 3, streak: 0, badges: ['First Attempt'] }
  },
  {
    id: 's2',
    studentId: 'RE0802',
    name: 'Priya Dharshini',
    class: '8-A',
    attendanceRate: 95,
    avgQuizScore: 88,
    learningTimeHours: 42,
    improvementPercentage: 18,
    riskLevel: 'LOW',
    subjectPerformance: { 'Mathematics': 92, 'Science': 86, 'English': 90, 'Social Science': 84 },
    topicMastery: [
      { subject: 'Mathematics', topicName: 'Fractions', masteryScore: 95, mistakeCount: 0, status: 'Strong' },
      { subject: 'Mathematics', topicName: 'Decimals', masteryScore: 88, mistakeCount: 1, status: 'Strong' },
      { subject: 'Science', topicName: 'Light', masteryScore: 86, mistakeCount: 1, status: 'Strong' }
    ],
    riskIndicators: [],
    gamification: { xp: 1450, level: 12, streak: 8, badges: ['Math Prodigy', 'Attendance Champion', 'Streak King'] }
  },
  {
    id: 's3',
    studentId: 'RE0803',
    name: 'Keerthivasan',
    class: '8-B',
    attendanceRate: 88,
    avgQuizScore: 68,
    learningTimeHours: 24,
    improvementPercentage: 8,
    riskLevel: 'MEDIUM',
    subjectPerformance: { 'Mathematics': 62, 'Science': 74, 'English': 65, 'Social Science': 71 },
    topicMastery: [
      { subject: 'Science', topicName: 'Electricity', masteryScore: 48, mistakeCount: 5, status: 'Weak' },
      { subject: 'Science', topicName: 'Light', masteryScore: 72, mistakeCount: 2, status: 'Average' },
      { subject: 'English', topicName: 'Grammar', masteryScore: 65, mistakeCount: 3, status: 'Average' }
    ],
    riskIndicators: [
      'Science average score declining in latest assessments',
      'Electricity repeated mistakes flagged'
    ],
    gamification: { xp: 480, level: 6, streak: 3, badges: ['Active Learner'] }
  }
];

const fallbackResources = [
  {
    id: 'res-1',
    title: 'Fractions Explanation Guide',
    description: 'Beginner study notes covering fraction addition, subtraction and multiplication.',
    class: '8',
    subject: 'Mathematics',
    topic: 'Fractions',
    language: 'English',
    type: 'document',
    createdBy: 'Renita Esther V',
    createdDate: '10/08/2026',
    fileUrl: '#'
  },
  {
    id: 'res-2',
    title: 'Electricity Audio Revision',
    description: 'Low-bandwidth Odia translation guide covering circuit types and current flow.',
    class: '8',
    subject: 'Science',
    topic: 'Electricity',
    language: 'Odia',
    type: 'audio',
    createdBy: 'Renita Esther V',
    createdDate: '12/08/2026',
    fileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  }
];

export const getDashboardData = async () => {
  let students = [...fallbackStudents];
  let classes = [...fallbackClasses];

  try {
    if (db) {
      const studentsSnapshot = await db.collection('students').get();
      const classesSnapshot = await db.collection('classes').get();

      if (!studentsSnapshot.empty) {
        students = [];
        studentsSnapshot.forEach(doc => {
          students.push({ id: doc.id, ...doc.data() });
        });
      }
      if (!classesSnapshot.empty) {
        classes = [];
        classesSnapshot.forEach(doc => {
          classes.push({ id: doc.id, ...doc.data() });
        });
      }
    }
  } catch (error) {
    console.warn('[Firebase] Dashboard read failed, using mock fallbacks:', error.message);
  }

  // Calculate dynamic stats
  const totalStudents = students.length;
  const totalClasses = classes.length;
  
  const avgAttendance = totalStudents > 0 
    ? Math.round(students.reduce((sum, s) => sum + (s.attendanceRate || 0), 0) / totalStudents)
    : 0;

  const avgQuizScore = totalStudents > 0
    ? Math.round(students.reduce((sum, s) => sum + (s.avgQuizScore || 0), 0) / totalStudents)
    : 0;

  const avgProgress = totalStudents > 0
    ? Math.round(students.reduce((sum, s) => sum + (s.learningTimeHours || 0), 0) / totalStudents * 2) 
    : 0;

  const studentsAtRisk = students.filter(s => s.riskLevel === 'HIGH').length;

  const activeLearners = students.filter(s => s.gamification && s.gamification.streak > 0).length;

  const atRiskDetails = students
    .filter(s => s.riskLevel !== 'LOW')
    .map(s => ({
      id: s.id,
      name: s.name,
      riskLevel: s.riskLevel,
      reason: (s.riskIndicators && s.riskIndicators[0]) || 'Requires study focus'
    }));

  // Average performance per subject
  const subjectPerformance = {
    'Mathematics': 65,
    'Science': 72,
    'English': 68,
    'Social Science': 67
  };

  if (totalStudents > 0) {
    const subjects = ['Mathematics', 'Science', 'English', 'Social Science'];
    subjects.forEach(sub => {
      let count = 0;
      let sum = 0;
      students.forEach(s => {
        if (s.subjectPerformance && s.subjectPerformance[sub] !== undefined) {
          sum += s.subjectPerformance[sub];
          count++;
        }
      });
      if (count > 0) {
        subjectPerformance[sub] = Math.round(sum / count);
      }
    });
  }

  // Dynamic AI Recommendations based on students' weak topics
  const aiRecommendations = [];
  students.forEach((s) => {
    if (s.riskLevel !== 'LOW' && s.topicMastery) {
      const weakTopic = s.topicMastery.find(t => t.status === 'Weak');
      if (weakTopic) {
        const lang = weakTopic.subject === 'Science' ? 'Odia' : 'English';
        aiRecommendations.push({
          id: `rec-${s.id}`,
          title: s.name,
          desc: `Assign ${weakTopic.topicName} Revision. Flagged due to mastery score of ${weakTopic.masteryScore}%.`,
          action: weakTopic.status === 'Weak' && lang === 'Odia' ? 'Deploy Audio Lesson' : 'Create Revision Module'
        });
      }
    }
  });

  if (aiRecommendations.length === 0) {
    aiRecommendations.push(
      { id: 'rec-1', title: 'Rahul Senapati', desc: 'Assign Fractions Beginner Revision.', action: 'Create Revision Module' },
      { id: 'rec-2', title: 'Keerthivasan', desc: 'Assign Electricity audio guide in Odia language.', action: 'Deploy Audio Lesson' }
    );
  }

  return {
    totalStudents,
    totalClasses,
    avgAttendance,
    avgQuizScore,
    avgProgress: avgProgress || 72,
    studentsAtRisk,
    assignmentCompletion: 78,
    avgLearningTime: totalStudents > 0 ? Math.round(students.reduce((sum, s) => sum + (s.learningTimeHours || 0), 0) / totalStudents) : 26,
    improvementRate: 7,
    activeLearners,
    subjectPerformance,
    recentQuizzes: [
      { studentId: 's1', studentName: 'Rahul Senapati', quizTitle: 'Fractions Basic Quiz', score: 45, date: '16/08/2026' },
      { studentId: 's2', studentName: 'Priya Dharshini', quizTitle: 'Fractions Basic Quiz', score: 95, date: '16/08/2026' },
      { studentId: 's3', studentName: 'Keerthivasan', quizTitle: 'Electricity Quiz 1', score: 68, date: '15/08/2026' }
    ],
    atRiskDetails,
    aiRecommendations
  };
};

export const getTeacherClassesList = async () => {
  try {
    if (db) {
      const snapshot = await db.collection('classes').get();
      if (!snapshot.empty) {
        const list = [];
        snapshot.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });
        return list;
      }
    }
  } catch (error) {
    console.warn('[Firebase] getTeacherClassesList failed, using mock fallbacks');
  }
  return fallbackClasses;
};

export const getStudentsList = async (filters = {}) => {
  try {
    if (db) {
      let query = db.collection('students');
      
      if (filters.class) {
        query = query.where('class', '==', filters.class);
      }
      if (filters.risk) {
        query = query.where('riskLevel', '==', filters.risk);
      }

      const snapshot = await query.get();
      if (!snapshot.empty) {
        const list = [];
        snapshot.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });
        return list;
      }
    }
  } catch (error) {
    console.warn('[Firebase] getStudentsList failed, using mock fallbacks');
  }

  // Filter mock fallback
  let list = [...fallbackStudents];
  if (filters.class) {
    list = list.filter(s => s.class === filters.class);
  }
  if (filters.risk) {
    list = list.filter(s => s.riskLevel === filters.risk);
  }
  return list;
};

export const getStudentDetailsById = async (id) => {
  try {
    if (db) {
      const doc = await db.collection('students').doc(id).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      }
    }
  } catch (error) {
    console.warn('[Firebase] getStudentDetailsById failed, using mock fallbacks');
  }
  return fallbackStudents.find(s => s.id === id) || null;
};

export const getResourcesList = async () => {
  try {
    if (db) {
      const snapshot = await db.collection('resources').get();
      if (!snapshot.empty) {
        const list = [];
        snapshot.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });
        return list;
      }
    }
  } catch (error) {
    console.warn('[Firebase] getResourcesList failed, using mock fallbacks');
  }
  return fallbackResources;
};

export const addResource = async (res) => {
  try {
    if (db) {
      const docRef = await db.collection('resources').add(res);
      return { id: docRef.id, ...res };
    }
  } catch (error) {
    console.warn('[Firebase] addResource failed, using in-memory mock save');
  }
  const newResource = { id: `res-${Date.now()}`, ...res };
  fallbackResources.unshift(newResource);
  return newResource;
};

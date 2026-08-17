import { db } from './firebase.js';

const classesData = [
  { className: '8-A', totalStudents: 15, subject: 'Mathematics' },
  { className: '8-B', totalStudents: 17, subject: 'Science' }
];

const studentsData = [
  {
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

const resourcesData = [
  {
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

export const seedDatabase = async () => {
  if (!db) {
    console.warn('[Seeder] Firestore instance is not initialized. Skipping seed.');
    return;
  }

  try {
    const studentsSnapshot = await db.collection('students').limit(1).get();
    if (!studentsSnapshot.empty) {
      console.log('[Seeder] Database is already seeded. Skipping.');
      return;
    }

    console.log('[Seeder] Seeding initial data to Firestore...');

    // Seed classes
    for (const cls of classesData) {
      const docRef = await db.collection('classes').add(cls);
      console.log(`[Seeder] Seeded class ${cls.className} with ID: ${docRef.id}`);
    }

    // Seed students
    for (const student of studentsData) {
      const docRef = await db.collection('students').add(student);
      console.log(`[Seeder] Seeded student ${student.name} with ID: ${docRef.id}`);
    }

    // Seed resources
    for (const resource of resourcesData) {
      const docRef = await db.collection('resources').add(resource);
      console.log(`[Seeder] Seeded resource "${resource.title}" with ID: ${docRef.id}`);
    }

    console.log('[Seeder] Seeding completed successfully!');
  } catch (error) {
    console.error('[Seeder] Error seeding database:', error);
  }
};

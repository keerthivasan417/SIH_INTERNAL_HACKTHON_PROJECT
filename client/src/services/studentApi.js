// Student API Service for Gamified Rural Learning Platform (Odisha)
// Supports Offline-First LocalStorage Caching & Remote Sync

const STORAGE_KEYS = {
  PROFILE: 'ama_siksha_student_profile',
  PROGRESS: 'ama_siksha_student_progress',
  ACHIEVEMENTS: 'ama_siksha_student_achievements',
  QUESTS: 'ama_siksha_daily_quests',
  CHALLENGES: 'ama_siksha_peer_challenges',
  OFFLINE_QUEUE: 'ama_siksha_sync_queue',
  DOWNLOADED_LESSONS: 'ama_siksha_downloaded_lessons'
};

// Initial Mock Student Profile
const INITIAL_STUDENT_PROFILE = {
  id: 'std_78921',
  name: 'Priya Dash',
  nameOdia: 'ପ୍ରିୟା ଦାଶ',
  rollNo: '24',
  grade: 'Class 7',
  school: 'Government High School, Koraput',
  district: 'Koraput',
  districtOdia: 'କୋରାପୁଟ',
  avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200',
  frame: 'Explorer Golden Ring',
  level: 3,
  xp: 320,
  xpToNextLevel: 450,
  streak: 5,
  longestStreak: 12,
  lastActiveDate: new Date().toISOString().split('T')[0],
  language: 'or', // 'or' for Odia, 'en' for English
  lowDataMode: false,
  audioNarration: true,
  theme: 'mint-light'
};

// Mock Subjects Data
export const MOCK_SUBJECTS = [
  {
    id: 'math',
    name: 'Mathematics',
    nameOdia: 'ଗଣିତ',
    icon: 'Calculator',
    color: '#4F46E5',
    lightColor: '#EEF2FF',
    completedLessons: 8,
    totalLessons: 12,
    progress: 67,
    accuracy: 82,
    currentTopic: 'Fractions & Decimals',
    currentTopicOdia: 'ଭଗ୍ନାଂଶ ଓ ଦଶମିକ',
    recommendedTopic: 'Fractions Beginner Revision',
    recommendedTopicOdia: 'ଭଗ୍ନାଂଶ ପ୍ରାରମ୍ଭିକ ପୁନରୀକ୍ଷଣ',
    weakTopics: ['Simplifying Fractions', 'Mixed Numbers']
  },
  {
    id: 'science',
    name: 'Science',
    nameOdia: 'ବିଜ୍ଞାନ',
    icon: 'FlaskConical',
    color: '#059669',
    lightColor: '#ECFDF5',
    completedLessons: 6,
    totalLessons: 10,
    progress: 60,
    accuracy: 75,
    currentTopic: 'Water Cycle & Atmosphere',
    currentTopicOdia: 'ଜଳ ଚକ୍ର ଓ ବାୟୁମଣ୍ଡଳ',
    recommendedTopic: 'Evaporation Experiment',
    recommendedTopicOdia: 'ବାଷ୍ପୀଭବନ ପରୀକ୍ଷଣ',
    weakTopics: ['Condensation Process']
  },
  {
    id: 'english',
    name: 'English',
    nameOdia: 'ଇଂରାଜୀ',
    icon: 'BookOpen',
    color: '#D97706',
    lightColor: '#FFFBEB',
    completedLessons: 9,
    totalLessons: 10,
    progress: 90,
    accuracy: 88,
    currentTopic: 'Grammar & Vocabulary',
    currentTopicOdia: 'ବ୍ୟାକରଣ ଓ ଶବ୍ଦକୋଷ',
    recommendedTopic: 'Active and Passive Voice',
    recommendedTopicOdia: 'ଆକ୍ଟିଭ୍ ଓ ପାସିଭ୍ ଭଏସ୍',
    weakTopics: ['Prepositions']
  },
  {
    id: 'odia',
    name: 'Odia Literature',
    nameOdia: 'ଓଡ଼ିଆ ସାହିତ୍ୟ',
    icon: 'Feather',
    color: '#DC2626',
    lightColor: '#FEF2F2',
    completedLessons: 10,
    totalLessons: 12,
    progress: 83,
    accuracy: 94,
    currentTopic: 'Utkala Gouraba Poetry',
    currentTopicOdia: 'ଉତ୍କଳ ଗୌରବ କବିତା',
    recommendedTopic: 'Bhakti Kabi Works',
    recommendedTopicOdia: 'ଭକ୍ତି କବିଙ୍କ ରଚନା',
    weakTopics: ['Chhanda Rules']
  },
  {
    id: 'social',
    name: 'Social Science',
    nameOdia: 'ସାମାଜିକ ବିଜ୍ଞାନ',
    icon: 'Globe',
    color: '#7C3AED',
    lightColor: '#F5F3FF',
    completedLessons: 5,
    totalLessons: 10,
    progress: 50,
    accuracy: 70,
    currentTopic: 'History of Odisha',
    currentTopicOdia: 'ଓଡ଼ିଶାର ଇତିହାସ',
    recommendedTopic: 'Kalinga War Heritage',
    recommendedTopicOdia: 'କଳିଙ୍ଗ ଯୁଦ୍ଧ ଐତିହ୍ୟ',
    weakTopics: ['Temple Architecture Dates']
  },
  {
    id: 'computer',
    name: 'Computer Literacy',
    nameOdia: 'କମ୍ପ୍ୟୁଟର ଶିକ୍ଷା',
    icon: 'Monitor',
    color: '#0284C7',
    lightColor: '#F0F9FF',
    completedLessons: 4,
    totalLessons: 8,
    progress: 50,
    accuracy: 85,
    currentTopic: 'Basics of Internet & Typing',
    currentTopicOdia: 'ଇଣ୍ଟରନେଟ୍ ଓ ଟାଇପିଂ ମୌଳିକ',
    recommendedTopic: 'Digital Safety for Students',
    recommendedTopicOdia: 'ଛାତ୍ରଛାତ୍ରୀଙ୍କ ପାଇଁ ଡିଜିଟାଲ୍ ସୁରକ୍ଷା',
    weakTopics: ['File Extensions']
  }
];

// Mock Learning Roadmap Topics
export const MOCK_ROADMAP_TOPICS = [
  {
    id: 'topic_1',
    subjectId: 'math',
    title: 'Natural Numbers & Operations',
    titleOdia: 'ଗଣନ ସଂଖ୍ୟା ଓ ପ୍ରକ୍ରିୟା',
    status: 'completed', // completed, current, locked
    score: 95,
    estimatedMinutes: 20,
    order: 1
  },
  {
    id: 'topic_2',
    subjectId: 'math',
    title: 'Fractions & Representation',
    titleOdia: 'ଭଗ୍ନାଂଶ ଓ ଏହାର ପ୍ରକାଶ',
    status: 'current',
    score: 65,
    estimatedMinutes: 25,
    order: 2
  },
  {
    id: 'topic_3',
    subjectId: 'math',
    title: 'Decimals & Percentage',
    titleOdia: 'ଦଶମିକ ଓ ଶତକଡ଼ା',
    status: 'locked',
    score: null,
    estimatedMinutes: 30,
    order: 3
  },
  {
    id: 'topic_4',
    subjectId: 'math',
    title: 'Algebraic Expressions',
    titleOdia: 'ବୀଜଗାଣିତିକ ଅଭେଦ',
    status: 'locked',
    score: null,
    estimatedMinutes: 35,
    order: 4
  },
  {
    id: 'topic_5',
    subjectId: 'math',
    title: 'Basic Geometry & Shapes',
    titleOdia: 'ମୌଳିକ ଜ୍ୟାମିତି ଓ ଆକୃତି',
    status: 'locked',
    score: null,
    estimatedMinutes: 40,
    order: 5
  }
];

// Mock Lessons List
export const MOCK_LESSONS = [
  {
    id: 'les_frac_101',
    subjectId: 'math',
    title: 'Understanding Fractions with Odisha Handloom Patterns',
    titleOdia: 'ସମ୍ବଲପୁରୀ ବୁଣା ଆକୃତି ମାଧ୍ୟମରେ ଭଗ୍ନାଂଶ ବୁଝିବା',
    subject: 'Mathematics',
    subjectOdia: 'ଗଣିତ',
    duration: '15 mins',
    xpReward: 20,
    difficulty: 'Beginner',
    isDownloaded: true,
    completed: false,
    learningObjective: 'Understand numerator and denominator using visual grid parts.',
    learningObjectiveOdia: 'ଦୃଶ୍ୟମାନ ଗ୍ରିଡ୍ ଅଂଶ ସାହାଯ୍ୟରେ ଲବ ଓ ହର ବୁଝିବା।',
    audioUrl: 'mock_audio_frac_101.mp3',
    content: {
      explanation: 'A fraction represents a part of a whole. When a Sambalpuri Saree border is divided into 4 equal sections and 3 sections are woven in red, the fraction of red is 3/4.',
      explanationOdia: 'ଭଗ୍ନାଂଶ ହେଉଛି ଏକ ସମ୍ପୂର୍ଣ୍ଣ ବସ୍ତୁର ଅଂଶ। ଯେତେବେଳେ ଗୋଟିଏ ସମ୍ବଲପୁରୀ ଲୁଗାର ଧାଡ଼ିକୁ ୪ଟି ସମାନ ଭାଗରେ ବିଭକ୍ତ କରାଯାଏ ଏବଂ ୩ଟି ଭାଗ ନାଲି ରଙ୍ଗରେ ବୁଣାଯାଏ, ସେତେବେଳେ ନାଲି ରଙ୍ଗର ଭଗ୍ନାଂଶ ହେଉଛି ୩/୪।',
      example: 'Example: 3 is the Numerator (Upper number), and 4 is the Denominator (Lower number).',
      exampleOdia: 'ଉଦାହରଣ: ୩ ହେଉଛି ଲବ (ଉପର ସଂଖ୍ୟା), ଏବଂ ୪ ହେଉଛି ହର (ତଳ ସଂଖ୍ୟା)।',
      visualType: 'fraction-grid',
      visualData: { totalParts: 4, shadedParts: 3 }
    },
    practiceQuestion: {
      question: 'If a Chapati is cut into 8 slices and Akash eats 3 slices, what fraction did he eat?',
      questionOdia: 'ଯଦି ଗୋଟିଏ ରୁଟିକୁ ୮ ଭାଗ କରାଯାଏ ଏବଂ ଆକାଶ ୩ ଭାଗ ଖାଏ, ତେବେ ସେ କେତେ ଭାଗ ଖାଇଲା?',
      options: ['3/8', '8/3', '5/8', '1/2'],
      correctAnswer: 0,
      hint: 'The top number is what Akash ate (3), bottom is total slices (8).'
    }
  },
  {
    id: 'les_water_201',
    subjectId: 'science',
    title: 'The Water Cycle in Odisha Monsoons',
    titleOdia: 'ଓଡ଼ିଶାର ବର୍ଷା ଦିନରେ ଜଳ ଚକ୍ରର ଭୂମିକା',
    subject: 'Science',
    subjectOdia: 'ବିଜ୍ଞାନ',
    duration: '18 mins',
    xpReward: 25,
    difficulty: 'Easy',
    isDownloaded: true,
    completed: true,
    learningObjective: 'Learn Evaporation, Condensation, and Precipitation.',
    learningObjectiveOdia: 'ବାଷ୍ପୀଭବନ, ଘନୀଭବନ, ଏବଂ ଅବକ୍ଷେପଣ ପ୍ରକ୍ରିୟା ଶିଖନ୍ତୁ।',
    audioUrl: 'mock_audio_water_201.mp3',
    content: {
      explanation: 'Sunlight heats water in Chilika lake. Water turns into vapor (Evaporation), forms clouds (Condensation), and rains down over Koraput hills (Precipitation).',
      explanationOdia: 'ସୂର୍ଯ୍ୟ କିରଣ ଚିଲିକା ହ୍ରଦର ଜଳକୁ ଉତ୍ତପ୍ତ କରେ। ଜଳ ବାଷ୍ପରେ ପରିଣତ ହୁଏ (ବାଷ୍ପୀଭବନ), ମେଘ ସୃଷ୍ଟି କରେ (ଘନୀଭବନ), ଏବଂ କୋରାପୁଟ ପାହାଡ଼ ଉପରେ ବର୍ଷା ହୋଇ ଝରେ (ଅବକ୍ଷେପଣ)।',
      example: 'Think of steam rising from hot rice in a village kitchen.',
      exampleOdia: 'ଗାଁ ରୋଷେଇ ଘରେ ଗରମ ଭାତରୁ ବାହାରୁଥିବା ଫୁଟନ୍ତା ବାଷ୍ପ ବିଷୟରେ ଭାବନ୍ତୁ।',
      visualType: 'water-cycle-diagram',
      visualData: { steps: ['Evaporation', 'Condensation', 'Precipitation', 'Collection'] }
    },
    practiceQuestion: {
      question: 'Which step turns liquid water into gas vapor when heated by the sun?',
      questionOdia: 'ସୂର୍ଯ୍ୟ ତାପରେ ଜଳ ବାଷ୍ପରେ ପରିଣତ ହେବା ପ୍ରକ୍ରିୟାକୁ କ’ଣ କୁହାଯାଏ?',
      options: ['Evaporation / ବାଷ୍ପୀଭବନ', 'Condensation / ଘନୀଭବନ', 'Freezing / ଜମାଟ ବାନ୍ଧିବା', 'Melting / ତରଳିବା'],
      correctAnswer: 0,
      hint: 'Think of water disappearing from a pond on a hot summer day.'
    }
  }
];

// Mock Badges (Phase 5 System)
export const MOCK_BADGES = [
  {
    id: 'b_first_lesson',
    name: 'First Lesson',
    nameOdia: 'ପ୍ରଥମ ପାଠ',
    description: 'Completed your very first lesson on Ama Siksha.',
    descriptionOdia: 'ଆମ ଶିକ୍ଷାରେ ପ୍ରଥମ ପାଠ ସମ୍ପୂର୍ଣ୍ଣ କଲେ।',
    icon: 'Footprints',
    color: '#10B981',
    status: 'unlocked', // locked, in_progress, unlocked
    unlocked: true,
    unlockedAt: '2026-08-10',
    progress: 1,
    target: 1
  },
  {
    id: 'b_7day_streak',
    name: '7-Day Streak',
    nameOdia: '୭-ଦିନିଆ ସ୍ଟ୍ରିକ୍',
    description: 'Maintained a continuous 7-day learning streak.',
    descriptionOdia: '୭ ଦିନ ନିରନ୍ତର ଶିକ୍ଷା ସ୍ଟ୍ରିକ୍ ରଖିଲେ।',
    icon: 'Flame',
    color: '#EF4444',
    status: 'in_progress',
    unlocked: false,
    unlockedAt: null,
    progress: 5,
    target: 7
  },
  {
    id: 'b_quiz_master',
    name: 'Quiz Master',
    nameOdia: 'କ୍ୱିଜ୍ ମାଷ୍ଟର',
    description: 'Score 90%+ in 5 quizzes.',
    descriptionOdia: '୫ଟି କ୍ୱିଜ୍‌ରେ ୯୦%+ ନମ୍ବର ରଖନ୍ତୁ।',
    icon: 'Award',
    color: '#8B5CF6',
    status: 'in_progress',
    unlocked: false,
    unlockedAt: null,
    progress: 2,
    target: 5
  },
  {
    id: 'b_math_explorer',
    name: 'Math Explorer',
    nameOdia: 'ଗଣିତ ଅନ୍ୱେଷକ',
    description: 'Completed 3 Mathematics lessons.',
    descriptionOdia: '୩ଟି ଗଣିତ ପାଠ ସମ୍ପୂର୍ଣ୍ଣ କଲେ।',
    icon: 'Calculator',
    color: '#6366F1',
    status: 'unlocked',
    unlocked: true,
    unlockedAt: '2026-08-15',
    progress: 3,
    target: 3
  },
  {
    id: 'b_young_scientist',
    name: 'Young Scientist',
    nameOdia: 'ଯୁବ ବିଜ୍ଞାନୀ',
    description: 'Complete 3 Science experiments or lessons.',
    descriptionOdia: '୩ଟି ବିଜ୍ଞାନ ପାଠ କିମ୍ବା ପରୀକ୍ଷା ସମ୍ପୂର୍ଣ୍ଣ କରନ୍ତୁ।',
    icon: 'Brain',
    color: '#06B6D4',
    status: 'in_progress',
    unlocked: false,
    unlockedAt: null,
    progress: 1,
    target: 3
  },
  {
    id: 'b_perfect_score',
    name: 'Perfect Score',
    nameOdia: 'ସମ୍ପୂର୍ଣ୍ଣ ନମ୍ବର (100%)',
    description: 'Scored 100% accuracy on any topic quiz.',
    descriptionOdia: 'କୌଣସି କ୍ୱିଜ୍‌ରେ ୧୦୦% ନମ୍ବର ହାସଲ କଲେ।',
    icon: 'Trophy',
    color: '#F59E0B',
    status: 'unlocked',
    unlocked: true,
    unlockedAt: '2026-08-16',
    progress: 1,
    target: 1
  },
  {
    id: 'b_speed_learner',
    name: 'Speed Learner',
    nameOdia: 'ଦ୍ରୁତ ଶିକ୍ଷାର୍ଥୀ',
    description: 'Finished a timed game under 45 seconds accurately.',
    descriptionOdia: '୪୫ ସେକେଣ୍ଡ ମଧ୍ୟରେ ଖେଳ ସମ୍ପୂର୍ଣ୍ଣ କଲେ।',
    icon: 'Zap',
    color: '#EC4899',
    status: 'locked',
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    target: 1
  },
  {
    id: 'b_subject_master',
    name: 'Subject Master',
    nameOdia: 'ବିଷୟ ମାଷ୍ଟର',
    description: 'Complete all chapter nodes of any subject roadmap.',
    descriptionOdia: 'କୌଣସି ବିଷୟର ସମସ୍ତ ଅଧ୍ୟାୟ ଶେଷ କରନ୍ତୁ।',
    icon: 'Crown',
    color: '#10B981',
    status: 'locked',
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    target: 1
  }
];

// Mock Daily Quests (Phase 3 System)
export const MOCK_DAILY_QUESTS = [
  {
    id: 'quest_science',
    title: 'Complete one Science lesson',
    titleOdia: 'ଗୋଟିଏ ବିଜ୍ଞାନ ପାଠ ସମ୍ପୂର୍ଣ୍ଣ କରନ୍ତୁ',
    description: 'Study and finish 1 interactive Science chapter on the fantasy map.',
    descriptionOdia: 'ମାନଚିତ୍ରରେ ୧ଟି ବିଜ୍ଞାନ ଅଧ୍ୟାୟ ଶେଷ କରନ୍ତୁ।',
    subject: 'Science',
    subjectOdia: 'ବିଜ୍ଞାନ',
    current: 0,
    target: 1,
    xpReward: 20,
    coinReward: 10,
    status: 'in_progress', // available, in_progress, completed
    completed: false
  },
  {
    id: 'quest_quiz',
    title: 'Complete one quiz',
    titleOdia: 'ଗୋଟିଏ କ୍ୱିଜ୍ ସମ୍ପୂର୍ଣ୍ଣ କରନ୍ତୁ',
    description: 'Solve any topic quiz with high accuracy.',
    descriptionOdia: 'କୌଣସି ଅଧ୍ୟାୟ କ୍ୱିଜ୍ ସଫଳତାର ସହ ଶେଷ କରନ୍ତୁ।',
    subject: 'Assessments',
    subjectOdia: 'ମୂଲ୍ୟାଙ୍କନ',
    current: 0,
    target: 1,
    xpReward: 30,
    coinReward: 15,
    status: 'available',
    completed: false
  },
  {
    id: 'quest_weak',
    title: 'Practice a weak topic',
    titleOdia: 'ଏକ ଦୁର୍ବଳ ପ୍ରସଙ୍ଗ ଅଭ୍ୟାସ କରନ୍ତୁ',
    description: 'Improve accuracy in recommended weak subject areas.',
    descriptionOdia: 'ଆପଣଙ୍କର ସୁପାରିଶ କରାଯାଇଥିବା ଦୁର୍ବଳ ପ୍ରସଙ୍ଗରେ ଅଭ୍ୟାସ କରନ୍ତୁ।',
    subject: 'Review',
    subjectOdia: 'ପୁନରୀକ୍ଷଣ',
    current: 0,
    target: 1,
    xpReward: 25,
    coinReward: 12,
    status: 'available',
    completed: false
  },
  {
    id: 'quest_game',
    title: 'Play one educational game',
    titleOdia: 'ଗୋଟିଏ ଶିକ୍ଷଣ ଖେଳ ଖେଳନ୍ତୁ',
    description: 'Play any fun learning minigame in the Games section.',
    descriptionOdia: 'ଗେମ୍ସ ବିଭାଗରେ କୌଣସି ଶିକ୍ଷଣ ଗେମ୍ ଖେଳନ୍ତୁ।',
    subject: 'Games',
    subjectOdia: 'ଖେଳ',
    current: 0,
    target: 1,
    xpReward: 20,
    coinReward: 10,
    status: 'available',
    completed: false
  }
];

// Mock Peer & System Challenges (Phase 3 Four Challenge Types)
export const MOCK_PEER_CHALLENGES = [
  {
    id: 'chal_daily_1',
    type: 'daily', // daily, weekly, subject, boss
    typeLabel: 'Daily Challenge',
    typeLabelOdia: 'ଦୈନିକ ଆହ୍ବାନ',
    challengerName: 'Daily Streak Master',
    challengerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    subject: 'Mathematics',
    subjectOdia: 'ଗଣିତ',
    topic: 'Solve 3 Rapid Math Questions',
    topicOdia: '୩ଟି ଦ୍ରୁତ ଗଣିତ ପ୍ରଶ୍ନର ଉତ୍ତର ଦିଅନ୍ତୁ',
    status: 'pending',
    rewardXp: 50,
    rewardCoins: 25,
    createdAt: 'Today, 09:00 AM'
  },
  {
    id: 'chal_weekly_1',
    type: 'weekly',
    typeLabel: 'Weekly Challenge',
    typeLabelOdia: 'ସାପ୍ତାହିକ ଆହ୍ବାନ',
    challengerName: 'Subhasree Mohanty',
    challengerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    subject: 'Science',
    subjectOdia: 'ବିଜ୍ଞାନ',
    topic: 'Score 80%+ in 3 Science Quizzes',
    topicOdia: '୩ଟି ବିଜ୍ଞାନ କ୍ୱିଜ୍‌ରେ ୮୦%+ ରଖନ୍ତୁ',
    status: 'pending',
    rewardXp: 120,
    rewardCoins: 50,
    createdAt: 'This Week'
  },
  {
    id: 'chal_subject_1',
    type: 'subject',
    typeLabel: 'Subject Challenge',
    typeLabelOdia: 'ବିଷୟଗତ ଆହ୍ବାନ',
    challengerName: 'Coach Akash',
    challengerAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=150',
    subject: 'English',
    subjectOdia: 'ଇଂରାଜୀ',
    topic: 'Master Grammar Prepositions',
    topicOdia: 'ବ୍ୟାକରଣ ପ୍ରିପୋଜିସନ୍ସ ମାଷ୍ଟର କରନ୍ତୁ',
    status: 'pending',
    rewardXp: 75,
    rewardCoins: 30,
    createdAt: 'Active'
  },
  {
    id: 'chal_boss_1',
    type: 'boss',
    typeLabel: 'Boss Challenge',
    typeLabelOdia: 'ବସ୍ ଆହ୍ବାନ',
    challengerName: 'Chapter 1 Monster Boss 👾',
    challengerAvatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=150',
    subject: 'All Subjects',
    subjectOdia: 'ସମସ୍ତ ବିଷୟ',
    topic: 'Defeat the Chapter 1 Final Boss Quiz',
    topicOdia: 'ଅଧ୍ୟାୟ ୧ ବସ୍ କ୍ୱିଜ୍ ପରାସ୍ତ କରନ୍ତୁ',
    status: 'pending',
    rewardXp: 200,
    rewardCoins: 100,
    createdAt: 'Boss Level'
  }
];

// Mock Leaderboard
export const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Subhasree Mohanty', school: 'GHS Koraput', level: 5, xp: 920, streak: 14, badgeCount: 8, isCurrentUser: false },
  { rank: 2, name: 'Priya Dash (You)', school: 'GHS Koraput', level: 3, xp: 320, streak: 5, badgeCount: 4, isCurrentUser: true },
  { rank: 3, name: 'Rohan Naik', school: 'GHS Koraput', level: 3, xp: 310, streak: 4, badgeCount: 3, isCurrentUser: false },
  { rank: 4, name: 'Aarav Pattnaik', school: 'GHS Koraput', level: 2, xp: 280, streak: 6, badgeCount: 3, isCurrentUser: false },
  { rank: 5, name: 'Deepa Sahu', school: 'GHS Koraput', level: 2, xp: 240, streak: 3, badgeCount: 2, isCurrentUser: false }
];

export const MOCK_MOST_IMPROVED = [
  { rank: 1, name: 'Priya Dash (You)', gain: '+28% Accuracy', level: 3, xp: 320, isCurrentUser: true },
  { rank: 2, name: 'Aarav Pattnaik', gain: '+22% Accuracy', level: 2, xp: 280, isCurrentUser: false },
  { rank: 3, name: 'Rohan Naik', gain: '+15% Accuracy', level: 3, xp: 310, isCurrentUser: false }
];

// Virtual Rewards Store
export const VIRTUAL_REWARDS_STORE = [
  {
    id: 'rew_frame_gold',
    name: 'Explorer Golden Ring',
    nameOdia: 'ସୁବର୍ଣ୍ଣ ଅନ୍ୱେଷକ ଫ୍ରେମ୍',
    type: 'frame',
    costXp: 200,
    unlocked: true,
    icon: 'Sparkles',
    previewColor: '#F59E0B'
  },
  {
    id: 'rew_frame_nature',
    name: 'Odisha Flora Frame',
    nameOdia: 'ଓଡ଼ିଶା ପ୍ରାକୃତିକ ଫ୍ରେମ୍',
    type: 'frame',
    costXp: 350,
    unlocked: false,
    icon: 'Leaf',
    previewColor: '#10B981'
  },
  {
    id: 'rew_avatar_sci',
    name: 'Junior Scientist Avatar',
    nameOdia: 'କନିଷ୍ଠ ବିଜ୍ଞାନୀ ଅବତାର',
    type: 'avatar',
    costXp: 400,
    unlocked: false,
    icon: 'Atom',
    previewColor: '#6366F1'
  },
  {
    id: 'rew_theme_pastel',
    name: 'Sunset Puri Theme',
    nameOdia: 'ସୂର୍ଯ୍ୟାସ୍ତ ପୁରୀ ଥିମ୍',
    type: 'theme',
    costXp: 500,
    unlocked: false,
    icon: 'Palette',
    previewColor: '#EC4899'
  }
];

// Helper Functions for Local Storage & Service Calls
export const studentApi = {
  // Get Student Profile
  getProfile: async () => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(INITIAL_STUDENT_PROFILE));
    return INITIAL_STUDENT_PROFILE;
  },

  // Save/Update Profile
  updateProfile: async (updatedData) => {
    const current = await studentApi.getProfile();
    const newProfile = { ...current, ...updatedData };
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newProfile));
    return newProfile;
  },

  // Award XP and Handle Level Up Calculation
  addXP: async (amount, reason) => {
    const profile = await studentApi.getProfile();
    const currentXp = Number(profile?.xp) || 0;
    const currentLevel = Number(profile?.level) || 1;
    let newXp = currentXp + (Number(amount) || 0);
    let newLevel = currentLevel;
    let leveledUp = false;

    // Level formula: Level 1 (0), Level 2 (100), Level 3 (250), Level 4 (450), Level 5 (700)
    const levelThresholds = [0, 100, 250, 450, 700, 1000, 1400, 1900];
    
    while (newLevel < levelThresholds.length && newXp >= levelThresholds[newLevel]) {
      newLevel++;
      leveledUp = true;
    }
    const xpToNext = levelThresholds[newLevel] || (newLevel * 300);

    const updated = await studentApi.updateProfile({
      xp: newXp,
      level: newLevel,
      xpToNextLevel: xpToNext,
      coins: (Number(profile?.coins) || 150)
    });

    return { updatedProfile: updated, leveledUp, xpGained: amount, reason };
  },

  // Get Subjects
  getSubjects: async () => {
    return MOCK_SUBJECTS;
  },

  // Get Roadmap Topics
  getRoadmap: async (subjectId = 'math') => {
    return MOCK_ROADMAP_TOPICS;
  },

  // Get Lessons List
  getLessons: async (subjectId = null) => {
    if (subjectId) {
      return MOCK_LESSONS.filter(l => l.subjectId === subjectId);
    }
    return MOCK_LESSONS;
  },

  // Get Single Lesson Detail
  getLessonById: async (lessonId) => {
    return MOCK_LESSONS.find(l => l.id === lessonId) || MOCK_LESSONS[0];
  },

  // Complete a Lesson
  completeLesson: async (lessonId) => {
    const lesson = MOCK_LESSONS.find(l => l.id === lessonId);
    const xpReward = lesson ? lesson.xpReward : 20;
    const xpResult = await studentApi.addXP(xpReward, 'Completed Lesson');
    
    // Save to completed local storage list
    const completedStr = localStorage.getItem('ama_siksha_completed_lessons') || '[]';
    const completed = JSON.parse(completedStr);
    if (!completed.includes(lessonId)) {
      completed.push(lessonId);
      localStorage.setItem('ama_siksha_completed_lessons', JSON.stringify(completed));
    }

    return { ...xpResult, lessonId };
  },

  // Get Badges
  getBadges: async () => {
    return MOCK_BADGES;
  },

  // Get Daily Quests
  getDailyQuests: async () => {
    const saved = localStorage.getItem(STORAGE_KEYS.QUESTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return MOCK_DAILY_QUESTS;
  },

  // Complete Quest
  completeQuest: async (questId) => {
    const quests = await studentApi.getDailyQuests();
    const updatedQuests = quests.map(q => {
      if (q.id === questId) {
        return { ...q, current: q.target, completed: true };
      }
      return q;
    });
    localStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify(updatedQuests));
    const targetQuest = quests.find(q => q.id === questId);
    const xpResult = await studentApi.addXP(targetQuest?.xpReward || 40, 'Daily Quest Completed');
    return { quests: updatedQuests, ...xpResult };
  },

  // Get Peer Challenges
  getPeerChallenges: async () => {
    return MOCK_PEER_CHALLENGES;
  },

  // Get Leaderboard
  getLeaderboard: async (type = 'top') => {
    if (type === 'improved') return MOCK_MOST_IMPROVED;
    return MOCK_LEADERBOARD;
  },

  // Get Store Items
  getVirtualRewards: async () => {
    return VIRTUAL_REWARDS_STORE;
  },

  // Purchase Reward
  buyVirtualReward: async (rewardId) => {
    const profile = await studentApi.getProfile();
    const item = VIRTUAL_REWARDS_STORE.find(r => r.id === rewardId);
    if (!item) throw new Error('Reward not found');
    if (profile.xp < item.costXp) {
      return { success: false, message: 'Not enough XP!' };
    }
    
    // Deduct XP and set frame or avatar
    const update = { xp: profile.xp - item.costXp };
    if (item.type === 'frame') update.frame = item.name;
    const updatedProfile = await studentApi.updateProfile(update);
    item.unlocked = true;

    return { success: true, updatedProfile, reward: item };
  },

  // Offline Sync Queue Management
  addToSyncQueue: (actionType, payload) => {
    const currentQueue = JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFLINE_QUEUE) || '[]');
    currentQueue.push({ id: 'sync_' + Date.now(), actionType, payload, timestamp: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify(currentQueue));
    return currentQueue;
  },

  getSyncQueue: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.OFFLINE_QUEUE) || '[]');
  },

  clearSyncQueue: () => {
    localStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify([]));
    return [];
  }
};

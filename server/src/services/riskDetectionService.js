import { getStudentsList } from './teacherService.js';

export const getDetections = async () => {
  const students = await getStudentsList();
  
  // Custom heuristics: Filter students with riskLevel HIGH or MEDIUM
  const warningList = students
    .filter(s => s.riskLevel !== 'LOW')
    .map((s, idx) => ({
      id: `alert-${idx}`,
      studentId: s.id,
      studentName: s.name,
      className: s.class,
      riskLevel: s.riskLevel,
      reasons: s.riskIndicators,
      weakTopics: s.topicMastery.filter(topic => topic.status === 'Weak').map(topic => topic.topicName),
      suggestedAction: s.riskLevel === 'HIGH' 
        ? 'Deploy immediate beginner revision module. Schedule physical mentoring slot.' 
        : 'Assign review task. Monitor performance trends in the next assessment.',
      flaggedDate: new Date(Date.now() - (idx + 1) * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')
    }));

  return warningList;
};

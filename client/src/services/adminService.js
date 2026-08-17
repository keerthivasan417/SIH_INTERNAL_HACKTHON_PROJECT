// Asynchronous Admin Service Layer for RuralEdu School Admin / Headmaster Modules
// Decoupled from UI components for smooth transition to Firebase/REST backend

import {
  SCHOOL_INFO,
  MOCK_CLASSES,
  MOCK_TEACHERS,
  MOCK_STUDENTS,
  MOCK_AT_RISK_RECORDS,
  MOCK_ATTENDANCE_SUMMARY,
  MOCK_PERFORMANCE_ANALYTICS,
} from './mockSchoolData';

// Local mutable copy for state interactions during session (e.g. updating intervention status)
let localAtRiskRecords = [...MOCK_AT_RISK_RECORDS];

const simulateLatency = (ms = 50) => new Promise((resolve) => setTimeout(resolve, ms));

export const adminService = {
  // 1. School Metadata
  async getSchoolInfo() {
    await simulateLatency();
    return { ...SCHOOL_INFO };
  },

  // 2. Student Directory & Search
  async getStudents(filters = {}) {
    await simulateLatency();
    const { grade = 'ALL', section = 'ALL', riskLevel = 'ALL', search = '' } = filters;

    return MOCK_STUDENTS.filter((student) => {
      // Grade filter
      if (grade !== 'ALL' && student.grade !== Number(grade)) {
        return false;
      }
      // Section filter
      if (section !== 'ALL' && student.section !== section) {
        return false;
      }
      // Risk filter
      if (riskLevel !== 'ALL' && student.riskLevel !== riskLevel) {
        return false;
      }
      // Search query (name, roll, or class)
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesName = student.name.toLowerCase().includes(query);
        const matchesRoll = student.rollNo.toLowerCase().includes(query);
        const matchesClass = student.className.toLowerCase().includes(query);
        if (!matchesName && !matchesRoll && !matchesClass) return false;
      }
      return true;
    });
  },

  async getStudentById(id) {
    await simulateLatency();
    const student = MOCK_STUDENTS.find((s) => s.id === id);
    if (!student) return null;

    // Attach risk diagnosis if available
    const riskRecord = localAtRiskRecords.find((r) => r.studentId === id);
    return {
      ...student,
      riskDiagnosis: riskRecord || null,
    };
  },

  // 3. Faculty / Teachers Management
  async getTeachers(filters = {}) {
    await simulateLatency();
    const { subject = 'ALL', status = 'ALL', search = '' } = filters;

    return MOCK_TEACHERS.filter((teacher) => {
      if (subject !== 'ALL' && teacher.primarySubject !== subject && teacher.secondarySubject !== subject) {
        return false;
      }
      if (status !== 'ALL' && teacher.status !== status) {
        return false;
      }
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesName = teacher.name.toLowerCase().includes(query);
        const matchesSubj = teacher.primarySubject.toLowerCase().includes(query);
        if (!matchesName && !matchesSubj) return false;
      }
      return true;
    });
  },

  async getTeacherById(id) {
    await simulateLatency();
    return MOCK_TEACHERS.find((t) => t.id === id) || null;
  },

  // 4. Class & Section Management
  async getClasses(gradeFilter = 'ALL') {
    await simulateLatency();
    if (gradeFilter === 'ALL') return [...MOCK_CLASSES];
    return MOCK_CLASSES.filter((c) => c.grade === Number(gradeFilter));
  },

  async getClassById(id) {
    await simulateLatency();
    const cls = MOCK_CLASSES.find((c) => c.id === id);
    if (!cls) return null;

    // Attach students belonging to this class
    const roster = MOCK_STUDENTS.filter((s) => s.className === cls.displayName);
    return {
      ...cls,
      roster,
    };
  },

  // 5. Attendance Analytics
  async getAttendanceSummary(dateRange = 'today') {
    await simulateLatency();
    return { ...MOCK_ATTENDANCE_SUMMARY };
  },

  // 6. School Academic Performance
  async getPerformanceAnalytics(term = 'Term 2') {
    await simulateLatency();
    return { ...MOCK_PERFORMANCE_ANALYTICS };
  },

  // 7. At-Risk Students & Early Warning Hub
  async getAtRiskStudents(filters = {}) {
    await simulateLatency();
    const { tier = 'ALL', status = 'ALL', search = '' } = filters;

    return localAtRiskRecords.filter((record) => {
      if (tier !== 'ALL' && record.riskTier !== tier) return false;
      if (status !== 'ALL' && record.status !== status) return false;
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesName = record.studentName.toLowerCase().includes(query);
        const matchesSubject = record.weakSubject.toLowerCase().includes(query);
        const matchesClass = record.className.toLowerCase().includes(query);
        if (!matchesName && !matchesSubject && !matchesClass) return false;
      }
      return true;
    });
  },

  async updateInterventionStatus(recordId, newStatus, newNotes) {
    await simulateLatency();
    localAtRiskRecords = localAtRiskRecords.map((item) => {
      if (item.id === recordId) {
        return {
          ...item,
          status: newStatus,
          notes: newNotes !== undefined ? newNotes : item.notes,
          lastUpdated: new Date().toISOString().split('T')[0],
        };
      }
      return item;
    });
    return localAtRiskRecords.find((item) => item.id === recordId);
  },

  // 8. Administrative Reports Generator
  async getSchoolReport(reportType = 'school_summary', options = {}) {
    await simulateLatency();
    const school = SCHOOL_INFO;
    const classes = MOCK_CLASSES;
    const teachers = MOCK_TEACHERS;
    const attendance = MOCK_ATTENDANCE_SUMMARY;
    const performance = MOCK_PERFORMANCE_ANALYTICS;
    const atRisk = localAtRiskRecords;

    const generatedAt = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    return {
      reportType,
      school,
      generatedAt,
      options,
      summaryMetrics: {
        totalStudents: school.totalStudents,
        totalTeachers: school.totalTeachers,
        averageAttendance: attendance.monthlyAverage,
        averagePerformance: performance.schoolAverageScore,
        totalAtRisk: atRisk.length,
        highPriorityInterventions: atRisk.filter((r) => r.riskTier === 'HIGH').length,
      },
      classBreakdown: classes,
      teacherBreakdown: teachers,
      atRiskRoster: atRisk,
      subjectBreakdown: performance.subjectBreakdown,
    };
  },
};

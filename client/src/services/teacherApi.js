const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Server error' }));
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
}

export const getTeacherDashboard = async () => {
  const res = await fetch(`${API_BASE_URL}/teacher/dashboard`);
  return handleResponse(res);
};

export const getTeacherClasses = async () => {
  const res = await fetch(`${API_BASE_URL}/teacher/classes`);
  return handleResponse(res);
};

export const getStudents = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const res = await fetch(`${API_BASE_URL}/teacher/students?${queryParams}`);
  return handleResponse(res);
};

export const getStudentDetails = async (studentId) => {
  const res = await fetch(`${API_BASE_URL}/teacher/students/${studentId}`);
  return handleResponse(res);
};

export const getAttendance = async (classId, date) => {
  const res = await fetch(`${API_BASE_URL}/teacher/attendance?classId=${classId}&date=${date}`);
  return handleResponse(res);
};

export const recordAttendance = async (attendanceData) => {
  const res = await fetch(`${API_BASE_URL}/teacher/attendance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(attendanceData),
  });
  return handleResponse(res);
};

export const getPerformance = async (classId, subject) => {
  const res = await fetch(`${API_BASE_URL}/teacher/performance?classId=${classId}&subject=${subject}`);
  return handleResponse(res);
};

export const getRiskAlerts = async () => {
  const res = await fetch(`${API_BASE_URL}/teacher/risk-alerts`);
  return handleResponse(res);
};

export const getRecommendations = async () => {
  const res = await fetch(`${API_BASE_URL}/teacher/recommendations`);
  return handleResponse(res);
};

export const createQuiz = async (quizData) => {
  const res = await fetch(`${API_BASE_URL}/teacher/quizzes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(quizData),
  });
  return handleResponse(res);
};

export const generateQuestions = async (params) => {
  const res = await fetch(`${API_BASE_URL}/teacher/quizzes/generate-questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  return handleResponse(res);
};

export const createAssignment = async (assignmentData) => {
  const res = await fetch(`${API_BASE_URL}/teacher/assignments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(assignmentData),
  });
  return handleResponse(res);
};

export const uploadLesson = async (formData) => {
  // Supports file upload or JSON payload
  const isForm = formData instanceof FormData;
  const headers = isForm ? {} : { 'Content-Type': 'application/json' };
  const body = isForm ? formData : JSON.stringify(formData);
  
  const res = await fetch(`${API_BASE_URL}/teacher/lessons/upload`, {
    method: 'POST',
    headers,
    body,
  });
  return handleResponse(res);
};

export const uploadAudio = async (formData) => {
  const res = await fetch(`${API_BASE_URL}/teacher/lessons/upload-audio`, {
    method: 'POST',
    body: formData, // Requires multipart/form-data for files
  });
  return handleResponse(res);
};

export const createRevisionActivity = async (revisionData) => {
  const res = await fetch(`${API_BASE_URL}/teacher/revision`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(revisionData),
  });
  return handleResponse(res);
};

export const getResources = async () => {
  const res = await fetch(`${API_BASE_URL}/teacher/resources`);
  return handleResponse(res);
};

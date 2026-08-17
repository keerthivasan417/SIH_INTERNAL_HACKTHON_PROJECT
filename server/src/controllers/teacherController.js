import { getDashboardData, getTeacherClassesList, getStudentsList, getStudentDetailsById, getResourcesList, addResource } from '../services/teacherService.js';
import { saveQuizAttempts, addQuiz } from '../services/quizService.js';
import { addAssignment } from '../services/assignmentService.js';
import { getDetections } from '../services/riskDetectionService.js';
import { generateAIQuizQuestions } from '../services/aiService.js';

export const getDashboardController = async (req, res) => {
  try {
    const data = await getDashboardData();
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getClassesController = async (req, res) => {
  try {
    const data = await getTeacherClassesList();
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getStudentsController = async (req, res) => {
  try {
    const data = await getStudentsList(req.query);
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getStudentDetailsController = async (req, res) => {
  try {
    const data = await getStudentDetailsById(req.params.studentId);
    if (!data) return res.status(404).json({ status: 'error', message: 'Student profile not found' });
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getAttendanceController = async (req, res) => {
  try {
    // Return sample stats or logging parameters
    res.status(200).json({ status: 'success', message: 'Attendance records fetched' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const recordAttendanceController = async (req, res) => {
  try {
    res.status(200).json({ status: 'success', message: 'Attendance saved successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getPerformanceController = async (req, res) => {
  try {
    const data = {
      totalStudents: 32,
      avgAttendance: 88,
      avgProgress: 74,
      studentsAtRisk: 3,
      totalQuizAttempts: 124,
      avgLearningTime: 42,
      assignmentCompletion: 82,
      improvementPercentage: 14,
      subjectBreakdown: {
        'Mathematics': 72,
        'Science': 81,
        'English': 68,
        'Social Science': 76
      }
    };
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getRiskAlertsController = async (req, res) => {
  try {
    const data = await getDetections();
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getRecommendationsController = async (req, res) => {
  try {
    const alerts = await getDetections();
    const recommendations = alerts.map((alert, idx) => ({
      id: `rec-${idx}`,
      studentId: alert.studentId,
      studentName: alert.studentName,
      className: alert.className,
      title: `${alert.weakTopics[0] || 'Topic'} Beginner Revision`,
      desc: `Assign the custom study module for ${alert.weakTopics[0] || 'struggled concept'} to close the mastery gap.`,
      reason: `Student scored under 50% in consecutive ${alert.weakTopics[0] || 'general'} assessments.`,
      targetTopic: alert.weakTopics[0] || 'General',
      targetDifficulty: 'Beginner'
    }));
    res.status(200).json({ status: 'success', data: recommendations });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const createQuizController = async (req, res) => {
  try {
    const quiz = await addQuiz(req.body);
    // Add quiz as an educational resource automatically
    await addResource({
      title: quiz.title,
      description: quiz.description,
      class: quiz.class,
      subject: quiz.subject,
      topic: quiz.topic,
      language: quiz.language,
      type: 'quiz',
      createdBy: 'Renita Esther V',
      createdDate: new Date().toLocaleDateString('en-GB')
    });
    res.status(201).json({ status: 'success', data: quiz });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const generateQuestionsController = async (req, res) => {
  try {
    const questions = await generateAIQuizQuestions(req.body);
    res.status(200).json({ status: 'success', data: questions });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const createAssignmentController = async (req, res) => {
  try {
    const assignment = await addAssignment(req.body);
    res.status(201).json({ status: 'success', data: assignment });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const uploadLessonController = async (req, res) => {
  try {
    const { title, description, class: targetClass, subject, topic, language, learningObjectives } = req.body;
    
    // Get file URLs if files were uploaded
    let fileUrl = '#';
    let audioUrl = '';
    
    if (req.files) {
      if (req.files.noteFile && req.files.noteFile[0]) {
        fileUrl = `/uploads/${req.files.noteFile[0].filename}`;
      }
      if (req.files.audioFile && req.files.audioFile[0]) {
        audioUrl = `/uploads/${req.files.audioFile[0].filename}`;
      }
    }
    
    const resource = await addResource({
      title: title || 'New Notes Upload',
      description: description || 'No description provided',
      class: targetClass || '8',
      subject: subject || 'General',
      topic: topic || 'General',
      language: language || 'English',
      type: audioUrl ? 'audio' : 'document',
      createdBy: 'Renita Esther V',
      createdDate: new Date().toLocaleDateString('en-GB'),
      fileUrl,
      audioUrl,
      learningObjectives: learningObjectives || ''
    });
    
    res.status(201).json({ status: 'success', data: resource });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const uploadAudioController = async (req, res) => {
  try {
    let audioUrl = '';
    if (req.file) {
      audioUrl = `/uploads/${req.file.filename}`;
    }
    res.status(201).json({ 
      status: 'success', 
      message: 'Audio uploaded successfully',
      audioUrl 
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const createRevisionActivityController = async (req, res) => {
  try {
    res.status(201).json({ status: 'success', message: 'Revision task assigned successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getResourcesController = async (req, res) => {
  try {
    const data = await getResourcesList();
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const downloadResourceController = async (req, res) => {
  try {
    const { title, subject, topic, language } = req.query;
    const content = `========================================================
RuralEdu Learning Resource Notes
========================================================
Subject: ${subject || 'General'}
Topic: ${topic || 'General'}
Language: ${language || 'English'}
Title: ${title || 'Notes'}
Created By: Govt. School Teacher (Renita Esther V)
Date: ${new Date().toLocaleDateString('en-GB')}

Key Notes:
1. Introduction to ${topic || 'General'}:
   This revision material covers key targets and learning objectives of the ${topic || 'General'} syllabus unit under ${subject || 'General'}.
   
2. Core Concepts:
   - Make sure to review basic definitions of ${topic || 'General'}.
   - Pay special attention to common calculations and mistake triggers identified in recent quiz logs.
   
3. Practice Guidelines:
   - Solve the associated Quiz on this platform.
   - Review AI recommendations for customized feedback.
   
Keep Learning and Level Up!`;

    res.setHeader('Content-disposition', `attachment; filename=${(topic || 'resource').replace(/\s+/g, '_')}_Notes.txt`);
    res.setHeader('Content-type', 'text/plain');
    res.charset = 'UTF-8';
    res.write(content);
    res.end();
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getAudioStreamController = async (req, res) => {
  try {
    const { topic } = req.query;
    let url = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // default fallback music
    
    // Look up resources in Firestore/fallback list
    const resources = await getResourcesList();
    const match = resources.find(r => 
      (r.topic || '').toLowerCase().trim() === (topic || '').toLowerCase().trim() && 
      r.audioUrl && 
      r.audioUrl !== '#'
    );
    
    if (match && match.audioUrl) {
      url = match.audioUrl;
    } else {
      const norm = (topic || '').toLowerCase().trim();
      if (norm.includes('fraction')) {
        url = 'https://ia800902.us.archive.org/3/items/Fraction_Concepts/Fraction_Concepts_Narration.mp3';
      } else if (norm.includes('electri')) {
        url = 'https://ia800204.us.archive.org/11/items/science_podcasts/science_podcast_01.mp3';
      } else if (norm.includes('light')) {
        url = 'https://ia600204.us.archive.org/11/items/science_podcasts/science_podcast_02.mp3';
      }
    }
    res.redirect(url);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};



import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
  getDashboardController,
  getClassesController,
  getStudentsController,
  getStudentDetailsController,
  getAttendanceController,
  recordAttendanceController,
  getPerformanceController,
  getRiskAlertsController,
  getRecommendationsController,
  createQuizController,
  generateQuestionsController,
  createAssignmentController,
  uploadLessonController,
  uploadAudioController,
  createRevisionActivityController,
  getResourcesController,
  downloadResourceController,
  getAudioStreamController
} from '../controllers/teacherController.js';

// Ensure uploads directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage engine configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

const router = express.Router();

router.get('/dashboard', getDashboardController);
router.get('/classes', getClassesController);
router.get('/students', getStudentsController);
router.get('/students/:studentId', getStudentDetailsController);
router.get('/attendance', getAttendanceController);
router.post('/attendance', recordAttendanceController);
router.get('/performance', getPerformanceController);
router.get('/risk-alerts', getRiskAlertsController);
router.get('/recommendations', getRecommendationsController);
router.post('/quizzes', createQuizController);
router.post('/quizzes/generate-questions', generateQuestionsController);
router.post('/assignments', createAssignmentController);

// Handle file uploads for lesson uploads (both noteFile and audioFile)
router.post('/lessons/upload', upload.fields([
  { name: 'noteFile', maxCount: 1 },
  { name: 'audioFile', maxCount: 1 }
]), uploadLessonController);

router.post('/lessons/upload-audio', upload.single('audioFile'), uploadAudioController);

router.post('/revision', createRevisionActivityController);
router.get('/resources', getResourcesController);
router.get('/resources/download', downloadResourceController);
router.get('/resources/audio', getAudioStreamController);

export default router;



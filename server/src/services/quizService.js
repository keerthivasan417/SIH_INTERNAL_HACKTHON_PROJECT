import { db } from '../config/firebase.js';

const fallbackQuizzes = [];
const fallbackQuizAttempts = [];

export const addQuiz = async (quiz) => {
  try {
    if (db) {
      const newQuiz = {
        ...quiz,
        createdDate: new Date().toLocaleDateString('en-GB')
      };
      const docRef = await db.collection('quizzes').add(newQuiz);
      return { id: docRef.id, ...newQuiz };
    }
  } catch (error) {
    console.warn('[Firebase] addQuiz failed, using in-memory mock:', error.message);
  }
  const newQuiz = {
    id: `quiz-${Date.now()}`,
    ...quiz,
    createdDate: new Date().toLocaleDateString('en-GB')
  };
  fallbackQuizzes.push(newQuiz);
  return newQuiz;
};

export const getQuizzes = async () => {
  try {
    if (db) {
      const snapshot = await db.collection('quizzes').get();
      if (!snapshot.empty) {
        const list = [];
        snapshot.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });
        return list;
      }
    }
  } catch (error) {
    console.warn('[Firebase] getQuizzes failed, using in-memory mock:', error.message);
  }
  return fallbackQuizzes;
};

export const saveQuizAttempts = async (attempt) => {
  try {
    if (db) {
      const docRef = await db.collection('quizAttempts').add(attempt);
      return { id: docRef.id, ...attempt };
    }
  } catch (error) {
    console.warn('[Firebase] saveQuizAttempts failed, using in-memory mock:', error.message);
  }
  const newAttempt = { id: `attempt-${Date.now()}`, ...attempt };
  fallbackQuizAttempts.push(newAttempt);
  return newAttempt;
};

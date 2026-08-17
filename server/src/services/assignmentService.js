import { db } from '../config/firebase.js';

const fallbackAssignments = [];

export const addAssignment = async (assignment) => {
  try {
    if (db) {
      const newAssignment = {
        ...assignment,
        createdDate: new Date().toLocaleDateString('en-GB')
      };
      const docRef = await db.collection('assignments').add(newAssignment);
      return { id: docRef.id, ...newAssignment };
    }
  } catch (error) {
    console.warn('[Firebase] addAssignment failed, using in-memory mock:', error.message);
  }
  const newAssignment = {
    id: `assign-${Date.now()}`,
    ...assignment,
    createdDate: new Date().toLocaleDateString('en-GB')
  };
  fallbackAssignments.push(newAssignment);
  return newAssignment;
};

export const getAssignments = async () => {
  try {
    if (db) {
      const snapshot = await db.collection('assignments').get();
      if (!snapshot.empty) {
        const list = [];
        snapshot.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });
        return list;
      }
    }
  } catch (error) {
    console.warn('[Firebase] getAssignments failed, using in-memory mock:', error.message);
  }
  return fallbackAssignments;
};

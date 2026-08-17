import React, { useState, useEffect } from 'react';
import { useStudent } from '../../context/StudentContext';
import { studentApi } from '../../services/studentApi';
import SubjectCard from '../../components/student/SubjectCard';

export const Subjects = () => {
  const { t } = useStudent();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    studentApi.getSubjects().then(setSubjects);
  }, []);

  return (
    <div className="subjects-page">
      <div className="page-header">
        <h1 className="page-title">📚 {t('subjects')}</h1>
        <p className="page-sub">
          Explore all your subjects, track mastery, and pick up where you left off.
        </p>
      </div>

      <div className="subjects-cards-grid">
        {subjects.map((sub) => (
          <SubjectCard key={sub.id} subject={sub} />
        ))}
      </div>
    </div>
  );
};

export default Subjects;

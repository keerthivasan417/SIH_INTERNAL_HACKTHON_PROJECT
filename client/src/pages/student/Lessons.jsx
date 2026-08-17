import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStudent } from '../../context/StudentContext';
import { studentApi } from '../../services/studentApi';
import LessonCard from '../../components/student/LessonCard';

export const Lessons = () => {
  const { t } = useStudent();
  const [searchParams] = useSearchParams();
  const selectedSubject = searchParams.get('subject');

  const [lessons, setLessons] = useState([]);
  const [filterSubject, setFilterSubject] = useState(selectedSubject || 'all');

  useEffect(() => {
    studentApi.getLessons(filterSubject === 'all' ? null : filterSubject).then(setLessons);
  }, [filterSubject]);

  return (
    <div className="lessons-page">
      <div className="page-header">
        <h1 className="page-title">📖 {t('lessons')}</h1>
        <p className="page-sub">Interactive visual lessons designed for rural learning.</p>
      </div>

      <div className="lessons-filter-row">
        <button
          onClick={() => setFilterSubject('all')}
          className={`filter-btn ${filterSubject === 'all' ? 'active' : ''}`}
        >
          All Subjects
        </button>
        <button
          onClick={() => setFilterSubject('math')}
          className={`filter-btn ${filterSubject === 'math' ? 'active' : ''}`}
        >
          Mathematics
        </button>
        <button
          onClick={() => setFilterSubject('science')}
          className={`filter-btn ${filterSubject === 'science' ? 'active' : ''}`}
        >
          Science
        </button>
      </div>

      <div className="lessons-list-grid">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
};

export default Lessons;

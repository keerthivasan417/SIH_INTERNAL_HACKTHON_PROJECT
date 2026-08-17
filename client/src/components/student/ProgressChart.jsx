import React from 'react';
import { useStudent } from '../../context/StudentContext';

export const ProgressChart = ({ subjects = [] }) => {
  const { language } = useStudent();
  const isOdia = language === 'or';

  return (
    <div className="progress-chart-container">
      <div className="bars-list">
        {subjects.map((sub) => {
          return (
            <div key={sub.id} className="subject-bar-item">
              <div className="bar-header-info">
                <span className="sub-name" style={{ color: sub.color }}>
                  {isOdia ? sub.nameOdia : sub.name}
                </span>
                <span className="sub-perc">{sub.progress}%</span>
              </div>
              <div className="bar-bg">
                <div
                  className="bar-fill"
                  style={{
                    width: `${sub.progress}%`,
                    backgroundColor: sub.color
                  }}
                ></div>
              </div>
              <div className="bar-sub-stats">
                <span>{sub.completedLessons}/{sub.totalLessons} Lessons</span>
                <span>{sub.accuracy}% Accuracy</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressChart;

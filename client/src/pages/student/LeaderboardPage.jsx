import React, { useState, useEffect } from 'react';
import { useStudent } from '../../context/StudentContext';
import { studentApi } from '../../services/studentApi';
import Leaderboard from '../../components/student/Leaderboard';

export const LeaderboardPage = () => {
  const { t, leaderboardData, language } = useStudent();
  const isOdia = language === 'or';
  const [filter, setFilter] = useState('weekly');
  const [list, setList] = useState([]);

  useEffect(() => {
    // Generate/fetch list for selected filter
    studentApi.getLeaderboard(filter).then(res => {
      setList(res || leaderboardData);
    });
  }, [filter, leaderboardData]);

  return (
    <div className="leaderboard-page" style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div className="page-header" style={{ marginBottom: '20px' }}>
        <h1 className="page-title" style={{ fontSize: '24px', fontWeight: '900', color: '#0F172A' }}>
          🏆 {isOdia ? 'ସ୍କୁଲ୍ ଲିଡରବୋର୍ଡ' : 'SCHOOL LEADERBOARD'}
        </h1>
        <p className="page-sub" style={{ color: '#64748B', fontSize: '13px', fontWeight: '600', marginTop: '4px' }}>
          {isOdia
            ? 'ପ୍ରତିଯୋଗିତା ନୁହେଁ, ପ୍ରୟାସ ଓ ନିରନ୍ତରତାକୁ ମିଶି ଉତ୍ସବ ପାଳନ କରିବା!'
            : 'Celebrate learning effort, consistency, and progress together with your classmates!'}
        </p>
      </div>

      <Leaderboard list={list.length > 0 ? list : leaderboardData} filter={filter} onFilterChange={setFilter} />
    </div>
  );
};

export default LeaderboardPage;

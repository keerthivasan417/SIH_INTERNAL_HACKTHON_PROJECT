import React, { useState, useEffect } from 'react';
import { useStudent } from '../../context/StudentContext';
import { studentApi } from '../../services/studentApi';
import ChallengeCard from '../../components/student/ChallengeCard';
import { Swords, Plus } from 'lucide-react';

export const PeerChallenges = () => {
  const { t, showNotification } = useStudent();
  const [challenges, setChallenges] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [classmateName, setClassmateName] = useState('Rohan Naik');
  const [subject, setSubject] = useState('Mathematics');

  useEffect(() => {
    studentApi.getPeerChallenges().then(setChallenges);
  }, []);

  const handleAccept = (challengeId) => {
    const updated = challenges.map(c => {
      if (c.id === challengeId) {
        return {
          ...c,
          status: 'completed',
          myScore: 95,
          winner: 'me'
        };
      }
      return c;
    });
    setChallenges(updated);
    showNotification('Challenge Completed! You won +100 XP! 🏆', 'success');
  };

  const handleCreateChallenge = (e) => {
    e.preventDefault();
    const newChal = {
      id: 'chal_' + Date.now(),
      challengerName: classmateName,
      challengerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
      subject,
      topic: `${subject} Quiz Duel`,
      status: 'pending',
      rewardXp: 100,
      createdAt: 'Just Now'
    };
    setChallenges([newChal, ...challenges]);
    setShowCreateModal(false);
    showNotification(`Challenge sent to ${classmateName}! ⚔️`, 'success');
  };

  return (
    <div className="peer-challenges-page">
      <div className="page-header flex-header">
        <div>
          <h1 className="page-title">⚔️ {t('peerChallenges')}</h1>
          <p className="page-sub">Challenge your classmates to friendly quiz duels!</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="create-challenge-btn">
          <Plus size={18} /> New Challenge
        </button>
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="create-chal-modal" onClick={e => e.stopPropagation()}>
            <h3>Send Quiz Challenge</h3>
            <form onSubmit={handleCreateChallenge}>
              <label>Select Classmate:</label>
              <select value={classmateName} onChange={e => setClassmateName(e.target.value)}>
                <option value="Rohan Naik">Rohan Naik</option>
                <option value="Subhasree Mohanty">Subhasree Mohanty</option>
                <option value="Aarav Pattnaik">Aarav Pattnaik</option>
              </select>

              <label>Select Subject:</label>
              <select value={subject} onChange={e => setSubject(e.target.value)}>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
              </select>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowCreateModal(false)} className="cancel-btn">Cancel</button>
                <button type="submit" className="send-btn">Send Duel ⚔️</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="challenges-list-grid">
        {challenges.map((c) => (
          <ChallengeCard key={c.id} challenge={c} onAccept={handleAccept} />
        ))}
      </div>
    </div>
  );
};

export default PeerChallenges;

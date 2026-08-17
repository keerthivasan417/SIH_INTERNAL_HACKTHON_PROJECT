import React, { useState, useEffect } from 'react';
import { useStudent } from '../../context/StudentContext';
import { studentApi } from '../../services/studentApi';
import {
  User,
  Crown,
  Zap,
  Flame,
  Award,
  Sparkles,
  Settings,
  Database,
  Globe,
  Volume2,
  Lock,
  CheckCircle
} from 'lucide-react';

export const Profile = () => {
  const { profile, setProfile, language, changeLanguage, lowDataMode, toggleLowDataMode, t, showNotification } = useStudent();
  const isOdia = language === 'or';

  const [storeItems, setStoreItems] = useState([]);
  const [activeTab, setActiveTab] = useState('profile'); // profile, store, settings

  useEffect(() => {
    studentApi.getVirtualRewards().then(setStoreItems);
  }, []);

  const handleBuyItem = async (itemId) => {
    try {
      const res = await studentApi.buyVirtualReward(itemId);
      if (res.success) {
        setProfile(res.updatedProfile);
        showNotification(`Unlocked ${res.reward.name}! 🎉`, 'success');
      } else {
        showNotification(res.message, 'warning');
      }
    } catch (e) {
      showNotification(e.message, 'warning');
    }
  };

  if (!profile) return null;

  return (
    <div className="profile-page">
      {/* HEADER CARD */}
      <div className="profile-hero-card">
        <div className="profile-avatar-wrapper">
          <img src={profile.avatar} alt={profile.name} className="profile-lg-avatar" />
          <span className="profile-frame-label">{profile.frame}</span>
        </div>

        <div className="profile-meta-details">
          <h1 className="profile-name">{isOdia ? profile.nameOdia : profile.name}</h1>
          <p className="profile-sub-info">Roll No: {profile.rollNo} • {profile.grade} • {profile.school}</p>
          
          <div className="profile-pills-row">
            <span className="lvl-pill"><Crown size={14} /> Level {profile.level}</span>
            <span className="xp-pill"><Zap size={14} /> {profile.xp} XP</span>
            <span className="streak-pill"><Flame size={14} /> {profile.streak} Days</span>
          </div>
        </div>
      </div>

      {/* TABS ROW */}
      <div className="profile-tabs-row">
        <button
          onClick={() => setActiveTab('profile')}
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
        >
          <User size={16} /> Overview
        </button>
        <button
          onClick={() => setActiveTab('store')}
          className={`tab-btn ${activeTab === 'store' ? 'active' : ''}`}
        >
          <Sparkles size={16} /> Virtual Rewards Shop
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
        >
          <Settings size={16} /> Settings
        </button>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'profile' && (
        <div className="tab-content-container">
          <div className="stats-box-grid">
            <div className="stat-item">
              <span className="stat-num">12</span>
              <span className="stat-txt">Lessons Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">82%</span>
              <span className="stat-txt">Quiz Accuracy</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">4</span>
              <span className="stat-txt">Badges Earned</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">12 Days</span>
              <span className="stat-txt">Longest Streak</span>
            </div>
          </div>
        </div>
      )}

      {/* VIRTUAL REWARDS STORE TAB */}
      {activeTab === 'store' && (
        <div className="tab-content-container">
          <div className="store-banner">
            <h3>🎁 Spend XP for Avatar Frames & Themes!</h3>
            <p>No real money required. Earn XP by completing lessons and quizzes!</p>
          </div>

          <div className="store-grid">
            {storeItems.map((item) => (
              <div key={item.id} className={`store-card ${item.unlocked ? 'unlocked' : ''}`}>
                <div className="item-icon-box" style={{ color: item.previewColor }}>
                  <Sparkles size={32} />
                </div>
                <h4 className="item-title">{isOdia ? item.nameOdia : item.name}</h4>
                <div className="item-cost"><Zap size={14} /> {item.costXp} XP</div>

                {item.unlocked ? (
                  <span className="owned-tag"><CheckCircle size={15} /> Owned</span>
                ) : (
                  <button
                    onClick={() => handleBuyItem(item.id)}
                    disabled={profile.xp < item.costXp}
                    className="buy-item-btn"
                  >
                    Unlock Item
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="tab-content-container settings-container">
          <div className="setting-row">
            <div>
              <strong>🌐 App Language / ଭାଷା:</strong>
              <p>Choose between Odia and English</p>
            </div>
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="settings-select"
            >
              <option value="or">ଓଡ଼ିଆ (Odia)</option>
              <option value="en">English</option>
            </select>
          </div>

          <div className="setting-row">
            <div>
              <strong>📶 Data Saver Mode:</strong>
              <p>Compresses graphics and reduces network usage for low connectivity</p>
            </div>
            <button onClick={toggleLowDataMode} className={`toggle-btn ${lowDataMode ? 'on' : 'off'}`}>
              {lowDataMode ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

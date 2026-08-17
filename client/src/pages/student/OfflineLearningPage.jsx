import React from 'react';
import { useStudent } from '../../context/StudentContext';
import soundFX from '../../utils/audioFX';
import { Download, WifiOff, CheckCircle2, Play } from 'lucide-react';

export const OfflineLearningPage = () => {
  const { language } = useStudent();
  const isOdia = language === 'or';

  const offlinePacks = [
    { id: 1, title: isOdia ? 'ଗଣିତ - ସପ୍ତମ ଶ୍ରେଣୀ (ଅଫଲାଇନ୍)' : 'Class 7 Mathematics Offline Bundle', size: '45 MB', downloaded: true },
    { id: 2, title: isOdia ? 'ବିଜ୍ଞାନ - ଭୌତିକ ବିଜ୍ଞାନ' : 'Physics & Energy Lessons', size: '60 MB', downloaded: true },
    { id: 3, title: isOdia ? 'ଇଂରାଜୀ ଗଳ୍ପ ଓ ବ୍ୟାକରଣ' : 'English Stories & Listening Pack', size: '30 MB', downloaded: false }
  ];

  return (
    <div className="student-page-container" style={{ padding: '20px', maxWidth: '1280px', margin: '0 auto' }}>
      <div className="section-title-row" style={{ marginBottom: '24px' }}>
        <div>
          <h1 className="section-title-text" style={{ fontSize: '24px', fontWeight: '900', color: '#0F172A' }}>
            📡 {isOdia ? 'ଅଫଲାଇନ୍ ଶିକ୍ଷଣ ପ୍ୟାକ୍' : 'OFFLINE LEARNING HUB'}
          </h1>
          <p style={{ color: '#64748B', fontSize: '13px', fontWeight: '600', marginTop: '4px' }}>
            {isOdia ? 'ଇଣ୍ଟରନେଟ୍ ବିନା ପାଠ ପଢ଼ନ୍ତୁ - ଗ୍ରାମାଞ୍ଚଳ ଶିକ୍ଷାର୍ଥୀଙ୍କ ପାଇଁ' : 'Download lesson bundles to study anywhere without active internet'}
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {offlinePacks.map(pack => (
          <div
            key={pack.id}
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '20px',
              border: '2px solid #E2E8F0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <WifiOff size={20} color="#0284C7" />
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748B' }}>{pack.size}</span>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#0F172A', marginBottom: '14px' }}>{pack.title}</h3>

            {pack.downloaded ? (
              <button
                onClick={() => soundFX.playWhoosh()}
                className="hero-btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
              >
                <Play size={16} /> {isOdia ? 'ଅଫଲାଇନ୍ ପଢ଼ନ୍ତୁ' : 'STUDY OFFLINE'}
              </button>
            ) : (
              <button
                onClick={() => soundFX.playStarChime()}
                className="hero-btn-secondary"
                style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
              >
                <Download size={16} /> {isOdia ? 'ଡାଉନଲୋଡ୍ କରନ୍ତୁ' : 'DOWNLOAD BUNDLE'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfflineLearningPage;

import React from 'react';
import { useStudent } from '../../context/StudentContext';
import soundFX from '../../utils/audioFX';
import { Gift, Shield, Sparkles, Award } from 'lucide-react';

export const BackpackPage = () => {
  const { language, profile } = useStudent();
  const isOdia = language === 'or';

  const rewards = [
    { id: 1, name: isOdia ? 'ସୁବର୍ଣ୍ଣ ମୁକୁଟ' : 'Golden Crown Avatar', type: 'Avatar Skin', icon: '👑', unlocked: true },
    { id: 2, name: isOdia ? 'ଯାଦୁକର ବ୍ୟାଜ୍' : 'Wizard Badge', type: 'Badge', icon: '🧙‍♂️', unlocked: true },
    { id: 3, name: isOdia ? 'ବିଜ୍ଞାନ ମେଡାଲ' : 'Science Explorer Medal', type: 'Medal', icon: '🥇', unlocked: true },
    { id: 4, name: isOdia ? 'ରକେଟ୍ ସ୍କିନ୍' : 'Cosmic Rocket Trail', type: 'Trail Effect', icon: '🚀', unlocked: false }
  ];

  return (
    <div className="student-page-container" style={{ padding: '20px', maxWidth: '1280px', margin: '0 auto' }}>
      <div className="section-title-row" style={{ marginBottom: '24px' }}>
        <div>
          <h1 className="section-title-text" style={{ fontSize: '24px', fontWeight: '900', color: '#0F172A' }}>
            🎒 {isOdia ? 'ମୋର ବ୍ୟାଗ୍ ଓ ପୁରସ୍କାର' : 'MY BACKPACK & REWARDS'}
          </h1>
          <p style={{ color: '#64748B', fontSize: '13px', fontWeight: '600', marginTop: '4px' }}>
            {isOdia ? 'ଆପଣ ଅର୍ଜନ କରିଥିବା ସମସ୍ତ ବ୍ୟାଜ୍, ମେଡାଲ୍ ଏବଂ ଅବତାର ସ୍କିନ୍' : 'Unlocked avatar skins, medals, badges, and gems collection'}
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
        {rewards.map(item => (
          <div
            key={item.id}
            onClick={() => soundFX.playHover()}
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '20px',
              border: item.unlocked ? '2px solid #E2E8F0' : '2px dashed #CBD5E1',
              opacity: item.unlocked ? 1 : 0.6,
              textAlign: 'center',
              boxShadow: item.unlocked ? '0 6px 18px rgba(0,0,0,0.04)' : 'none',
              cursor: 'pointer'
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>{item.icon}</div>
            <h4 style={{ fontSize: '16px', fontWeight: '900', color: '#0F172A' }}>{item.name}</h4>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '700' }}>{item.type}</span>
            <div style={{ marginTop: '12px' }}>
              {item.unlocked ? (
                <span style={{ background: '#D1FAE5', color: '#059669', fontSize: '11px', fontWeight: '900', padding: '4px 10px', borderRadius: '10px' }}>
                  ✓ {isOdia ? 'ଅନଲକ୍' : 'EQUIPPED'}
                </span>
              ) : (
                <span style={{ background: '#F1F5F9', color: '#64748B', fontSize: '11px', fontWeight: '900', padding: '4px 10px', borderRadius: '10px' }}>
                  🔒 {isOdia ? 'ଲକ୍ ହୋଇଛି' : 'LOCKED'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackpackPage;

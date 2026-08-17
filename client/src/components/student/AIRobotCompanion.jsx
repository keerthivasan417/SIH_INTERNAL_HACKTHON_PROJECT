import React, { useState, useRef, useEffect } from 'react';
import { useStudent } from '../../context/StudentContext';
import { Send, X, Maximize2, Minimize2, Sparkles, Bot } from 'lucide-react';
import soundFX from '../../utils/audioFX';

const SUGGESTED = [
  'What is a fraction?',
  'How does rain form?',
  'Explain photosynthesis',
  'What are prime numbers?',
  'Help me with my lesson',
];

const AI_RESPONSES = {
  default: (q) => `Great question about "${q}"! Here is a simple explanation for Class 7 students. This concept is part of your curriculum — keep asking and keep learning! 🌟`,
  fraction: 'A fraction represents a part of a whole! For example, 3/4 means 3 parts out of 4 equal parts. Think of cutting a chapati into 4 equal pieces and eating 3. 🍕',
  rain: 'Rain forms through the water cycle! The sun heats water in lakes like Chilika Lake, it evaporates, rises as clouds, and then falls back as rain over places like Koraput! 🌧️',
  photosynthesis: 'Photosynthesis is how plants make food using sunlight, water, and CO₂. The equation is: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂. Plants are nature\'s food factories! 🌱',
  prime: 'Prime numbers are numbers with exactly 2 factors: 1 and themselves. Examples: 2, 3, 5, 7, 11, 13… The smallest prime number is 2! 🔢',
};

function getSmartResponse(query) {
  const q = query.toLowerCase();
  if (q.includes('fraction') || q.includes('1/2') || q.includes('3/4')) return AI_RESPONSES.fraction;
  if (q.includes('rain') || q.includes('water cycle') || q.includes('cloud')) return AI_RESPONSES.rain;
  if (q.includes('photosynthesis') || q.includes('plant')) return AI_RESPONSES.photosynthesis;
  if (q.includes('prime')) return AI_RESPONSES.prime;
  return AI_RESPONSES.default(query);
}

export const AIRobotCompanion = () => {
  const { language } = useStudent();
  const isOdia = language === 'or';

  const [open, setOpen]         = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [input, setInput]       = useState('');
  const [typing, setTyping]     = useState(false);
  const [messages, setMessages] = useState([
    { from: 'ai', text: isOdia ? 'ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କ AI ଶିକ୍ଷଣ ସାଥୀ। ଆପଣଙ୍କ ଯେ କୌଣସି ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ! 🤖' : 'Hello! I\'m your AI learning partner. Ask me any questions you have! 🤖' }
  ]);
  const [pulse, setPulse] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) { setPulse(false); return; }
    const t = setInterval(() => setPulse(p => !p), 2500);
    return () => clearInterval(t);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = (textOverride) => {
    const q = textOverride || input;
    if (!q.trim()) return;
    soundFX.playWhoosh?.();
    setMessages(prev => [...prev, { from: 'user', text: q }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      soundFX.playStarChime?.();
      setMessages(prev => [...prev, { from: 'ai', text: getSmartResponse(q) }]);
      setTyping(false);
    }, 800);
  };

  return (
    <>
      <style>{`
        @keyframes chatSlide { from{opacity:0;transform:translateY(20px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes pulseRing { 0%{box-shadow:0 0 0 0 rgba(79,70,229,0.45)} 70%{box-shadow:0 0 0 14px rgba(79,70,229,0)} 100%{box-shadow:0 0 0 0 rgba(79,70,229,0)} }
        .aria-msg-ai  { background:#EEF2FF; color:#1E293B; border-radius:18px 18px 18px 4px; align-self:flex-start; }
        .aria-msg-user{ background:linear-gradient(135deg,#4F46E5,#6366F1); color:#fff; border-radius:18px 18px 4px 18px; align-self:flex-end; }
      `}</style>

      {/* ── BIGGER FLOATING AI BUTTON (trigger) ── */}
      {!open && (
        <button
          onClick={() => { setOpen(true); soundFX.playHover?.(); }}
          title="Open AI Learning Buddy"
          style={{
            position: 'fixed', bottom: '85px', right: '20px', zIndex: 9998,
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 18px 10px 12px',
            borderRadius: '28px', border: 'none',
            background: 'linear-gradient(135deg,#4F46E5 0%,#6366F1 100%)',
            color: '#fff', cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(79,70,229,0.45)',
            animation: pulse ? 'pulseRing 2.5s infinite' : 'none',
            transition: 'all 0.25s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <span style={{ fontSize: '24px', lineHeight: 1 }}>🤖</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '13px', fontWeight: '900', letterSpacing: '0.3px', lineHeight: 1.1 }}>ARIA AI</div>
            <div style={{ fontSize: '10px', fontWeight: '700', opacity: 0.85 }}>Ask Doubts</div>
          </div>
        </button>
      )}

      {/* ── CHAT WINDOW (Normal vs Zoomed Half-Page) ── */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          zIndex: 9998,
          width: isZoomed ? 'min(50vw, 700px)' : '360px',
          height: isZoomed ? 'calc(80vh - 80px)' : '480px',
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: 'calc(100vh - 100px)',
          background: '#fff',
          borderRadius: '24px',
          boxShadow: '0 24px 56px rgba(0,0,0,0.22)',
          border: '2px solid #C7D2FE',
          display: 'flex',
          flexDirection: 'column',
          animation: 'chatSlide 0.3s ease',
          overflow: 'hidden',
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg,#4F46E5,#6366F1)', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>🤖</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#fff', fontWeight: '900', fontSize: '15px' }}>ARIA — AI Buddy</div>
              <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '11px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '7px', height: '7px', background: '#4ADE80', borderRadius: '50%', display: 'inline-block' }} />
                Online • Instant answers
              </div>
            </div>
            {/* Zoom / Minimize button */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              title={isZoomed ? "Minimize to standard view" : "Zoom to half page view"}
              style={{ background: 'rgba(255,255,255,0.18)', border: 'none', borderRadius: '10px', width: '32px', height: '32px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
            >
              {isZoomed ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
            </button>
            {/* Close button */}
            <button
              onClick={() => { setOpen(false); setIsZoomed(false); }}
              title="Close chat"
              style={{ background: 'rgba(255,255,255,0.18)', border: 'none', borderRadius: '10px', width: '32px', height: '32px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((m, i) => (
              <div key={i} className={`aria-msg-${m.from}`} style={{ padding: '12px 16px', fontSize: isZoomed ? '15px' : '13px', fontWeight: '600', maxWidth: '85%', lineHeight: '1.5', wordBreak: 'break-word' }}>
                {m.text}
              </div>
            ))}
            {typing && (
              <div className="aria-msg-ai" style={{ padding: '12px 18px', display: 'flex', gap: '5px', alignItems: 'center' }}>
                {[0,1,2].map(i => <span key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#6366F1', animation: `bounce 0.6s ${i*0.15}s infinite alternate`, display: 'inline-block' }} />)}
                <style>{`@keyframes bounce{from{transform:translateY(0)}to{transform:translateY(-6px)}}`}</style>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick suggestions */}
          <div style={{ padding: '0 12px 8px', display: 'flex', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {SUGGESTED.map(s => (
              <button key={s} onClick={() => send(s)} style={{ whiteSpace: 'nowrap', padding: '6px 14px', borderRadius: '18px', border: '1px solid #C7D2FE', background: '#EEF2FF', fontSize: '12px', fontWeight: '800', color: '#4F46E5', cursor: 'pointer', flexShrink: 0 }}>
                {s}
              </button>
            ))}
          </div>

          {/* Input row */}
          <div style={{ display: 'flex', gap: '8px', padding: '12px 16px', borderTop: '1px solid #E2E8F0', background: '#fff' }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder={isOdia ? 'ପ୍ରଶ୍ନ ଲେଖନ୍ତୁ...' : 'Write a question...'}
              style={{ flex: 1, padding: '12px 16px', borderRadius: '14px', border: '2px solid #E2E8F0', fontSize: '14px', outline: 'none' }}
              onFocus={e => e.target.style.borderColor = '#6366F1'}
              onBlur={e => e.target.style.borderColor = '#E2E8F0'}
            />
            <button onClick={() => send()} style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'linear-gradient(135deg,#4F46E5,#6366F1)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIRobotCompanion;

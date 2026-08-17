import React, { useState, useRef, useEffect } from 'react';
import { useStudent } from '../../context/StudentContext';
import { aiApi } from '../../services/aiApi';
import { Bot, Mic, MicOff, Send, Volume2, VolumeX, Sparkles, BookOpen, Zap, RotateCcw } from 'lucide-react';

const QUICK_DOUBTS = [
  { label: '3/4 vs 1/2', q: 'Why is 3/4 greater than 1/2? Explain simply.' },
  { label: 'Water Cycle', q: 'How does the water cycle work? Explain with the example of Chilika Lake.' },
  { label: 'Photosynthesis', q: 'What is photosynthesis and why is it important for plants?' },
  { label: 'Gravity', q: 'What is gravity? Why do things fall down?' },
  { label: 'Prime Numbers', q: 'What are prime numbers? Give examples.' },
  { label: 'Rainfall', q: 'Why does it rain more in Koraput than Bhubaneswar?' },
];

export const AIDoubtSolver = () => {
  const { language, showNotification } = useStudent();
  const isOdia = language === 'or';

  const [queryText, setQueryText]   = useState('');
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [aiResponse, setAiResponse]   = useState(null);
  const [speaking, setSpeaking]       = useState(false);
  const [history, setHistory]         = useState([]);
  const answerRef = useRef(null);

  useEffect(() => {
    if (aiResponse && answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [aiResponse]);

  const handleAskDoubt = async (textToUse) => {
    const q = textToUse || queryText;
    if (!q.trim()) return;
    setLoading(true);
    try {
      const res = await aiApi.askDoubt({ query: q, language });
      setAiResponse(res);
      setHistory(prev => [{ q, res }, ...prev.slice(0, 4)]);
      setQueryText('');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      showNotification('Voice not supported. Try Chrome.', 'warning'); return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = isOdia ? 'or-IN' : 'en-US';
    rec.onstart = () => setIsListening(true);
    rec.onresult = (e) => { const t = e.results[0][0].transcript; setQueryText(t); setIsListening(false); handleAskDoubt(t); };
    rec.onerror  = () => { setIsListening(false); showNotification('Voice error. Try typing.', 'warning'); };
    rec.onend    = () => setIsListening(false);
    rec.start();
  };

  const toggleSpeech = () => {
    if (speaking) { aiApi.stopSpeech(); setSpeaking(false); }
    else if (aiResponse) { aiApi.speakText(isOdia ? aiResponse.answerOdia : aiResponse.answer, isOdia ? 'or-IN' : 'en-US'); setSpeaking(true); }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>

      {/* ── HERO HEADER ── */}
      <div style={{
        background: 'linear-gradient(135deg,#4F46E5 0%,#6366F1 50%,#818CF8 100%)',
        borderRadius: '24px', padding: '28px 32px', marginBottom: '24px',
        display: 'flex', alignItems: 'center', gap: '20px', color: '#fff',
        boxShadow: '0 12px 32px rgba(79,70,229,0.3)'
      }}>
        <div style={{ width: '72px', height: '72px', background: 'rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '36px', boxShadow: '0 0 0 8px rgba(255,255,255,0.08)' }}>🤖</div>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '900', margin: 0 }}>
            {isOdia ? 'AI ସଂଦେହ ସମାଧାନ' : 'AI DOUBT SOLVER'}
          </h1>
          <p style={{ fontSize: '13px', opacity: 0.85, marginTop: '4px', fontWeight: '600' }}>
            {isOdia ? 'ଯେ କୌଣସି ପ୍ରଶ୍ନ ଓଡ଼ିଆ ବା ଇଂରାଜୀରେ ପଚାରନ୍ତୁ — ତୁରନ୍ତ ଉତ୍ତର ପାଆନ୍ତୁ!' : 'Ask any doubt in Odia or English — get instant AI-powered step-by-step answers!'}
          </p>
        </div>
      </div>

      {/* ── SEARCH INPUT ── */}
      <div style={{ background: '#fff', borderRadius: '20px', padding: '20px', border: '2px solid #E2E8F0', marginBottom: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              type="text"
              value={queryText}
              onChange={e => setQueryText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAskDoubt()}
              placeholder={isOdia ? 'ଆପଣଙ୍କ ସନ୍ଦେହ ଲେଖନ୍ତୁ...' : 'Type your doubt here... e.g. "Why is 3/4 bigger than 1/2?"'}
              style={{ width: '100%', padding: '16px 20px', borderRadius: '14px', border: '2px solid #E2E8F0', fontSize: '15px', fontWeight: '600', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
              onFocus={e => e.target.style.borderColor = '#6366F1'}
              onBlur={e => e.target.style.borderColor = '#E2E8F0'}
            />
          </div>

          <button onClick={startVoiceInput} style={{
            width: '52px', height: '52px', borderRadius: '14px', border: 'none', cursor: 'pointer',
            background: isListening ? 'linear-gradient(135deg,#EF4444,#DC2626)' : 'linear-gradient(135deg,#F1F5F9,#E2E8F0)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            boxShadow: isListening ? '0 0 0 4px rgba(239,68,68,0.2)' : 'none', transition: 'all 0.3s'
          }}>
            {isListening ? <MicOff size={22} color="#fff" /> : <Mic size={22} color="#64748B" />}
          </button>

          <button onClick={() => handleAskDoubt()} disabled={loading || !queryText.trim()} style={{
            padding: '0 24px', height: '52px', borderRadius: '14px', border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg,#4F46E5,#6366F1)', color: '#fff',
            fontWeight: '900', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px',
            opacity: (loading || !queryText.trim()) ? 0.5 : 1, transition: 'all 0.2s', flexShrink: 0
          }}>
            <Send size={18} /> {isOdia ? 'ପଠାନ୍ତୁ' : 'Ask AI'}
          </button>
        </div>

        {/* Quick doubt chips */}
        <div style={{ marginTop: '14px' }}>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '8px' }}>⚡ Quick Doubts:</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {QUICK_DOUBTS.map(({ label, q }) => (
              <button key={label} onClick={() => handleAskDoubt(q)} style={{
                padding: '6px 14px', borderRadius: '20px', border: '1px solid #E2E8F0',
                background: '#F8FAFC', fontSize: '12px', fontWeight: '800', color: '#4F46E5',
                cursor: 'pointer', transition: 'all 0.2s'
              }}
                onMouseEnter={e => { e.target.style.background = '#EEF2FF'; e.target.style.borderColor = '#6366F1'; }}
                onMouseLeave={e => { e.target.style.background = '#F8FAFC'; e.target.style.borderColor = '#E2E8F0'; }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── LOADING ── */}
      {loading && (
        <div style={{
          background: '#EEF2FF', borderRadius: '20px', padding: '28px', textAlign: 'center',
          border: '1px solid #C7D2FE', marginBottom: '20px'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>🤖</div>
          <div style={{ fontWeight: '900', color: '#4F46E5', fontSize: '15px' }}>AI is thinking…</div>
          <p style={{ color: '#64748B', fontSize: '13px', marginTop: '4px' }}>Preparing a simple, step-by-step explanation for you!</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#6366F1', animation: `bounce 0.8s ${i*0.15}s infinite alternate` }} />
            ))}
          </div>
          <style>{`@keyframes bounce { from{transform:translateY(0)} to{transform:translateY(-10px)} }`}</style>
        </div>
      )}

      {/* ── AI RESPONSE CARD ── */}
      {aiResponse && !loading && (
        <div ref={answerRef} style={{ background: '#fff', borderRadius: '20px', border: '2px solid #C7D2FE', boxShadow: '0 8px 24px rgba(99,102,241,0.08)', marginBottom: '20px', overflow: 'hidden' }}>
          {/* Card header */}
          <div style={{ background: 'linear-gradient(135deg,#4F46E5,#6366F1)', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
              <div style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={20} color="#fff" />
              </div>
              <div>
                <div style={{ fontWeight: '900', fontSize: '14px' }}>Ama Siksha AI Tutor</div>
                <div style={{ fontSize: '11px', opacity: 0.8 }}>Step-by-step explanation ready!</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={toggleSpeech} style={{ padding: '8px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', fontWeight: '800', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {speaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                {speaking ? 'Stop' : 'Listen'}
              </button>
              <button onClick={() => setAiResponse(null)} style={{ padding: '8px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontWeight: '800', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <RotateCcw size={14} /> New
              </button>
            </div>
          </div>

          {/* Answer */}
          <div style={{ padding: '24px' }}>
            <div style={{ fontSize: '15px', lineHeight: '1.7', color: '#1E293B', fontWeight: '600', whiteSpace: 'pre-wrap', marginBottom: '20px' }}>
              {isOdia ? aiResponse.answerOdia : aiResponse.answer}
            </div>

            {/* Example box */}
            <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '14px', padding: '16px', marginBottom: '14px' }}>
              <div style={{ fontWeight: '900', color: '#065F46', fontSize: '13px', marginBottom: '6px' }}>💡 Real-Life Example:</div>
              <div style={{ fontSize: '14px', color: '#047857', fontWeight: '600' }}>{isOdia ? aiResponse.exampleOdia : aiResponse.example}</div>
            </div>

            {/* Encouragement */}
            <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '14px', padding: '14px', textAlign: 'center', fontSize: '14px', fontWeight: '800', color: '#92400E' }}>
              ✨ {isOdia ? aiResponse.encouragementOdia : aiResponse.encouragement}
            </div>

            {/* Next difficulty tag */}
            {aiResponse.newDifficultyLevel && (
              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: '800', color: '#4F46E5' }}>
                <Sparkles size={14} /> Recommended next level: <strong>{aiResponse.newDifficultyLevel}</strong>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── HISTORY ── */}
      {history.length > 1 && (
        <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '16px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '12px', fontWeight: '900', color: '#64748B', marginBottom: '10px', textTransform: 'uppercase' }}>📚 Recent Doubts</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {history.slice(1).map((item, i) => (
              <button key={i} onClick={() => { setAiResponse(item.res); setQueryText(item.q); }} style={{
                textAlign: 'left', padding: '10px 14px', borderRadius: '10px', border: '1px solid #E2E8F0',
                background: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: '700', color: '#334155',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
              }}>
                🔁 {item.q}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIDoubtSolver;

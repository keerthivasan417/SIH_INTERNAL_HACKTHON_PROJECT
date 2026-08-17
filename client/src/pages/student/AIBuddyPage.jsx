import React, { useState } from 'react';
import { useStudent } from '../../context/StudentContext';
import soundFX from '../../utils/audioFX';
import { Bot, Send, Sparkles, MessageSquare } from 'lucide-react';

export const AIBuddyPage = () => {
  const { language } = useStudent();
  const isOdia = language === 'or';
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: isOdia ? 'ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କର AI ଶିକ୍ଷଣ ସାଥୀ। ଆପଣଙ୍କର କୌଣସି ପ୍ରଶ୍ନ ଅଛି କି?' : 'Hello! I am your AI Learning Buddy. Ask me anything about your lessons!' }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    soundFX.playWhoosh();
    const userMsg = query;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setQuery('');

    // Simulate AI response
    setTimeout(() => {
      soundFX.playStarChime();
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: isOdia
            ? `ପ୍ରଶ୍ନ: "${userMsg}" ସମ୍ପର୍କରେ ଉତ୍ତର: ଏହା ଏକ ଗୁରୁତ୍ଵପୂର୍ଣ୍ଣ ଗଣିତ/ବିଜ୍ଞାନ ଧାରଣା!`
            : `Great question about "${userMsg}"! Here is a simple step-by-step explanation for Class 7 students.`
        }
      ]);
    }, 800);
  };

  return (
    <div className="student-page-container" style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <div className="section-title-row" style={{ marginBottom: '20px' }}>
        <div>
          <h1 className="section-title-text" style={{ fontSize: '24px', fontWeight: '900', color: '#0F172A' }}>
            🤖 {isOdia ? 'AI ଶିକ୍ଷଣ ସାଥୀ' : 'AI LEARNING COMPANION'}
          </h1>
          <p style={{ color: '#64748B', fontSize: '13px', fontWeight: '600', marginTop: '4px' }}>
            {isOdia ? 'ଆପଣଙ୍କର ସନ୍ଦେହ ପଚାରନ୍ତୁ ଏବଂ ତୁରନ୍ତ ସମାଧାନ ପାଆନ୍ତୁ' : 'Instant 24/7 AI tutor for doubt resolution in English & Odia'}
          </p>
        </div>
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: '24px', border: '2px solid #E2E8F0', padding: '20px', boxShadow: '0 6px 18px rgba(0,0,0,0.04)', height: '480px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '6px' }}>
          {messages.map((m, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                background: m.sender === 'user' ? '#4F46E5' : '#F1F5F9',
                color: m.sender === 'user' ? '#FFFFFF' : '#0F172A',
                padding: '12px 18px',
                borderRadius: '18px',
                maxWidth: '75%',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              {m.text}
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isOdia ? 'ଏଠାରେ ଆପଣଙ୍କ ପ୍ରଶ୍ନ ଲେଖନ୍ତୁ...' : 'Ask a question in English or Odia...'}
            style={{ flex: 1, padding: '14px 20px', borderRadius: '16px', border: '2px solid #E2E8F0', fontSize: '14px', outline: 'none' }}
          />
          <button type="submit" className="hero-btn-primary" style={{ padding: '14px 24px', borderRadius: '16px' }}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIBuddyPage;

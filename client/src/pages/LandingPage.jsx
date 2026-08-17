import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import NeuralBackground from '../components/common/NeuralBackground';

/* ─────────────────────────────────────────────
   Main Landing Page
───────────────────────────────────────────── */
const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleStartLearning = () => {
    navigate('/student/dashboard');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 20% 50%, #0d0a1f 0%, #06030f 40%, #000510 100%)',
      color: '#FFFFFF',
      fontFamily: "'Outfit', 'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Neural Network Background */}
      <NeuralBackground nodeCount={90} connectDist={190} opacity={1} />

      {/* Ambient colour blobs */}
      <div style={{
        position: 'fixed', top: '-10%', right: '5%', width: '700px', height: '700px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
        filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: '-15%', left: '-5%', width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)',
        filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: '800px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(14,165,233,0.05) 0%, transparent 70%)',
        filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none',
      }} />

      {/* ── HEADER ── */}
      <header style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '28px 60px', zIndex: 10, position: 'relative',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        background: 'rgba(0,0,0,0.15)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366F1, #A855F7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
          }}>
            <span style={{ color: 'white', fontWeight: '900', fontSize: '14px' }}>A</span>
          </div>
          <div style={{ fontWeight: '900', fontSize: '15px', lineHeight: '1.1', letterSpacing: '2px' }}>
            AMA<br /><span style={{ color: '#A855F7' }}>SIKSHA</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
          {['ABOUT', 'FEATURES', 'PRICING', 'CONTACT'].map(item => (
            <a key={item} href="#" style={{
              color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '11px',
              fontWeight: '700', letterSpacing: '1.5px', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Sign In */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={handleSignIn}
            style={{
              background: 'rgba(99,102,241,0.15)',
              backdropFilter: 'blur(12px)',
              color: 'white',
              border: '1px solid rgba(99,102,241,0.4)',
              padding: '10px 28px',
              borderRadius: '50px',
              fontSize: '12px', fontWeight: '700', letterSpacing: '1px',
              cursor: 'pointer', transition: 'all 0.25s ease',
              outline: 'none',
            }}
            onMouseEnter={e => {
              e.target.style.background = 'rgba(99,102,241,0.35)';
              e.target.style.borderColor = 'rgba(99,102,241,0.8)';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 24px rgba(99,102,241,0.35)';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'rgba(99,102,241,0.15)';
              e.target.style.borderColor = 'rgba(99,102,241,0.4)';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            SIGN IN
          </button>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main style={{
        flex: 1, display: 'flex', alignItems: 'center',
        padding: '0 8%', zIndex: 10, position: 'relative',
        minHeight: 'calc(100vh - 100px)',
      }}>
        {/* Left Side */}
        <div style={{ flex: 1, maxWidth: '580px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(99,102,241,0.12)',
            border: '1px solid rgba(99,102,241,0.25)',
            borderRadius: '50px', padding: '6px 16px', marginBottom: '28px',
            backdropFilter: 'blur(8px)',
          }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#A855F7', boxShadow: '0 0 8px #A855F7',
              animation: 'nodePulse 2s ease-in-out infinite',
            }} />
            <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '1px', color: 'rgba(255,255,255,0.8)' }}>
              GAMIFIED RURAL LEARNING
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(60px, 9vw, 110px)', fontWeight: '900',
            margin: '0 0 16px -4px', letterSpacing: '-2px', lineHeight: '0.95',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #C4B5FD 50%, #818CF8 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Welcome.
          </h1>

          <p style={{
            fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.7',
            marginBottom: '40px', maxWidth: '420px', fontWeight: '400',
          }}>
            Explore interactive lessons, virtual labs, and AI-powered doubt solving.
            Education made engaging and accessible for every student.
          </p>

          {/* Search Bar */}
          <div style={{
            display: 'flex', alignItems: 'center',
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '50px',
            padding: '4px 6px 4px 24px', width: '85%', marginBottom: '36px',
            transition: 'border-color 0.3s, box-shadow 0.3s',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
            onFocus={e => {
              e.currentTarget.style.borderColor = 'rgba(99,102,241,0.6)';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.12), inset 0 1px 0 rgba(255,255,255,0.05)';
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.05)';
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
          >
            <input
              type="text"
              placeholder="Search lessons, topics..."
              style={{
                flex: 1, background: 'transparent', border: 'none', color: 'white',
                outline: 'none', fontSize: '14px', fontWeight: '400',
              }}
            />
            <button style={{
              background: 'linear-gradient(135deg, #6366F1, #A855F7)',
              border: 'none', color: 'white', padding: '10px 16px',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', borderRadius: '40px',
              boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
              transition: 'transform 0.2s',
              outline: 'none',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Search size={18} />
            </button>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button
              onClick={handleStartLearning}
              style={{
                background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)',
                color: 'white', border: 'none', padding: '14px 36px',
                borderRadius: '50px', fontSize: '12px', fontWeight: '800', letterSpacing: '1.5px',
                cursor: 'pointer', transition: 'all 0.25s ease',
                boxShadow: '0 6px 24px rgba(99,102,241,0.45)',
                outline: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(99,102,241,0.6)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(99,102,241,0.45)';
              }}
            >
              START LEARNING
            </button>

            <button
              onClick={handleSignIn}
              style={{
                background: 'transparent',
                color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.18)',
                padding: '14px 32px', borderRadius: '50px',
                fontSize: '12px', fontWeight: '600', letterSpacing: '1px',
                cursor: 'pointer', transition: 'all 0.25s ease',
                outline: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              SIGN IN →
            </button>
          </div>
        </div>

        {/* Right Side: Stats Card */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px', padding: '40px',
            maxWidth: '340px', width: '100%',
            boxShadow: '0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #6366F1, #A855F7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px', boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
              }}>🧠</div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '1px', color: '#A855F7' }}>AMA SIKSHA</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Gamified Portal</div>
              </div>
            </div>

            {[
              { label: 'Active Learners', value: '12,400+', icon: '👩‍🎓', color: '#6366F1' },
              { label: 'Lessons Completed', value: '3.8L+', icon: '📚', color: '#A855F7' },
              { label: 'AI Doubts Solved', value: '98,000+', icon: '🤖', color: '#0EA5E9' },
            ].map((stat, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '14px 0',
                borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '10px',
                  background: `${stat.color}18`, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: '17px',
                  border: `1px solid ${stat.color}30`,
                }}>
                  {stat.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginBottom: '2px' }}>{stat.label}</div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: '#fff' }}>{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        opacity: 0.4, zIndex: 10,
      }}>
        <div style={{
          width: '20px', height: '32px', borderRadius: '10px',
          border: '1px solid rgba(255,255,255,0.4)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '4px',
        }}>
          <div style={{
            width: '3px', height: '8px', borderRadius: '2px',
            background: 'white', animation: 'scrollDot 2s ease-in-out infinite',
          }} />
        </div>
        <span style={{ fontSize: '9px', letterSpacing: '2px', fontWeight: '600' }}>SCROLL</span>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; }

        button:focus, a:focus, input:focus {
          outline: none !important;
          box-shadow: none;
        }

        @keyframes nodePulse {
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 8px #A855F7; }
          50% { opacity: 0.6; transform: scale(1.4); box-shadow: 0 0 16px #A855F7; }
        }

        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(14px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;

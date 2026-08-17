import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NeuralBackground from '../../components/common/NeuralBackground';

/* ─────────────────────────────────────────────
   Login Page
───────────────────────────────────────────── */
const ROLES = [
  { id: 'student', label: 'Student', icon: '👩‍🎓', route: '/student/dashboard', color: '#6366F1' },
  { id: 'teacher', label: 'Teacher', icon: '👨‍🏫', route: '/teacher/dashboard', color: '#A855F7' },
  { id: 'admin',   label: 'Admin',   icon: '🛡️',   route: '/admin/dashboard',   color: '#0EA5E9' },
];

const Login = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [selectedRole, setSelectedRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    // slight delay triggers CSS transition for smooth entry
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth call
    await new Promise(r => setTimeout(r, 900));
    const role = ROLES.find(r => r.id === selectedRole);
    navigate(role.route);
  };

  const activeRole = ROLES.find(r => r.id === selectedRole);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 30% 60%, #0d0a1f 0%, #06030f 40%, #000510 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Outfit', 'Inter', sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      <NeuralBackground nodeCount={70} connectDist={160} opacity={1} />

      {/* Ambient blobs */}
      <div style={{
        position: 'fixed', top: '10%', right: '15%', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
        filter: 'blur(70px)', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', bottom: '10%', left: '10%', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)',
        filter: 'blur(70px)', zIndex: 0,
      }} />

      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'fixed', top: '28px', left: '40px', zIndex: 20,
          background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50px',
          color: 'rgba(255,255,255,0.7)', padding: '8px 20px', fontSize: '12px',
          fontWeight: '600', letterSpacing: '0.5px', cursor: 'pointer',
          transition: 'all 0.2s', outline: 'none',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
      >
        ← Back
      </button>

      {/* Login Card */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: '420px', padding: '0 20px',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.97)',
        transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #6366F1, #A855F7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px', fontSize: '24px',
            boxShadow: '0 8px 28px rgba(99,102,241,0.45)',
          }}>🧠</div>
          <div style={{ fontWeight: '900', fontSize: '22px', letterSpacing: '1px', color: '#fff' }}>
            AMA <span style={{ color: '#A855F7' }}>SIKSHA</span>
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '4px', letterSpacing: '0.5px' }}>
            Gamified Rural Learning Portal
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(28px)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: '24px', padding: '36px 32px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}>
          <h2 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: '800', color: '#fff' }}>
            Welcome back
          </h2>
          <p style={{ margin: '0 0 28px', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
            Sign in to continue your journey
          </p>

          {/* Role Selector */}
          <div style={{
            display: 'flex', gap: '8px', marginBottom: '28px',
            background: 'rgba(0,0,0,0.25)', borderRadius: '14px', padding: '4px',
          }}>
            {ROLES.map(role => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                style={{
                  flex: 1, padding: '9px 0',
                  background: selectedRole === role.id
                    ? `linear-gradient(135deg, ${role.color}cc, ${role.color}88)`
                    : 'transparent',
                  border: 'none', borderRadius: '10px',
                  color: selectedRole === role.id ? '#fff' : 'rgba(255,255,255,0.45)',
                  fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px',
                  cursor: 'pointer', transition: 'all 0.25s ease',
                  outline: 'none',
                  boxShadow: selectedRole === role.id ? `0 4px 14px ${role.color}44` : 'none',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
                }}
              >
                <span style={{ fontSize: '16px' }}>{role.icon}</span>
                {role.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Email */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.8px', display: 'block', marginBottom: '8px' }}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@amashiksha.in"
                required
                style={{
                  width: '100%', padding: '13px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px', color: '#fff', fontSize: '14px',
                  outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={e => { e.target.style.borderColor = `${activeRole.color}88`; e.target.style.boxShadow = `0 0 0 3px ${activeRole.color}22`; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.8px', display: 'block', marginBottom: '8px' }}>
                PASSWORD
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%', padding: '13px 46px 13px 16px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px', color: '#fff', fontSize: '14px',
                    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => { e.target.style.borderColor = `${activeRole.color}88`; e.target.style.boxShadow = `0 0 0 3px ${activeRole.color}22`; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
                    cursor: 'pointer', fontSize: '14px', outline: 'none', padding: 0,
                  }}
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <a href="#" style={{ fontSize: '12px', color: activeRole.color, textDecoration: 'none', fontWeight: '600' }}>
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '14px',
                background: loading
                  ? 'rgba(99,102,241,0.4)'
                  : `linear-gradient(135deg, ${activeRole.color}, #A855F7)`,
                border: 'none', borderRadius: '14px',
                color: '#fff', fontSize: '13px', fontWeight: '800', letterSpacing: '1.5px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.25s ease', outline: 'none',
                boxShadow: loading ? 'none' : `0 8px 28px ${activeRole.color}55`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 14px 36px ${activeRole.color}66`; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 28px ${activeRole.color}55`; }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff', borderRadius: '50%',
                    animation: 'spin 0.7s linear infinite',
                  }} />
                  SIGNING IN...
                </>
              ) : `SIGN IN AS ${selectedRole.toUpperCase()}`}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>
            Don't have an account?{' '}
            <a href="#" style={{ color: activeRole.color, textDecoration: 'none', fontWeight: '700' }}>
              Contact Admin
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        button:focus, a:focus, input:focus { outline: none !important; }
        input::placeholder { color: rgba(255,255,255,0.2); }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Login;

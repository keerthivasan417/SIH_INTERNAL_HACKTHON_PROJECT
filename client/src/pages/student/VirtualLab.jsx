import React, { useState, useEffect, useRef } from 'react';
import { useStudent } from '../../context/StudentContext';
import { FlaskConical, Sun, CloudRain, Zap, Play, RotateCcw, CheckCircle, Trophy, BookOpen } from 'lucide-react';

const LABS = [
  { id: 'water', emoji: '🌊', label: 'Water Cycle', sublabel: 'Science', color: '#06B6D4', bg: 'linear-gradient(135deg,#0EA5E9,#06B6D4)' },
  { id: 'fraction', emoji: '🍕', label: 'Fraction Explorer', sublabel: 'Mathematics', color: '#6366F1', bg: 'linear-gradient(135deg,#4F46E5,#6366F1)' },
  { id: 'circuit', emoji: '⚡', label: 'Electric Circuit', sublabel: 'Physics', color: '#F59E0B', bg: 'linear-gradient(135deg,#D97706,#F59E0B)' },
  { id: 'plant', emoji: '🌱', label: 'Plant Growth', sublabel: 'Biology', color: '#10B981', bg: 'linear-gradient(135deg,#059669,#10B981)' },
];

/* ── Water Cycle Lab ── */
function WaterCycleLab({ awardXP }) {
  const [temp, setTemp] = useState(30);
  const [stage, setStage] = useState('');
  const [earned, setEarned] = useState(false);

  useEffect(() => {
    if (temp < 35) setStage('cold');
    else if (temp < 60) setStage('warm');
    else if (temp < 80) setStage('hot');
    else setStage('boiling');
  }, [temp]);

  const complete = () => { if (!earned) { awardXP(15, 'Water Cycle Lab'); setEarned(true); } };
  const stageMap = {
    cold:    { label: '❄️ Cold — No evaporation', cloud: '🌤️', rain: false, vapour: 0 },
    warm:    { label: '🌤️ Warm — Gentle evaporation', cloud: '⛅', rain: false, vapour: 2 },
    hot:     { label: '☀️ Hot — Active vapour rise', cloud: '☁️', rain: false, vapour: 5 },
    boiling: { label: '🌧️ Very Hot — Clouds & Rain!', cloud: '⛈️', rain: true, vapour: 9 },
  };
  const s = stageMap[stage] || stageMap.cold;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ background: 'linear-gradient(180deg,#0EA5E9 0%,#BAE6FD 50%,#D4F5D4 100%)', borderRadius: '20px', padding: '28px', minHeight: '280px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        {/* Sun */}
        <div style={{ position: 'absolute', top: '20px', right: '28px', fontSize: `${2 + temp / 30}rem`, transition: 'all 0.4s', filter: `brightness(${0.7 + temp / 100})`, textShadow: `0 0 ${temp/2}px #FCD34D` }}>☀️</div>
        {/* Cloud */}
        <div style={{ position: 'absolute', top: '18px', left: '24px', fontSize: '2.5rem', transition: 'all 0.5s', opacity: temp > 40 ? 1 : 0.3 }}>{s.cloud}</div>
        {/* Rain drops */}
        {s.rain && (
          <div style={{ position: 'absolute', top: '60px', left: '20px', display: 'flex', gap: '8px' }}>
            {['💧','💧','💧','💧','💧'].map((d,i) => (
              <span key={i} style={{ fontSize: '1.2rem', animation: `fall 0.8s ${i*0.15}s infinite` }}>{d}</span>
            ))}
          </div>
        )}
        {/* Vapour dots */}
        <div style={{ position: 'absolute', bottom: '70px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' }}>
          {Array.from({ length: s.vapour }).map((_, i) => (
            <span key={i} style={{ fontSize: '1rem', opacity: 0.7, animation: `riseUp 1.5s ${i * 0.2}s infinite` }}>💨</span>
          ))}
        </div>
        {/* Lake */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '56px', background: 'linear-gradient(180deg,#38BDF8,#0284C7)', borderRadius: '0 0 20px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', color: '#fff', fontSize: '14px' }}>
          🌊 Chilika Lake — Water Surface
        </div>
      </div>

      {/* Controls */}
      <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '20px', border: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <label style={{ fontWeight: '800', color: '#334155', fontSize: '14px' }}>🌡️ Sun Temperature: <span style={{ color: '#EF4444' }}>{temp}°C</span></label>
          <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748B', background: '#EEF2FF', padding: '4px 10px', borderRadius: '8px' }}>{s.label}</span>
        </div>
        <input type="range" min="10" max="100" value={temp} onChange={e => setTemp(+e.target.value)}
          style={{ width: '100%', accentColor: '#06B6D4', height: '6px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8', fontWeight: '700', marginTop: '4px' }}>
          <span>10°C (Cold)</span><span>100°C (Boiling)</span>
        </div>

        <div style={{ marginTop: '16px', padding: '12px 16px', background: '#EFF6FF', borderRadius: '12px', fontSize: '13px', fontWeight: '700', color: '#1E40AF' }}>
          💡 <strong>What's happening:</strong> At {temp}°C, water molecules gain energy and {temp < 35 ? 'barely move' : temp < 60 ? 'slowly evaporate' : temp < 80 ? 'rapidly evaporate forming clouds' : 'explosively evaporate causing heavy rain!'}.
        </div>

        {!earned && (
          <button onClick={complete} style={{ marginTop: '12px', width: '100%', padding: '12px', borderRadius: '12px', background: 'linear-gradient(135deg,#06B6D4,#0EA5E9)', color: '#fff', border: 'none', fontWeight: '900', cursor: 'pointer', fontSize: '14px' }}>
            ✅ Mark Experiment Complete (+15 XP)
          </button>
        )}
        {earned && <div style={{ marginTop: '12px', textAlign: 'center', color: '#059669', fontWeight: '900', fontSize: '14px' }}>🎉 Experiment Complete! +15 XP Earned</div>}
      </div>
    </div>
  );
}

/* ── Fraction Explorer Lab ── */
function FractionLab({ awardXP }) {
  const [num, setNum] = useState(3);
  const [den, setDen] = useState(8);
  const [earned, setEarned] = useState(false);
  const pct = Math.round((num / den) * 100);
  const complete = () => { if (!earned) { awardXP(15, 'Fraction Lab'); setEarned(true); } };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Pie Visual */}
      <div style={{ background: 'linear-gradient(135deg,#EEF2FF,#F0FDF4)', borderRadius: '20px', padding: '28px', textAlign: 'center' }}>
        <div style={{ fontSize: '56px', fontWeight: '900', color: '#4F46E5', marginBottom: '8px' }}>
          <sup style={{ fontSize: '36px' }}>{num}</sup>
          <span style={{ fontSize: '48px', color: '#CBD5E1' }}>/</span>
          <sub style={{ fontSize: '36px' }}>{den}</sub>
        </div>
        <div style={{ fontSize: '18px', fontWeight: '700', color: '#64748B', marginBottom: '20px' }}>= {pct}%</div>

        {/* Visual grid */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(den, 6)}, 1fr)`, gap: '8px', maxWidth: '360px', margin: '0 auto' }}>
          {Array.from({ length: den }).map((_, i) => (
            <div key={i} style={{
              aspectRatio: '1', borderRadius: '10px',
              background: i < num ? 'linear-gradient(135deg,#4F46E5,#6366F1)' : '#E2E8F0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', fontWeight: '900', color: i < num ? '#fff' : '#94A3B8',
              boxShadow: i < num ? '0 4px 10px rgba(99,102,241,0.3)' : 'none',
              transition: 'all 0.3s'
            }}>
              {i + 1}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '16px', padding: '10px 16px', background: '#EEF2FF', borderRadius: '12px', fontSize: '13px', fontWeight: '700', color: '#4338CA' }}>
          📐 {num} out of {den} equal parts are shaded — that is the fraction {num}/{den}
        </div>
      </div>

      {/* Controls */}
      <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '20px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label style={{ fontWeight: '800', color: '#334155', fontSize: '13px' }}>Numerator (shaded): <span style={{ color: '#4F46E5' }}>{num}</span></label>
          <input type="range" min="1" max={den} value={num} onChange={e => setNum(+e.target.value)} style={{ width: '100%', accentColor: '#6366F1', marginTop: '6px' }} />
        </div>
        <div>
          <label style={{ fontWeight: '800', color: '#334155', fontSize: '13px' }}>Denominator (total parts): <span style={{ color: '#059669' }}>{den}</span></label>
          <input type="range" min="2" max="12" value={den} onChange={e => { const v = +e.target.value; setDen(v); if (num > v) setNum(v); }} style={{ width: '100%', accentColor: '#10B981', marginTop: '6px' }} />
        </div>
        {!earned ? (
          <button onClick={complete} style={{ padding: '12px', borderRadius: '12px', background: 'linear-gradient(135deg,#4F46E5,#6366F1)', color: '#fff', border: 'none', fontWeight: '900', cursor: 'pointer', fontSize: '14px' }}>
            ✅ Mark Experiment Complete (+15 XP)
          </button>
        ) : (
          <div style={{ textAlign: 'center', color: '#059669', fontWeight: '900' }}>🎉 Experiment Complete! +15 XP Earned</div>
        )}
      </div>
    </div>
  );
}

/* ── Electric Circuit Lab ── */
function CircuitLab({ awardXP }) {
  const [sw, setSw] = useState(false);
  const [bulbPower, setBulbPower] = useState(0);
  const [earned, setEarned] = useState(false);

  useEffect(() => {
    if (sw) {
      let p = 0;
      const t = setInterval(() => { p = Math.min(100, p + 10); setBulbPower(p); if (p >= 100) clearInterval(t); }, 80);
      return () => clearInterval(t);
    } else {
      setBulbPower(0);
    }
  }, [sw]);

  const toggle = () => {
    const next = !sw; setSw(next);
    if (next && !earned) { setTimeout(() => { awardXP(15, 'Circuit Lab'); setEarned(true); }, 900); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Stage */}
      <div style={{ background: sw ? 'linear-gradient(135deg,#1E1B4B,#312E81)' : 'linear-gradient(135deg,#1E293B,#0F172A)', borderRadius: '20px', padding: '32px', textAlign: 'center', transition: 'background 0.6s', minHeight: '260px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>

        {/* Bulb visual */}
        <div style={{ fontSize: '80px', transition: 'all 0.5s', filter: sw ? `brightness(${0.5 + bulbPower/100 * 1.5}) drop-shadow(0 0 ${bulbPower/4}px #FCD34D)` : 'brightness(0.3)' }}>💡</div>
        <div style={{ color: sw ? '#FCD34D' : '#475569', fontWeight: '900', fontSize: '18px', transition: 'color 0.4s' }}>
          {sw ? `🌟 Circuit CLOSED — ${bulbPower}% Power` : '⬛ Circuit OPEN — No Current'}
        </div>

        {/* Wiring diagram text */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[['🔋', 'Battery'], ['—', null], [sw ? '✅' : '❌', 'Switch'], ['—', null], ['💡', 'Bulb']].map(([icon, label], i) => (
            icon === '—' ? (
              <div key={i} style={{ width: '30px', height: '3px', background: sw ? '#FCD34D' : '#475569', borderRadius: '2px', transition: 'background 0.4s' }} />
            ) : (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px' }}>{icon}</div>
                {label && <div style={{ color: '#94A3B8', fontSize: '11px', fontWeight: '700' }}>{label}</div>}
              </div>
            )
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '20px', border: '1px solid #E2E8F0' }}>
        <button onClick={toggle} style={{
          width: '100%', padding: '16px', borderRadius: '14px',
          background: sw ? 'linear-gradient(135deg,#EF4444,#DC2626)' : 'linear-gradient(135deg,#10B981,#059669)',
          color: '#fff', border: 'none', fontWeight: '900', fontSize: '16px', cursor: 'pointer', transition: 'all 0.3s'
        }}>
          {sw ? '🔴 OPEN Switch (Turn OFF)' : '🟢 CLOSE Switch (Turn ON)'}
        </button>
        <div style={{ marginTop: '14px', padding: '12px 16px', background: '#FFFBEB', borderRadius: '12px', fontSize: '13px', fontWeight: '700', color: '#92400E' }}>
          💡 <strong>Concept:</strong> Current only flows in a <em>closed circuit</em>. When the switch is open, the circuit breaks and no electricity reaches the bulb.
        </div>
        {earned && <div style={{ marginTop: '12px', textAlign: 'center', color: '#059669', fontWeight: '900' }}>🎉 Experiment Complete! +15 XP Earned</div>}
      </div>
    </div>
  );
}

/* ── Plant Growth Lab ── */
function PlantLab({ awardXP }) {
  const [water, setWater] = useState(40);
  const [sun, setSun] = useState(50);
  const [nutrients, setNutrients] = useState(30);
  const [earned, setEarned] = useState(false);
  const health = Math.round((water + sun + nutrients) / 3);
  const stage = health < 30 ? 0 : health < 50 ? 1 : health < 70 ? 2 : health < 90 ? 3 : 4;
  const plants = ['🌱', '🌿', '🪴', '🌳', '🌲'];
  const complete = () => { if (!earned) { awardXP(15, 'Plant Growth Lab'); setEarned(true); } };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ background: `linear-gradient(180deg,${sun > 60 ? '#FEF3C7' : '#DBEAFE'} 0%,#D4F5D4 60%,#92400E20 100%)`, borderRadius: '20px', padding: '32px', textAlign: 'center', minHeight: '220px' }}>
        <div style={{ fontSize: `${3 + stage * 1.2}rem`, transition: 'all 0.6s', filter: `brightness(${0.5 + health / 120})` }}>{plants[stage]}</div>
        <div style={{ marginTop: '12px', fontWeight: '800', fontSize: '14px', color: '#166534' }}>
          Plant Health: {health}% — {stage === 4 ? '🏆 Fully Grown!' : stage === 3 ? '🌟 Almost There!' : stage === 2 ? '📈 Growing Well' : stage === 1 ? '🌱 Just Sprouted' : '😢 Needs Care'}
        </div>
        <div style={{ width: '100%', height: '8px', background: '#D1FAE5', borderRadius: '4px', marginTop: '10px', overflow: 'hidden' }}>
          <div style={{ width: `${health}%`, height: '100%', background: `linear-gradient(90deg,#10B981,#34D399)`, transition: 'width 0.5s' }} />
        </div>
      </div>

      <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '20px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {[
          { label: '💧 Water', value: water, set: setWater, color: '#06B6D4' },
          { label: '☀️ Sunlight', value: sun, set: setSun, color: '#F59E0B' },
          { label: '🧪 Nutrients', value: nutrients, set: setNutrients, color: '#8B5CF6' },
        ].map(({ label, value, set, color }) => (
          <div key={label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '800', color: '#334155', marginBottom: '4px' }}>
              <span>{label}</span><span style={{ color }}>{value}%</span>
            </div>
            <input type="range" min="0" max="100" value={value} onChange={e => set(+e.target.value)} style={{ width: '100%', accentColor: color }} />
          </div>
        ))}
        {!earned ? (
          <button onClick={complete} style={{ padding: '12px', borderRadius: '12px', background: 'linear-gradient(135deg,#10B981,#059669)', color: '#fff', border: 'none', fontWeight: '900', cursor: 'pointer' }}>
            ✅ Mark Experiment Complete (+15 XP)
          </button>
        ) : (
          <div style={{ textAlign: 'center', color: '#059669', fontWeight: '900' }}>🎉 Experiment Complete! +15 XP Earned</div>
        )}
      </div>
    </div>
  );
}

/* ── Main Page ── */
export const VirtualLab = () => {
  const { language, awardXP } = useStudent();
  const isOdia = language === 'or';
  const [active, setActive] = useState('water');

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <style>{`
        @keyframes fall { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(60px);opacity:0} }
        @keyframes riseUp { 0%{transform:translateY(0);opacity:0.8} 100%{transform:translateY(-40px);opacity:0} }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px' }}>
          🧪 {isOdia ? 'ଭର୍ଚ୍ୟୁଆଲ୍ ଲ୍ୟାବ' : 'VIRTUAL SCIENCE LAB'}
        </h1>
        <p style={{ color: '#64748B', fontSize: '13px', fontWeight: '600', marginTop: '4px' }}>
          {isOdia ? 'ଇଣ୍ଟରାକ୍ଟିଭ୍ ପ୍ରୟୋଗ ଦ୍ୱାରା ବିଜ୍ଞାନ ଓ ଗଣିତ ଅନ୍ୱେଷଣ କରନ୍ତୁ!' : 'Explore Science & Math through interactive hands-on experiments!'}
        </p>
      </div>

      {/* Lab selector tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '24px' }}>
        {LABS.map(lab => (
          <button key={lab.id} onClick={() => setActive(lab.id)} style={{
            padding: '14px 10px', borderRadius: '16px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.25s',
            background: active === lab.id ? lab.bg : '#F8FAFC',
            color: active === lab.id ? '#fff' : '#64748B',
            boxShadow: active === lab.id ? `0 6px 16px ${lab.color}40` : '0 2px 6px rgba(0,0,0,0.04)',
            transform: active === lab.id ? 'translateY(-2px)' : 'none',
            border: active === lab.id ? `2px solid ${lab.color}` : '1px solid #E2E8F0'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '4px' }}>{lab.emoji}</div>
            <div style={{ fontSize: '12px', fontWeight: '900' }}>{lab.label}</div>
            <div style={{ fontSize: '10px', fontWeight: '700', opacity: 0.8 }}>{lab.sublabel}</div>
          </button>
        ))}
      </div>

      {/* Experiment panels */}
      {active === 'water'    && <WaterCycleLab awardXP={awardXP} />}
      {active === 'fraction' && <FractionLab   awardXP={awardXP} />}
      {active === 'circuit'  && <CircuitLab    awardXP={awardXP} />}
      {active === 'plant'    && <PlantLab      awardXP={awardXP} />}
    </div>
  );
};

export default VirtualLab;

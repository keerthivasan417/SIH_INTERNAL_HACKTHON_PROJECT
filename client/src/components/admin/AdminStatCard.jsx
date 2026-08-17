import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function AdminStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'blue',
  trend,
  trendPositive = true,
}) {
  const cardVariantClass = {
    blue: 'card-blue',
    green: 'card-green',
    yellow: 'card-yellow',
    coral: 'card-coral',
    purple: 'card-purple',
    teal: '',
  }[variant] || '';

  const accentColor = {
    blue: '#1e40af',
    green: '#065f46',
    yellow: '#92400e',
    coral: '#991b1b',
    purple: '#5b21b6',
    teal: 'var(--teal-primary)',
  }[variant] || 'var(--teal-primary)';

  const iconBg = {
    blue: '#dbeafe',
    green: '#d1fae5',
    yellow: '#fef3c7',
    coral: '#fee2e2',
    purple: '#ede9fe',
    teal: 'var(--teal-light)',
  }[variant] || 'var(--teal-light)';

  return (
    <div className={`pastel-card ${cardVariantClass}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {title}
        </span>
        {Icon && (
          <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: iconBg, color: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={20} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
        <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>
          {value}
        </div>
        {trend && (
          <span 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.2rem', 
              fontSize: '0.78rem', 
              fontWeight: 700, 
              color: trendPositive ? '#059669' : '#dc2626' 
            }}
          >
            {trendPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 'auto' }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

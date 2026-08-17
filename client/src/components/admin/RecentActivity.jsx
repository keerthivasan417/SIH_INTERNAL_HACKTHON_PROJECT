import React from 'react';
import { 
  FileCheck, 
  HelpCircle, 
  CalendarCheck, 
  Award, 
  TrendingUp, 
  Clock 
} from 'lucide-react';

export default function RecentActivity({ activities = [] }) {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'assignment':
        return { icon: FileCheck, color: 'var(--teal-primary)', bg: 'var(--teal-light)' };
      case 'quiz':
        return { icon: HelpCircle, color: '#b45309', bg: '#fef3c7' };
      case 'attendance':
        return { icon: CalendarCheck, color: '#047857', bg: '#d1fae5' };
      case 'milestone':
        return { icon: Award, color: '#6d28d9', bg: '#ede9fe' };
      case 'improvement':
      default:
        return { icon: TrendingUp, color: '#0284c7', bg: '#e0f2fe' };
    }
  };

  if (!activities.length) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        No recent activities logged today.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {activities.map((item) => {
        const { icon: Icon, color, bg } = getActivityIcon(item.type);
        return (
          <div 
            key={item.id} 
            style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '0.85rem', 
              padding: '0.75rem 0',
              borderBottom: '1px solid #f1f5f9'
            }}
          >
            <div 
              style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '10px', 
                background: bg, 
                color: color, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                flexShrink: 0,
                marginTop: '0.1rem'
              }}
            >
              <Icon size={18} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h5 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {item.title}
                </h5>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <Clock size={12} /> {item.time}
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                {item.description}
              </p>
              {item.badge && (
                <span className="pill-badge" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', marginTop: '0.4rem', background: '#f8fafc' }}>
                  {item.badge}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

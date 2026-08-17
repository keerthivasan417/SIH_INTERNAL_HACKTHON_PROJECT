import React from 'react';
import { CalendarCheck, UserCheck, UserX, AlertCircle } from 'lucide-react';

export default function AttendanceTable({ classAttendanceList = [], onSelectClass }) {
  const getRateColor = (rate) => {
    if (rate >= 90) return '#059669';
    if (rate >= 80) return 'var(--teal-primary)';
    if (rate >= 75) return '#d97706';
    return '#dc2626';
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Class & Section</th>
            <th>Total Strength</th>
            <th>Present Today</th>
            <th>Absent Today</th>
            <th>Attendance Rate</th>
            <th>Status Indicator</th>
          </tr>
        </thead>
        <tbody>
          {classAttendanceList.map((item) => {
            const rateColor = getRateColor(item.rate);
            return (
              <tr 
                key={item.classId}
                style={{ cursor: onSelectClass ? 'pointer' : 'default' }}
                onClick={() => onSelectClass && onSelectClass(item.classId)}
              >
                <td style={{ fontWeight: 800, color: 'var(--teal-primary)' }}>
                  {item.className}
                </td>
                <td style={{ fontWeight: 600 }}>{item.total} Students</td>
                <td style={{ color: '#065f46', fontWeight: 700 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <UserCheck size={15} /> {item.present}
                  </span>
                </td>
                <td style={{ color: '#991b1b', fontWeight: 700 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <UserX size={15} /> {item.absent}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ flex: 1, maxWidth: '100px', height: '6px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                      <div 
                        style={{ 
                          width: `${Math.min(100, Math.max(0, item.rate))}%`, 
                          height: '100%', 
                          background: rateColor 
                        }} 
                      />
                    </div>
                    <strong style={{ color: rateColor }}>{item.rate}%</strong>
                  </div>
                </td>
                <td>
                  <span 
                    className={`pill-badge ${
                      item.rate >= 90 ? 'pill-green' : item.rate >= 80 ? 'pill-teal' : item.rate >= 75 ? 'pill-yellow' : 'pill-coral'
                    }`}
                    style={{ fontSize: '0.72rem', padding: '0.15rem 0.55rem' }}
                  >
                    {item.rate >= 90 ? 'Optimal' : item.rate >= 80 ? 'Good' : item.rate >= 75 ? 'Moderate' : 'Low Alert'}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ExplanationCard = ({ reasons }) => {
  if (!reasons || reasons.length === 0) return null;
  
  return (
    <div className="glass-card mt-2" style={{ borderColor: 'var(--warning-yellow)' }}>
      <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--warning-yellow)' }}>
        <AlertTriangle size={20} />
        <h4 style={{ margin: 0 }}>AI Analysis</h4>
      </div>
      <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
        {reasons.map((reason, idx) => (
          <li key={idx} className="mb-1">{reason}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExplanationCard;

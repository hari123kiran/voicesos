import React from 'react';

const ConfidenceMeter = ({ confidence, label }) => {
  const getColor = () => {
    if (confidence > 80) return 'var(--danger-red)';
    if (confidence > 50) return 'var(--warning-yellow)';
    return 'var(--success-green)';
  };

  return (
    <div className="glass-card mt-2">
      <div className="flex justify-between items-center mb-1">
        <h4 style={{ margin: 0 }}>Distress Confidence</h4>
        <span style={{ color: getColor(), fontWeight: 'bold' }}>{confidence}%</span>
      </div>
      <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ width: `${confidence}%`, height: '100%', background: getColor(), transition: 'width 0.5s ease' }}></div>
      </div>
      <p className="mt-1 text-center" style={{ color: getColor() }}>{label}</p>
    </div>
  );
};

export default ConfidenceMeter;

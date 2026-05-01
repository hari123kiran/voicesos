import React, { useEffect, useState } from 'react';
import { Shield, ChevronRight } from 'lucide-react';
import { checkHealth } from '../services/api';

const LandingScreen = ({ onNext }) => {
  const [health, setHealth] = useState('Checking backend...');

  useEffect(() => {
    const checkBackend = async () => {
      const res = await checkHealth();
      if (res && res.status === 'ok') {
        setHealth('Backend Connected ✅');
      } else {
        setHealth('Backend Disconnected ❌');
      }
    };
    checkBackend();
  }, []);

  return (
    <div className="screen justify-center items-center text-center">
      <div style={{ marginBottom: '3rem' }}>
        <Shield size={100} className="text-neon" style={{ margin: '0 auto', filter: 'drop-shadow(0 0 20px var(--neon-blue-glow))' }} />
        <h1 className="text-neon mt-4" style={{ fontSize: '2.5rem' }}>VoiceSOS</h1>
        <p className="mt-1">AI-Powered Women's Safety</p>
      </div>
      
      <div className="glass-card mb-4" style={{ padding: '0.75rem 1.5rem', borderRadius: '30px' }}>
        <p style={{ margin: 0, fontSize: '0.9rem', color: health.includes('✅') ? 'var(--success-green)' : 'var(--warning-yellow)' }}>
          {health}
        </p>
      </div>

      <button className="btn btn-primary" onClick={onNext} style={{ marginTop: '2rem' }}>
        Get Started <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default LandingScreen;

import React, { useState, useEffect } from 'react';
import { History, Shield, MicOff, MapPin } from 'lucide-react';
import EmergencyButton from '../components/EmergencyButton';
import StatusCard from '../components/StatusCard';
import { getLocalContacts } from '../services/storage';

const HomeScreen = ({ onTriggerSOS, onViewHistory }) => {
  const [contactName, setContactName] = useState('No contact set');

  useEffect(() => {
    const contacts = getLocalContacts();
    if (contacts && contacts.length > 0) {
      setContactName(contacts[contacts.length - 1].name);
    }
  }, []);

  return (
    <div className="screen">
      <div className="flex justify-between items-center mb-4 mt-2">
        <h2 style={{ margin: 0 }}>VoiceSOS</h2>
        <button className="btn-ghost" onClick={onViewHistory} style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', border: 'none', cursor: 'pointer', color: '#fff' }}>
          <History size={24} />
        </button>
      </div>

      <StatusCard 
        title="Protection Status" 
        status="Active & Ready" 
        icon={Shield} 
        colorClass="text-success-green" 
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <EmergencyButton onTrigger={onTriggerSOS} isListening={false} />
        <p className="text-center mt-4">Tap the button above or say your trigger phrase to activate SOS.</p>
      </div>

      <div className="mt-4">
        <div className="glass-card flex justify-between items-center" style={{ padding: '1rem' }}>
          <div className="flex items-center gap-2">
            <MicOff size={20} className="text-secondary" />
            <span style={{ fontSize: '0.9rem' }}>Background Listening</span>
          </div>
          <div style={{ background: 'var(--card-border)', width: '40px', height: '20px', borderRadius: '10px', position: 'relative' }}>
            <div style={{ width: '16px', height: '16px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;

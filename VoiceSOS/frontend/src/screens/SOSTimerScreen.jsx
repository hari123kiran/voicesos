import React, { useState, useEffect } from 'react';
import { XCircle, Volume2 } from 'lucide-react';
import EmergencyButton from '../components/EmergencyButton';
import { classifyDistress } from '../ai/distressModel';
import { saveAlert } from '../services/api';
import { getLocalContacts } from '../services/storage';

const SOSTimerScreen = ({ onCancel, onAlertSent }) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [status, setStatus] = useState('Recording audio & analyzing...');
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          triggerAlert();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const triggerAlert = async () => {
    setStatus('Analyzing with AI...');
    // Simulated AI call
    const aiResult = await classifyDistress("Help me!");
    
    // Get contact
    const contacts = getLocalContacts();
    const contact = contacts.length > 0 ? contacts[contacts.length - 1] : { name: "Unknown", phone: "" };
    
    // Create alert object
    const alertData = {
      status: "sent",
      triggerPhrase: "Help me!",
      confidence: aiResult.confidence,
      label: aiResult.label,
      reasons: aiResult.reasons,
      location: {
        lat: 37.7749,
        lng: -122.4194,
        mapLink: "https://www.google.com/maps?q=37.7749,-122.4194"
      },
      audioUrl: null, // Simulated for now
      contactName: contact.name,
      contactPhone: contact.phone
    };
    
    // Save to backend
    const saved = await saveAlert(alertData);
    if (saved) {
      onAlertSent(saved);
    } else {
      // Fallback if backend fails
      onAlertSent({ ...alertData, id: Date.now().toString(), timestamp: new Date().toISOString() });
    }
  };

  return (
    <div className="screen justify-center items-center">
      <h2 className="text-neon mb-1">SOS Triggered</h2>
      <p className="text-center text-secondary mb-4">{status}</p>
      
      <div style={{ position: 'relative', width: '200px', height: '200px', margin: '2rem auto' }}>
        <div style={{ 
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
          borderRadius: '50%', border: '8px solid rgba(255,59,48,0.2)',
          borderTopColor: 'var(--danger-red)',
          animation: 'spin 2s linear infinite'
        }}></div>
        <div style={{ 
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          fontSize: '4rem', fontWeight: 'bold', color: 'var(--danger-red)'
        }}>
          {timeLeft}
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-4 glass-card" style={{ padding: '0.5rem 1rem' }}>
        <Volume2 size={20} className="text-neon" />
        <span>Recording surround audio</span>
      </div>

      <div style={{ flex: 1 }}></div>

      <button className="btn btn-outline" onClick={onCancel} style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>
        <XCircle size={20} /> Cancel SOS
      </button>
      
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default SOSTimerScreen;

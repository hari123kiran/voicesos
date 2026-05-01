import React, { useState } from 'react';
import { User, Phone, CheckCircle } from 'lucide-react';
import { saveContact } from '../services/api';
import { saveLocalContact, saveUserSettings } from '../services/storage';

const SetupScreen = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name || !phone) return;
    setLoading(true);
    
    const contact = { name, phone };
    // Save to backend
    await saveContact(contact);
    // Save locally
    saveLocalContact(contact);
    // Mark setup complete
    saveUserSettings({ hasCompletedSetup: true });
    
    setLoading(false);
    onComplete();
  };

  return (
    <div className="screen">
      <h2 className="mt-4 mb-1">Setup Contacts</h2>
      <p className="mb-4">Add your primary emergency contact. We'll notify them if you're in distress.</p>
      
      <div className="glass-card flex-col gap-4">
        <div className="flex items-center gap-2" style={{ background: 'rgba(0,0,0,0.2)', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
          <User size={20} className="text-secondary" />
          <input 
            type="text" 
            placeholder="Contact Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: '#fff', width: '100%', outline: 'none' }}
          />
        </div>
        
        <div className="flex items-center gap-2 mt-2" style={{ background: 'rgba(0,0,0,0.2)', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
          <Phone size={20} className="text-secondary" />
          <input 
            type="tel" 
            placeholder="Phone Number (with country code)" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: '#fff', width: '100%', outline: 'none' }}
          />
        </div>
      </div>
      
      <div style={{ flex: 1 }}></div>
      
      <button 
        className="btn btn-primary" 
        onClick={handleSave} 
        disabled={loading || !name || !phone}
      >
        <CheckCircle size={20} /> {loading ? 'Saving...' : 'Complete Setup'}
      </button>
    </div>
  );
};

export default SetupScreen;

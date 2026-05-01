import React from 'react';
import { CheckCircle, MapPin, Phone, User, X } from 'lucide-react';
import ConfidenceMeter from '../components/ConfidenceMeter';
import ExplanationCard from '../components/ExplanationCard';
import StatusCard from '../components/StatusCard';

const AlertSentScreen = ({ alertData, onHome }) => {
  if (!alertData) return null;

  return (
    <div className="screen" style={{ overflowY: 'auto' }}>
      <div className="flex justify-between items-center mb-4 mt-2">
        <h2 style={{ margin: 0 }}>Alert Sent</h2>
        <button onClick={onHome} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>
          <X size={24} />
        </button>
      </div>
      
      <div className="flex-col items-center justify-center mb-4 text-center">
        <div style={{ background: 'rgba(52, 199, 89, 0.2)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
          <CheckCircle size={60} className="text-success-green" />
        </div>
        <h3 className="text-success-green">Emergency Contacts Notified</h3>
        <p>Location and audio clip sent.</p>
      </div>

      <div className="glass-card mb-2" style={{ padding: '1rem' }}>
        <h4 className="mb-2">Alert Details</h4>
        
        <div className="flex items-center gap-2 mb-2">
          <User size={16} className="text-secondary" />
          <span className="text-secondary" style={{ width: '80px' }}>Contact:</span>
          <span>{alertData.contactName || 'Unknown'}</span>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <Phone size={16} className="text-secondary" />
          <span className="text-secondary" style={{ width: '80px' }}>Phone:</span>
          <span>{alertData.contactPhone || 'N/A'}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-secondary" />
          <span className="text-secondary" style={{ width: '80px' }}>Location:</span>
          <a href={alertData.location?.mapLink} target="_blank" rel="noreferrer" style={{ color: 'var(--neon-blue)', textDecoration: 'none' }}>
            View on Map
          </a>
        </div>
      </div>

      <ConfidenceMeter confidence={alertData.confidence} label={alertData.label} />
      <ExplanationCard reasons={alertData.reasons} />
      
      <div style={{ flex: 1 }}></div>
      
      <button className="btn btn-primary mt-4" onClick={onHome}>
        Return Home
      </button>
    </div>
  );
};

export default AlertSentScreen;

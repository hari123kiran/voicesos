import React, { useState, useEffect } from 'react';
import { X, Clock, MapPin, AlertTriangle } from 'lucide-react';
import { getAlerts } from '../services/api';

const AlertHistoryScreen = ({ onBack }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      const data = await getAlerts();
      // Sort newest first
      setAlerts(data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      setLoading(false);
    };
    fetchAlerts();
  }, []);

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const d = new Date(isoString);
    return d.toLocaleString();
  };

  return (
    <div className="screen">
      <div className="flex justify-between items-center mb-4 mt-2">
        <h2 style={{ margin: 0 }}>Alert History</h2>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>
          <X size={24} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {loading ? (
          <p className="text-center mt-4">Loading history...</p>
        ) : alerts.length === 0 ? (
          <div className="text-center mt-4 text-secondary">
            <Clock size={40} className="mb-2" style={{ opacity: 0.5 }} />
            <p>No alerts triggered yet.</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className="glass-card mb-2" style={{ padding: '1rem' }}>
              <div className="flex justify-between items-center mb-2">
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {formatDate(alert.timestamp)}
                </span>
                <span style={{ 
                  fontSize: '0.7rem', 
                  padding: '2px 8px', 
                  borderRadius: '10px',
                  background: alert.status === 'sent' ? 'rgba(52, 199, 89, 0.2)' : 'rgba(255, 204, 0, 0.2)',
                  color: alert.status === 'sent' ? 'var(--success-green)' : 'var(--warning-yellow)'
                }}>
                  {alert.status.toUpperCase()}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={16} className={alert.confidence > 80 ? 'text-danger-red' : 'text-warning-yellow'} />
                <span style={{ fontWeight: 'bold' }}>{alert.label} ({alert.confidence}%)</span>
              </div>
              
              {alert.triggerPhrase && (
                <div className="mb-2 text-secondary" style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>
                  "{alert.triggerPhrase}"
                </div>
              )}
              
              {alert.location && (
                <div className="flex items-center gap-2 mt-2 pt-2" style={{ borderTop: '1px solid var(--card-border)' }}>
                  <MapPin size={16} className="text-neon" />
                  <a href={alert.location.mapLink} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: 'var(--neon-blue)', textDecoration: 'none' }}>
                    View Location
                  </a>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlertHistoryScreen;

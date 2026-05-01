import React from "react";
import { CheckCircle, MapPin, Volume2, Phone, ArrowLeft } from "lucide-react";

export default function AlertSentScreen({ alert, onBackHome }) {
  return (
    <div className="mobile-container">
      <div style={{ textAlign: "center", marginTop: 32, marginBottom: 24 }}>
        <CheckCircle size={72} color="var(--safe-green)" style={{ filter: "drop-shadow(0 0 25px rgba(16,185,129,0.5))" }} />
        <div style={{ fontSize: 22, fontWeight: 700, marginTop: 16 }}>Alert Sent</div>
        <div style={{ color: "var(--text-secondary)", fontSize: 13, marginTop: 4 }}>
          Your trusted contact has been notified
        </div>
      </div>

      <div className="glass-card">
        <div className="section-title">Alert Details</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-muted)" }}>Sent to</span>
            <span>{alert.contactName}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-muted)" }}>AI Confidence</span>
            <span style={{ color: "var(--danger-red)", fontWeight: 700 }}>{alert.confidence}%</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--text-muted)" }}>Trigger</span>
            <span style={{ fontStyle: "italic" }}>"{alert.triggerPhrase}"</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--neon-blue)" }}>
            <MapPin size={14} />
            {alert.location?.lat ? (
              <a href={alert.location.mapLink} target="_blank" rel="noreferrer" style={{ color: "var(--neon-blue)" }}>
                View location on map
              </a>
            ) : <span>Location unavailable</span>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: alert.audioUrl ? "var(--safe-green)" : "var(--text-muted)" }}>
            <Volume2 size={14} />
            {alert.audioUrl ? "Audio evidence saved ✓" : "Audio unavailable"}
          </div>
        </div>
      </div>

      {alert.waLink && (
        <a href={alert.waLink} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
          <button className="btn btn-primary" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Phone size={18} />
            Open WhatsApp Alert
          </button>
        </a>
      )}

      <button className="btn btn-ghost" onClick={onBackHome} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 10 }}>
        <ArrowLeft size={18} />
        Back to Home
      </button>
    </div>
  );
}

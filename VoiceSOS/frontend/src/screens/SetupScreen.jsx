import React, { useState, useEffect } from "react";
import { Shield, User, Phone, ChevronRight } from "lucide-react";
import { saveLocalContact, getLocalContact } from "../services/storage";
import { saveContact } from "../services/api";

export default function SetupScreen({ onContinue }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const existing = getLocalContact();
    if (existing) {
      setName(existing.name);
      setPhone(existing.phone);
    }
  }, []);

  async function handleSave() {
    if (!name.trim() || !phone.trim()) {
      alert("Please enter both name and phone (with country code, e.g. 919876543210)");
      return;
    }
    setSaving(true);
    const contact = { name: name.trim(), phone: phone.trim().replace(/\D/g, "") };
    saveLocalContact(contact);
    try { await saveContact(contact); } catch (e) { console.warn("Backend save failed"); }
    setSaving(false);
    onContinue();
  }

  return (
    <div className="mobile-container">
      <div style={{ textAlign: "center", marginTop: 24, marginBottom: 32 }}>
        <Shield size={56} color="var(--neon-blue)" style={{ filter: "drop-shadow(0 0 20px var(--neon-blue-glow))" }} />
        <div className="app-title" style={{ marginTop: 12, fontSize: 28 }}>VoiceSOS</div>
        <div className="app-subtitle">Say Help. Stay Protected.</div>
      </div>

      <div className="glass-card">
        <div className="section-title">Trusted Contact</div>
        <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.5 }}>
          This person will receive your SOS alert with location and audio evidence.
        </div>

        <div style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, color: "var(--text-muted)", fontSize: 12 }}>
            <User size={14} /> Name
          </div>
          <input className="input" placeholder="e.g. Mom" value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, color: "var(--text-muted)", fontSize: 12 }}>
            <Phone size={14} /> Phone (with country code)
          </div>
          <input className="input" placeholder="919876543210" value={phone} onChange={e => setPhone(e.target.value)} />
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>
            Format: country code + number, no + or spaces
          </div>
        </div>
      </div>

      <button className="btn btn-primary" onClick={handleSave} disabled={saving} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8 }}>
        {saving ? "Saving..." : "Continue to Safety Mode"}
        <ChevronRight size={18} />
      </button>

      <div style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "center", marginTop: 24, lineHeight: 1.6 }}>
        🔒 Your contact is stored locally on your device.<br />
        Audio recording starts only after SOS trigger and microphone permission.
      </div>
    </div>
  );
}

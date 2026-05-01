import React, { useState, useRef } from "react";
import { Mic, Send, Shield, AlertTriangle, History } from "lucide-react";
import ConfidenceMeter from "../components/ConfidenceMeter";
import ExplanationCard from "../components/ExplanationCard";
import { classifyDistress, datasetInfo } from "../ai/distressModel";

const QUICK_PHRASES = [
  "help help",
  "plis help me",
  "halp halp",
  "i am in danger",
  "someone is following me",
  "hello how are you",
  "help me with homework"
];

export default function HomeScreen({ onTriggerSOS, onViewHistory }) {
  const [phrase, setPhrase] = useState("");
  const [result, setResult] = useState({ confidence: 0, label: "Safe", reasons: [] });
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  function runClassifier(input) {
    const r = classifyDistress(input);
    // Map "Normal" to "Safe" for the meter UI
    const displayLabel = r.label === "Normal" ? "Safe" : r.label;
    setResult({ ...r, label: displayLabel });
    // Auto-trigger SOS for Emergency
    if (r.label === "Emergency" && onTriggerSOS) {
      onTriggerSOS({ phrase: input, ...r });
    }
  }

  function handleSubmit() {
    if (!phrase.trim()) return;
    runClassifier(phrase.trim());
  }

  function handleQuickChip(p) {
    setPhrase(p);
    runClassifier(p);
  }

  function startVoice() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert("Voice detection not supported in this browser. Use Chrome or use the text input below for demo.");
      return;
    }
    const recognition = new SR();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setPhrase(text);
      runClassifier(text);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  }

  const badgeClass =
    result.label === "Emergency" ? "badge badge-danger" :
    result.label === "Possible Distress" ? "badge badge-warn" :
    "badge badge-safe";

  return (
    <div className="mobile-container">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Shield size={22} color="var(--neon-blue)" />
          <span style={{ fontWeight: 700, fontSize: 18 }}>VoiceSOS</span>
        </div>
        <button onClick={onViewHistory} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)" }}>
          <History size={20} />
        </button>
      </div>

      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <span className={badgeClass}>{result.label}</span>
      </div>

      <ConfidenceMeter value={result.confidence} label="AI Distress Confidence" />

      <div className="glass-card">
        <div className="section-title">Voice Detection</div>
        <button
          className={`btn ${listening ? "btn-danger" : "btn-primary"}`}
          onClick={startVoice}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
        >
          <Mic size={18} />
          {listening ? "Listening... say something" : "Start Voice Detection"}
        </button>
        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 8, textAlign: "center" }}>
          VoiceSOS listens only when you tap the button. Best in Chrome.
        </div>
      </div>

      <div className="glass-card">
        <div className="section-title">Test AI Detection (Demo)</div>
        <div className="chips-row">
          {QUICK_PHRASES.map(p => (
            <span key={p} className="quick-chip" onClick={() => handleQuickChip(p)}>
              {p}
            </span>
          ))}
        </div>
        <div className="row">
          <input
            className="input"
            placeholder="Type a phrase..."
            value={phrase}
            onChange={e => setPhrase(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
          />
          <button className="btn btn-ghost" style={{ flex: "0 0 auto", width: 56 }} onClick={handleSubmit}>
            <Send size={18} />
          </button>
        </div>
      </div>

      <ExplanationCard reasons={result.reasons} />

      <button
        className="btn btn-danger"
        onClick={() => onTriggerSOS && onTriggerSOS({ phrase: "Manual HELP button", confidence: 100, label: "Emergency", reasons: ["Manual HELP button pressed by user"] })}
        style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
      >
        <AlertTriangle size={20} />
        HELP
      </button>

      <div style={{ fontSize: 10, color: "var(--text-muted)", textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
        AI Engine: Custom Distress Classifier · {datasetInfo.totalSamples} samples<br />
        Method: Levenshtein fuzzy matching + weighted scoring<br />
        No external datasets · No Kaggle · Built ethically
      </div>
    </div>
  );
}

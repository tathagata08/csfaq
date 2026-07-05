import React, { useEffect, useState } from "react";
import { Search, X, Mic, MicOff } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder,
  showVoice = true,
  inputRef,
}) {
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) setVoiceSupported(false);
  }, []);

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = "en-IN";
    rec.interimResults = false;
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    rec.onresult = (e) => onChange(e.results[0][0].transcript);
    rec.start();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Search
        size={18}
        style={{
          position: "absolute",
          left: 18,
          top: "50%",
          transform: "translateY(-50%)",
          color: "#8A8370",
        }}
      />
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: showVoice && voiceSupported ? "16px 86px 16px 48px" : "16px 48px",
          borderRadius: 4,
          border: "1.5px solid #C9C2AD",
          background: "#FBF9F4",
          fontSize: 15.5,
          fontFamily: "inherit",
          color: "#1E2A44",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 14,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {value && (
          <button
            onClick={() => onChange("")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#8A8370",
              display: "flex",
            }}
          >
            <X size={16} />
          </button>
        )}
        {showVoice && voiceSupported && (
          <button
            onClick={startVoice}
            className={`mic-btn ${listening ? "listening" : ""}`}
            style={{
              border: "1px solid #C9C2AD",
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              cursor: "pointer",
              color: "#1E2A44",
            }}
          >
            {listening ? <MicOff size={14} /> : <Mic size={14} />}
          </button>
        )}
      </div>
    </div>
  );
}
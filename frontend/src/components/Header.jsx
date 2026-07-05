import React from "react";

const TABS = [
  ["home", "Home"],
  ["faq", "FAQ"],
  ["community", "Community"],
];

export default function Header({ tab, onTabChange }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36, flexWrap: "wrap", gap: 12 }}>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, letterSpacing: "0.12em", color: "#2F6F62", fontWeight: 600, textTransform: "uppercase" }}>
        VINS · Vicharanashala Internship
      </div>
      <div style={{ display: "flex", gap: 4, background: "#E3DFD1", padding: 4, borderRadius: 8 }}>
        {TABS.map(([id, label]) => (
          <button
            key={id}
            className={`tab-btn ${tab === id ? "active" : ""}`}
            onClick={() => onTabChange(id)}
            style={{
              padding: "7px 16px",
              borderRadius: 6,
              border: "none",
              background: tab === id ? "#1E2A44" : "transparent",
              color: tab === id ? "#EDEAE0" : "#1E2A44",
              fontSize: 13.5,
              fontWeight: 500,
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
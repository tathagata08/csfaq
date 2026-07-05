import React from "react";
import { Sparkles } from "lucide-react";

export default function InsightsPanel({ missedSearches, escalatedQueries }) {
  return (
    <div
      style={{
        background: "#1E2A44",
        color: "#EDEAE0",
        borderRadius: 8,
        padding: "20px 24px",
        marginBottom: 28,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 6,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: "#E8A33D",
        }}
      >
        <Sparkles size={14} /> Catalog gaps
      </div>
      <p
        style={{
          fontSize: 13,
          color: "#B9C0D4",
          marginTop: 0,
          marginBottom: 14,
          lineHeight: 1.6,
        }}
      >
        Searches that returned nothing — feeds directly into escalation and admin review.
      </p>
      {missedSearches.length === 0 ? (
        <p style={{ fontSize: 13.5, color: "#8A93AC", margin: 0 }}>No gaps logged yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {missedSearches
            .sort((a, b) => b.count - a.count)
            .map((m) => (
              <div
                key={m.query}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#28365640",
                  borderRadius: 4,
                  padding: "8px 12px",
                  fontSize: 13.5,
                }}
              >
                <span>"{m.query}"</span>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 11,
                    background: escalatedQueries.includes(m.query)
                      ? "#2F6F62"
                      : "#E8A33D",
                    color: escalatedQueries.includes(m.query) ? "#fff" : "#1E2A44",
                    padding: "2px 8px",
                    borderRadius: 3,
                    fontWeight: 600,
                  }}
                >
                  {escalatedQueries.includes(m.query) ? "escalated" : `×${m.count} unfiled`}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
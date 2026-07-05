import React from "react";
import { ArrowRight, Check } from "lucide-react";

export default function EmptyState({ query, isEscalated, onEscalate }) {
  return (
    <div
      style={{
        border: "1.5px dashed #C9C2AD",
        borderRadius: 8,
        padding: "48px 32px",
        textAlign: "center",
        background: "#FBF9F4",
      }}
    >
      <div
        style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 22,
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        Nothing filed under that yet.
      </div>
      <p
        style={{
          color: "#4A5670",
          fontSize: 14.5,
          maxWidth: 420,
          margin: "0 auto 20px",
          lineHeight: 1.6,
        }}
      >
        No card matches "{query}". Send it to the escalation queue.
      </p>
      {!isEscalated ? (
        <button
          onClick={onEscalate}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#E8A33D",
            color: "#1E2A44",
            border: "none",
            borderRadius: 4,
            padding: "11px 20px",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Submit "{query}" to escalation <ArrowRight size={15} />
        </button>
      ) : (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "#2F6F62",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          <Check size={16} /> Filed
        </div>
      )}
    </div>
  );
}
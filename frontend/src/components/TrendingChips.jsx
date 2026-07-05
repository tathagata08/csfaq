import React from "react";

export default function TrendingChips({ trending, votes, onClick }) {
  if (trending.length === 0) return null;

  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.1em",
          color: "#8A8370",
          marginBottom: 10,
          textTransform: "uppercase",
        }}
      >
        Trending
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {trending.slice(0, 3).map((f) => (
          <button
            key={f.id}
            onClick={() => onClick(f.q)}
            className="related-chip"
            style={{
              background: "#FBF9F4",
              border: "1px solid #C9C2AD",
              borderRadius: 20,
              padding: "7px 14px",
              fontSize: 13,
              color: "#1E2A44",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {f.q}{" "}
            <span
              style={{
                opacity: 0.6,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
              }}
            >
              ↑{votes[f.id].up}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
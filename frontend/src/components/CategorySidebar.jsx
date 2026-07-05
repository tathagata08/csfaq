import React from "react";
import { CATEGORIES, FAQS } from "../services/faqService";

export default function CategorySidebar({ activeCat, onCategoryChange }) {
  const counts = {};
  for (const cat of CATEGORIES) {
    counts[cat.id] = FAQS.filter((f) => f.cat === cat.id).length;
  }

  return (
    <div className="faq-sidebar" style={{ position: "sticky", top: 24, alignSelf: "start" }}>
      <div
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.1em",
          color: "#8A8370",
          marginBottom: 12,
          textTransform: "uppercase",
        }}
      >
        Drawers
      </div>
      <button
        className={`cat-btn ${activeCat === "all" ? "active" : ""}`}
        onClick={() => onCategoryChange("all")}
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          textAlign: "left",
          padding: "10px 12px",
          borderRadius: 4,
          border: "1px solid #C9C2AD",
          background: activeCat === "all" ? "#1E2A44" : "transparent",
          color: activeCat === "all" ? "#EDEAE0" : "#1E2A44",
          marginBottom: 6,
          cursor: "pointer",
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        <span>All questions</span>
        <span style={{ opacity: 0.6 }}>{FAQS.length}</span>
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          className={`cat-btn ${activeCat === cat.id ? "active" : ""}`}
          onClick={() => onCategoryChange(cat.id)}
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            textAlign: "left",
            padding: "10px 12px",
            borderRadius: 4,
            border: "1px solid #C9C2AD",
            background: activeCat === cat.id ? "#1E2A44" : "transparent",
            color: activeCat === cat.id ? "#EDEAE0" : "#1E2A44",
            marginBottom: 6,
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          <span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                opacity: 0.7,
                marginRight: 8,
              }}
            >
              {cat.code}
            </span>
            {cat.label}
          </span>
          <span style={{ opacity: 0.6 }}>{counts[cat.id]}</span>
        </button>
      ))}
    </div>
  );
}
import React from "react";

export default function AskQuestionForm({ value, onChange, onSubmit, onCancel }) {
  return (
    <div
      style={{
        background: "#FBF9F4",
        border: "1px solid #C9C2AD",
        borderRadius: 8,
        padding: 16,
        marginBottom: 20,
      }}
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What's your question?"
        rows={3}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 4,
          border: "1px solid #C9C2AD",
          fontFamily: "inherit",
          fontSize: 14,
          resize: "vertical",
          marginBottom: 10,
        }}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={onSubmit}
          style={{
            background: "#1E2A44",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "8px 16px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Post
        </button>
        <button
          onClick={onCancel}
          style={{
            background: "transparent",
            border: "1px solid #C9C2AD",
            borderRadius: 4,
            padding: "8px 16px",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
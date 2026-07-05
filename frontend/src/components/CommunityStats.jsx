import React from "react";
import { Users, MessageSquare, CircleCheck, CircleAlert } from "lucide-react";

export default function CommunityStats({ posts }) {
  const responseRate = Math.round(
    (posts.filter((p) => p.status === "answered").length / posts.length) * 100
  );
  const answeredCount = posts.filter((p) => p.status === "answered").length;
  const unansweredCount = posts.filter((p) => p.status === "open").length;

  const stats = [
    { icon: Users, label: "Response rate", val: `${responseRate}%`, color: "#2F6F62" },
    { icon: MessageSquare, label: "Total threads", val: posts.length, color: "#1E2A44" },
    { icon: CircleCheck, label: "Answered", val: answeredCount, color: "#2F6F62" },
    { icon: CircleAlert, label: "Unanswered", val: unansweredCount, color: "#B04A3A" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 12,
        marginBottom: 24,
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          style={{
            background: "#FBF9F4",
            border: "1px solid #C9C2AD",
            borderRadius: 8,
            padding: "14px 16px",
          }}
        >
          <s.icon size={16} color={s.color} style={{ marginBottom: 8 }} />
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              fontFamily: "'Source Serif 4', serif",
            }}
          >
            {s.val}
          </div>
          <div style={{ fontSize: 12, color: "#8A8370" }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}
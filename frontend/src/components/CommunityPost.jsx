import React from "react";
import { ThumbsUp, MessageSquare, CircleCheck, CircleAlert } from "lucide-react";
import { CATEGORIES, CONFIDENCE_STYLE } from "../services/faqService";

export default function CommunityPost({ post }) {
  const conf = post.confidence ? CONFIDENCE_STYLE[post.confidence] : null;
  const categoryLabel = CATEGORIES.find((c) => c.id === post.cat)?.label;

  return (
    <div
      key={post.id}
      className="card"
      style={{
        background: "#FBF9F4",
        border: "1px solid #C9C2AD",
        borderRadius: 8,
        padding: "16px 18px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginBottom: 8,
          flexWrap: "wrap",
        }}
      >
        {post.status === "answered" ? (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 12,
              fontWeight: 600,
              color: "#2F6F62",
              background: "var(--bg-success)",
              padding: "3px 9px",
              borderRadius: 4,
            }}
          >
            <CircleCheck size={12} /> Answered
          </span>
        ) : (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 12,
              fontWeight: 600,
              color: "#B04A3A",
              background: "#3A2020",
              padding: "3px 9px",
              borderRadius: 4,
            }}
          >
            <CircleAlert size={12} /> Open
          </span>
        )}
        {conf && (
          <span
            style={{
              fontSize: 11.5,
              fontWeight: 600,
              padding: "3px 9px",
              borderRadius: 4,
              background: conf.bg,
              color: conf.text,
            }}
          >
            {conf.label}
          </span>
        )}
        <span
          style={{
            fontSize: 11.5,
            color: "#8A8370",
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          {categoryLabel}
        </span>
      </div>
      <h3
        style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 16.5,
          fontWeight: 600,
          margin: "0 0 6px",
        }}
      >
        {post.q}
      </h3>
      {post.body && (
        <p
          style={{
            fontSize: 13.5,
            color: "#4A5670",
            margin: "0 0 12px",
            lineHeight: 1.6,
          }}
        >
          {post.body}
        </p>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 12,
          color: "#8A8370",
        }}
      >
        <span>
          {post.author} · {post.date}
        </span>
        <span style={{ display: "flex", gap: 12 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <ThumbsUp size={13} /> {post.upvotes}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <MessageSquare size={13} /> {post.comments}
          </span>
        </span>
      </div>
    </div>
  );
}
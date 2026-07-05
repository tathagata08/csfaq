import React from "react";
import {
  Link2,
  Check,
  Clock,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
} from "lucide-react";

export default function FaqCard({
  faq,
  voteData,
  onVote,
  copiedId,
  onCopyLink,
  onRelatedClick,
  relatedFaqs,
}) {
  const v = voteData;

  return (
    <div
      key={faq.id}
      className="card"
      style={{
        background: "#FBF9F4",
        border: "1px solid #C9C2AD",
        borderRadius: 6,
        padding: "20px 22px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "baseline",
          }}
        >
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
              color: "#2F6F62",
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            {faq.id}
          </span>

          <h3
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 18,
              fontWeight: 600,
              margin: 0,
              lineHeight: 1.35,
            }}
          >
            {faq.q}
          </h3>
        </div>

        <button
          onClick={() => onCopyLink(faq.id)}
          style={{
            background: "none",
            border: "none",
            color: "#8A8370",
            cursor: "pointer",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 12,
          }}
        >
          {copiedId === faq.id ? (
            <Check size={15} />
          ) : (
            <Link2 size={15} />
          )}
        </button>
      </div>

      <p
        style={{
          fontSize: 14.5,
          lineHeight: 1.65,
          color: "#3A4356",
          marginTop: 10,
          marginBottom: 14,
        }}
      >
        {faq.a}
      </p>

      {relatedFaqs && relatedFaqs.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 14,
          }}
        >
          {relatedFaqs.map((r) => (
            <button
              key={r.id}
              className="related-chip"
              onClick={() => onRelatedClick(r.q)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                background: "transparent",
                border: "1px solid #C9C2AD",
                borderRadius: 20,
                padding: "4px 10px 4px 12px",
                fontSize: 12,
                color: "#4A5670",
              }}
            >
              {r.q.length > 34
                ? r.q.slice(0, 34) + "…"
                : r.q}

              <ChevronRight size={12} />
            </button>
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 12,
            color: "#8A8370",
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Clock size={12} />

            {faq.updatedDaysAgo === 0
              ? "today"
              : `${faq.updatedDaysAgo}d ago`}
          </span>

          <span>· {faq.views} views</span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 6,
          }}
        >
          <button
            onClick={() => onVote(faq.id, "up")}
            className={`vote-btn ${
              v.user === "up" ? "active-up" : ""
            }`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              border: "1px solid #C9C2AD",
              borderRadius: 4,
              padding: "5px 10px",
              background: "transparent",
              cursor: "pointer",
              fontSize: 12.5,
              color: "inherit",
            }}
          >
            <ThumbsUp size={13} /> {v.up}
          </button>

          <button
            onClick={() => onVote(faq.id, "down")}
            className={`vote-btn ${
              v.user === "down" ? "active-down" : ""
            }`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              border: "1px solid #C9C2AD",
              borderRadius: 4,
              padding: "5px 10px",
              background: "transparent",
              cursor: "pointer",
              fontSize: 12.5,
              color: "inherit",
            }}
          >
            <ThumbsDown size={13} /> {v.down}
          </button>
        </div>
      </div>
    </div>
  );
}
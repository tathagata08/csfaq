import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Search, ThumbsUp, ThumbsDown, Link2, Clock, ArrowRight, X, Check,
  Mic, MicOff, BarChart3, ChevronRight, Sparkles,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Seed content — Vicharanashala Internship FAQ (VINS)
// Written from scratch for this demo; not copied from any source.
// ---------------------------------------------------------------------------

const CATEGORIES = [
  { id: "about", label: "About the internship", code: "01" },
  { id: "timing", label: "Timing & dates", code: "02" },
  { id: "teams", label: "Teams & formation", code: "03" },
  { id: "coursework", label: "Coursework & VIBE", code: "04" },
  { id: "logistics", label: "NOC, hostel & stipend", code: "05" },
];

const FAQS = [
  {
    id: "1.1",
    cat: "about",
    q: "What is the Vicharanashala internship?",
    a: "It's a two-month, fully remote research engagement at Prof. Sudarshan Iyengar's lab at IIT Ropar. Selected candidates work on real open-source software across Annam.AI (agriculture) and ViBe (education), plus other ongoing lab projects.",
    updatedDaysAgo: 2,
    votes: { up: 34, down: 2 },
  },
  {
    id: "1.2",
    cat: "about",
    q: "What is VINS?",
    a: "VINS is the tracking system on the Samagama portal that shows your current phase, badges earned, and next steps in the internship. It's the single source of truth for where you stand.",
    updatedDaysAgo: 2,
    votes: { up: 21, down: 0 },
  },
  {
    id: "1.3",
    cat: "about",
    q: "What are the phases, and what do the badges mean?",
    a: "The internship runs through numbered weekly phases. Each phase has a coursework requirement and a project milestone. Completing both unlocks a badge, visible on your VINS panel, that gates access to the next phase's material.",
    updatedDaysAgo: 5,
    votes: { up: 18, down: 1 },
  },
  {
    id: "1.4",
    cat: "about",
    q: "Who is this for? Are alumni eligible?",
    a: "Open to any candidate who cleared the AI interview stage, regardless of college or year. Alumni of the lab's earlier cohorts can re-apply for a new project cycle but can't skip phases from a prior run.",
    updatedDaysAgo: 9,
    votes: { up: 12, down: 3 },
  },
  {
    id: "2.1",
    cat: "timing",
    q: "When can I start?",
    a: "Cohorts open on a rolling basis through 2026. Once selected, you get 48 hours from your first login to join the orientation Zoom and download the Starter Kit before Week 1 officially begins.",
    updatedDaysAgo: 1,
    votes: { up: 27, down: 0 },
  },
  {
    id: "2.2",
    cat: "timing",
    q: "How long is the internship?",
    a: "Two months, full attention. It is not designed to run alongside a second internship or a heavy course load — plan your semester accordingly before you commit.",
    updatedDaysAgo: 6,
    votes: { up: 15, down: 1 },
  },
  {
    id: "2.3",
    cat: "timing",
    q: "Can I start in July, August, or later if I have exams right now?",
    a: "Yes. New cohorts open monthly. If you're mid-exam, it's better to join the next cohort start date than to join now and fall behind in Week 1 team formation.",
    updatedDaysAgo: 3,
    votes: { up: 22, down: 0 },
  },
  {
    id: "2.4",
    cat: "timing",
    q: "Can I start with my cohort and take a relaxation during my exam window?",
    a: "Short relaxations are handled case by case through Yaksha or your mentor — but the two-month clock doesn't pause, so a relaxation shortens your effective working time rather than extending the deadline.",
    updatedDaysAgo: 3,
    votes: { up: 9, down: 2 },
  },
  {
    id: "3.1",
    cat: "teams",
    q: "How are the 10-member teams formed?",
    a: "Teams self-organize in Week 1 through Zoom breakout rooms and the Discourse forum. You can start a team, join an open one, or lead. The lab asks you to avoid clustering entirely with people from your own college so teams stay mixed.",
    updatedDaysAgo: 4,
    votes: { up: 31, down: 1 },
  },
  {
    id: "3.2",
    cat: "teams",
    q: "What if my team can't agree on how to split the FAQ/forum project?",
    a: "The lab fixes *what* has to be built — a working question → evaluate → answer → verify → FAQ pipeline — but leaves *how* the team splits the work entirely up to you. Assigning clear owners per module early avoids overlap later.",
    updatedDaysAgo: 4,
    votes: { up: 19, down: 0 },
  },
  {
    id: "4.1",
    cat: "coursework",
    q: "What does Week 1 coursework cover?",
    a: "Summership Orientation plus a Fundamentals of AI module, both self-paced on VIBE. You're expected to finish both before Week 2's checkpoint.",
    updatedDaysAgo: 2,
    votes: { up: 14, down: 0 },
  },
  {
    id: "4.2",
    cat: "coursework",
    q: "How much of the MERN Stack course do I need to finish by Week 2?",
    a: "50%. It's paced so the frontend fundamentals land right before your team starts building the actual FAQ/forum interface, so don't rush ahead of the project needs.",
    updatedDaysAgo: 7,
    votes: { up: 11, down: 1 },
  },
  {
    id: "5.1",
    cat: "logistics",
    q: "Is a stipend provided?",
    a: "This program is structured as a research and learning engagement rather than a paid role — check the current cohort's Starter Kit for the exact terms, since these are set per cycle.",
    updatedDaysAgo: 10,
    votes: { up: 8, down: 4 },
  },
  {
    id: "5.2",
    cat: "logistics",
    q: "Do I need an NOC from my college?",
    a: "Most colleges require one for any external internship listed on your resume — request it from your department early, since it can take longer than the lab's own onboarding.",
    updatedDaysAgo: 10,
    votes: { up: 16, down: 0 },
  },
  {
    id: "5.3",
    cat: "logistics",
    q: "Is hostel accommodation provided at IIT Ropar?",
    a: "No — the internship is conducted entirely online. You work from your own location for the full two months; there's no on-campus component to plan travel or housing around.",
    updatedDaysAgo: 10,
    votes: { up: 25, down: 0 },
  },
];

// ---------------------------------------------------------------------------
// Lightweight fuzzy match — no external deps
// ---------------------------------------------------------------------------
function fuzzyScore(query, text) {
  if (!query) return 1;
  const q = query.toLowerCase().trim();
  const t = text.toLowerCase();
  if (t.includes(q)) return 2 + q.length / t.length;
  let qi = 0;
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) qi++;
  }
  return qi === q.length ? 0.5 : 0;
}

// crude keyword overlap for "related questions"
function relatedTo(target, pool, n = 3) {
  const words = (s) =>
    new Set(
      s
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .split(/\s+/)
        .filter((w) => w.length > 3)
    );
  const targetWords = words(target.q + " " + target.a);
  return pool
    .filter((f) => f.id !== target.id)
    .map((f) => {
      const fw = words(f.q + " " + f.a);
      let overlap = 0;
      for (const w of fw) if (targetWords.has(w)) overlap++;
      const sameCat = f.cat === target.cat ? 1 : 0;
      return { f, score: overlap + sameCat * 0.5 };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((x) => x.f);
}

export default function FAQCatalog() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [votes, setVotes] = useState(() =>
    Object.fromEntries(FAQS.map((f) => [f.id, { ...f.votes, user: null }]))
  );
  const [copiedId, setCopiedId] = useState(null);
  const [escalatedQueries, setEscalatedQueries] = useState([]);
  const [missedSearches, setMissedSearches] = useState([]); // {query, count}
  const [showInsights, setShowInsights] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const searchRef = useRef(null);
  const missLoggedRef = useRef(new Set());

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) setVoiceSupported(false);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "/" && document.activeElement !== searchRef.current) {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape") {
        setQuery("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const results = useMemo(() => {
    let list = FAQS;
    if (activeCat !== "all") list = list.filter((f) => f.cat === activeCat);
    if (query.trim()) {
      list = list
        .map((f) => ({
          f,
          score: Math.max(fuzzyScore(query, f.q), fuzzyScore(query, f.a) * 0.6),
        }))
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((x) => x.f);
    }
    return list;
  }, [query, activeCat]);

  // log misses once per distinct query per session
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 3) return;
    if (results.length > 0) return;
    if (missLoggedRef.current.has(q)) return;
    const t = setTimeout(() => {
      missLoggedRef.current.add(q);
      setMissedSearches((prev) => {
        const existing = prev.find((m) => m.query === q);
        if (existing) {
          return prev.map((m) => (m.query === q ? { ...m, count: m.count + 1 } : m));
        }
        return [...prev, { query: q, count: 1 }];
      });
    }, 600); // debounce so mid-typing keystrokes aren't logged
    return () => clearTimeout(t);
  }, [query, results.length]);

  const counts = useMemo(() => {
    const c = {};
    for (const cat of CATEGORIES) c[cat.id] = FAQS.filter((f) => f.cat === cat.id).length;
    return c;
  }, []);

  const trending = useMemo(
    () => [...FAQS].sort((a, b) => votes[b.id].up - votes[a.id].up).slice(0, 3),
    [votes]
  );

  const vote = (id, dir) => {
    setVotes((prev) => {
      const cur = prev[id];
      const already = cur.user;
      let up = cur.up, down = cur.down, user = dir;
      if (already === dir) {
        if (dir === "up") up -= 1; else down -= 1;
        user = null;
      } else {
        if (already === "up") up -= 1;
        if (already === "down") down -= 1;
        if (dir === "up") up += 1; else down += 1;
      }
      return { ...prev, [id]: { up, down, user } };
    });
  };

  const copyLink = (id) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const escalate = () => {
    setEscalatedQueries((prev) => [...prev, query]);
  };

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = "en-IN";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setQuery(transcript);
    };
    rec.start();
  };

  const isEscalated = escalatedQueries.includes(query);

  return (
    <div
      style={{
        minHeight: "100%",
        background: "#EDEAE0",
        fontFamily: "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif",
        color: "#1E2A44",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,500;8..60,600;8..60,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');
        .faq-root * { box-sizing: border-box; }
        .faq-root ::selection { background: #E8A33D55; }
        .cat-btn { transition: background .15s ease, color .15s ease, border-color .15s ease; }
        .cat-btn:hover { background: #E3DFD1; }
        .cat-btn.active { background: #1E2A44; color: #EDEAE0; }
        .card { transition: transform .15s ease, box-shadow .15s ease; }
        .card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(30,42,68,0.10); }
        .vote-btn { transition: background .15s ease, color .15s ease; }
        .vote-btn:hover { background: #1E2A4412; }
        .vote-btn.active-up { background: #2F6F62; color: #fff; }
        .vote-btn.active-down { background: #B04A3A; color: #fff; }
        .link-btn:hover { color: #E8A33D; }
        .mic-btn { transition: background .15s ease, color .15s ease; }
        .mic-btn:hover { background: #1E2A4412; }
        .mic-btn.listening { background: #B04A3A; color: #fff; animation: pulse 1.2s ease-in-out infinite; }
        .related-chip { transition: background .15s ease, border-color .15s ease; cursor: pointer; }
        .related-chip:hover { background: #1E2A44; color: #EDEAE0; border-color: #1E2A44; }
        .insights-toggle:hover { opacity: 0.75; }
        input:focus { outline: none; }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(176,74,58,0.4); } 50% { box-shadow: 0 0 0 6px rgba(176,74,58,0); } }
        @media (max-width: 760px) {
          .faq-layout { grid-template-columns: 1fr !important; }
          .faq-sidebar { position: static !important; order: 2; }
        }
      `}</style>

      <div className="faq-root" style={{ maxWidth: 1180, margin: "0 auto", padding: "48px 24px 96px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, marginBottom: 32, flexWrap: "wrap" }}>
          <div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12,
                letterSpacing: "0.12em",
                color: "#2F6F62",
                fontWeight: 600,
                marginBottom: 10,
                textTransform: "uppercase",
              }}
            >
              VINS · Vicharanashala Internship · Card Catalog
            </div>
            <h1
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontWeight: 700,
                fontSize: "clamp(32px, 5vw, 48px)",
                margin: 0,
                lineHeight: 1.08,
                letterSpacing: "-0.01em",
              }}
            >
              Ask the register.
            </h1>
            <p style={{ maxWidth: 560, marginTop: 12, fontSize: 15.5, lineHeight: 1.6, color: "#4A5670" }}>
              Every question the lab has answered before, filed and searchable. Can't find yours?
              It goes to the escalation queue, gets answered, and gets filed here for the next person.
            </p>
          </div>

          <button
            className="insights-toggle"
            onClick={() => setShowInsights((s) => !s)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#1E2A44",
              color: "#EDEAE0",
              border: "none",
              borderRadius: 5,
              padding: "10px 16px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <BarChart3 size={15} />
            {missedSearches.length > 0 ? `${missedSearches.length} gaps found` : "Insights"}
          </button>
        </div>

        {/* Insights panel — this is what a teammate building the admin dashboard would consume */}
        {showInsights && (
          <div
            style={{
              background: "#1E2A44",
              color: "#EDEAE0",
              borderRadius: 8,
              padding: "20px 24px",
              marginBottom: 28,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "#E8A33D" }}>
              <Sparkles size={14} /> Catalog gaps
            </div>
            <p style={{ fontSize: 13, color: "#B9C0D4", marginTop: 0, marginBottom: 14, lineHeight: 1.6 }}>
              Real-time log of searches that returned nothing. This feeds directly into the team's
              escalation queue and admin dashboard — every gap here is a candidate for a new FAQ card.
            </p>
            {missedSearches.length === 0 ? (
              <p style={{ fontSize: 13.5, color: "#8A93AC", margin: 0 }}>No gaps logged yet — try searching for something that isn't in the catalog.</p>
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
                          background: escalatedQueries.includes(m.query) ? "#2F6F62" : "#E8A33D",
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
        )}

        {/* Trending strip */}
        {!query && activeCat === "all" && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.1em", color: "#8A8370", marginBottom: 10, textTransform: "uppercase" }}>
              Most consulted this week
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {trending.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setQuery(f.q)}
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
                  {f.q} <span style={{ opacity: 0.6, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11 }}>↑{votes[f.id].up}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search */}
        <div style={{ position: "relative", marginBottom: 28 }}>
          <Search
            size={18}
            style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: "#8A8370" }}
          />
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the catalog — try “hostel”, “stipend”, “team”…"
            style={{
              width: "100%",
              padding: voiceSupported ? "16px 86px 16px 48px" : "16px 48px",
              borderRadius: 4,
              border: "1.5px solid #C9C2AD",
              background: "#FBF9F4",
              fontSize: 15.5,
              fontFamily: "inherit",
              color: "#1E2A44",
            }}
          />
          <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: 8 }}>
            {query && (
              <button
                onClick={() => setQuery("")}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#8A8370", display: "flex" }}
              >
                <X size={16} />
              </button>
            )}
            {voiceSupported && (
              <button
                onClick={startVoice}
                title="Search by voice"
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
            {!query && (
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  color: "#8A8370",
                  border: "1px solid #C9C2AD",
                  borderRadius: 3,
                  padding: "2px 6px",
                }}
              >
                /
              </span>
            )}
          </div>
        </div>

        <div className="faq-layout" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 32 }}>
          {/* Sidebar */}
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
              onClick={() => setActiveCat("all")}
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
                onClick={() => setActiveCat(cat.id)}
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
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, opacity: 0.7, marginRight: 8 }}>
                    {cat.code}
                  </span>
                  {cat.label}
                </span>
                <span style={{ opacity: 0.6 }}>{counts[cat.id]}</span>
              </button>
            ))}
          </div>

          {/* Results */}
          <div>
            {results.length === 0 ? (
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
                <p style={{ color: "#4A5670", fontSize: 14.5, maxWidth: 420, margin: "0 auto 20px", lineHeight: 1.6 }}>
                  No card in the catalog matches "{query}". Send it to the escalation queue —
                  a mentor answers it, and it gets filed here so the next person finds it instantly.
                </p>
                {!isEscalated ? (
                  <button
                    onClick={escalate}
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
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#2F6F62", fontWeight: 600, fontSize: 14 }}>
                    <Check size={16} /> Filed — you'll be pinged when it's answered
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: "grid", gap: 14 }}>
                {results.map((f) => {
                  const v = votes[f.id];
                  const related = relatedTo(f, FAQS);
                  return (
                    <div
                      key={f.id}
                      id={`faq-${f.id}`}
                      className="card"
                      style={{
                        background: "#FBF9F4",
                        border: "1px solid #C9C2AD",
                        borderRadius: 6,
                        padding: "20px 22px",
                        position: "relative",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                        <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                          <span
                            style={{
                              fontFamily: "'IBM Plex Mono', monospace",
                              fontSize: 12,
                              color: "#2F6F62",
                              fontWeight: 600,
                              flexShrink: 0,
                            }}
                          >
                            {f.id}
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
                            {f.q}
                          </h3>
                        </div>
                        <button
                          className="link-btn"
                          onClick={() => copyLink(f.id)}
                          title="Copy link to this card"
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
                          {copiedId === f.id ? <Check size={15} /> : <Link2 size={15} />}
                        </button>
                      </div>

                      <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "#3A4356", marginTop: 10, marginBottom: 14 }}>
                        {f.a}
                      </p>

                      {related.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                          {related.map((r) => (
                            <button
                              key={r.id}
                              className="related-chip"
                              onClick={() => {
                                setActiveCat("all");
                                setQuery(r.q);
                              }}
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
                              {r.q.length > 34 ? r.q.slice(0, 34) + "…" : r.q}
                              <ChevronRight size={12} />
                            </button>
                          ))}
                        </div>
                      )}

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            fontSize: 12,
                            color: "#8A8370",
                            fontFamily: "'IBM Plex Mono', monospace",
                          }}
                        >
                          <Clock size={12} />
                          {f.updatedDaysAgo === 0 ? "updated today" : `updated ${f.updatedDaysAgo}d ago`}
                        </div>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button
                            onClick={() => vote(f.id, "up")}
                            className={`vote-btn ${v.user === "up" ? "active-up" : ""}`}
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
                            onClick={() => vote(f.id, "down")}
                            className={`vote-btn ${v.user === "down" ? "active-down" : ""}`}
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
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

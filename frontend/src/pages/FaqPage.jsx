import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Search,
  TrendingUp,
  Clock,
  Tag,
  ChevronRight,
  BarChart3,
  Plus,
} from "lucide-react";

import "../styles/faq.css";

import {
  CATEGORIES,
  FAQS,
  COMMUNITY_POSTS,
  fuzzyScore,
  relatedTo,
} from "../services/faqService";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import FaqCard from "../components/FaqCard";
import CategorySidebar from "../components/CategorySidebar";
import InsightsPanel from "../components/InsightsPanel";
import TrendingChips from "../components/TrendingChips";
import EmptyState from "../components/EmptyState";
import CommunityStats from "../components/CommunityStats";
import CommunityPost from "../components/CommunityPost";
import AskQuestionForm from "../components/AskQuestionForm";

export default function FAQPortal() {
  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------

  const [tab, setTab] = useState("home");
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("all");

  const [votes, setVotes] = useState(() =>
    Object.fromEntries(
      FAQS.map((f) => [
        f.id,
        {
          ...f.votes,
          user: null,
        },
      ])
    )
  );

  const [copiedId, setCopiedId] = useState(null);
  const [escalatedQueries, setEscalatedQueries] = useState([]);
  const [missedSearches, setMissedSearches] = useState([]);
  const [showInsights, setShowInsights] = useState(false);
  const [communityFilter, setCommunityFilter] = useState("all");
  const [showAsk, setShowAsk] = useState(false);
  const [newQ, setNewQ] = useState("");
  const [posts, setPosts] = useState(COMMUNITY_POSTS);

  const searchRef = useRef(null);
  const missLoggedRef = useRef(new Set());

  // ---------------------------------------------------------------------------
  // EFFECTS
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const handler = (e) => {
      if (
        e.key === "/" &&
        document.activeElement !== searchRef.current &&
        tab === "faq"
      ) {
        e.preventDefault();
        searchRef.current?.focus();
      }

      if (e.key === "Escape") {
        setQuery("");
        searchRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [tab]);

  // ---------------------------------------------------------------------------
  // COMPUTED VALUES
  // ---------------------------------------------------------------------------

  const results = useMemo(() => {
    let list = FAQS;

    if (activeCat !== "all") {
      list = list.filter((f) => f.cat === activeCat);
    }

    if (query.trim()) {
      list = list
        .map((f) => ({
          f,
          score: Math.max(
            fuzzyScore(query, f.q),
            fuzzyScore(query, f.a) * 0.6
          ),
        }))
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((x) => x.f);
    }

    return list;
  }, [query, activeCat]);

  // Log missed searches
  useEffect(() => {
    if (tab !== "faq") return;

    const q = query.trim().toLowerCase();

    if (
      q.length < 3 ||
      results.length > 0 ||
      missLoggedRef.current.has(q)
    ) {
      return;
    }

    const t = setTimeout(() => {
      missLoggedRef.current.add(q);

      setMissedSearches((prev) => {
        const existing = prev.find((m) => m.query === q);

        return existing
          ? prev.map((m) =>
              m.query === q
                ? {
                    ...m,
                    count: m.count + 1,
                  }
                : m
            )
          : [
              ...prev,
              {
                query: q,
                count: 1,
              },
            ];
      });
    }, 600);

    return () => clearTimeout(t);
  }, [query, results.length, tab]);

  const counts = useMemo(() => {
    const c = {};

    for (const cat of CATEGORIES) {
      c[cat.id] = FAQS.filter((f) => f.cat === cat.id).length;
    }

    return c;
  }, []);

  const trending = useMemo(
    () =>
      [...FAQS]
        .sort((a, b) => votes[b.id].up - votes[a.id].up)
        .slice(0, 5),
    [votes]
  );

  const mostViewed = useMemo(
    () =>
      [...FAQS]
        .sort((a, b) => b.views - a.views)
        .slice(0, 3),
    []
  );

  const mostRecent = useMemo(
    () =>
      [...FAQS]
        .sort(
          (a, b) =>
            a.updatedDaysAgo - b.updatedDaysAgo
        )
        .slice(0, 3),
    []
  );

  const communityList = useMemo(() => {
    if (communityFilter === "all") {
      return posts;
    }

    if (communityFilter === "unanswered") {
      return posts.filter(
        (p) => p.status === "open"
      );
    }

    return posts.filter(
      (p) => p.status === "answered"
    );
  }, [posts, communityFilter]);

  // ---------------------------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------------------------

  const vote = (id, dir) => {
    setVotes((prev) => {
      const cur = prev[id];
      const already = cur.user;

      let up = cur.up;
      let down = cur.down;
      let user = dir;

      if (already === dir) {
        if (dir === "up") {
          up--;
        } else {
          down--;
        }

        user = null;
      } else {
        if (already) {
          already === "up"
            ? up--
            : down--;
        }

        dir === "up"
          ? up++
          : down++;
      }

      return {
        ...prev,
        [id]: {
          up,
          down,
          user,
        },
      };
    });
  };

  const copyLink = (id) => {
    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 1500);
  };

  const escalate = () => {
    setEscalatedQueries((prev) => [
      ...prev,
      query,
    ]);
  };

  const isEscalated =
    escalatedQueries.includes(query);

  const jumpToCategory = (catId) => {
    setTab("faq");
    setActiveCat(catId);
    setQuery("");
  };

  const jumpToFaqSearch = (q) => {
    setTab("faq");
    setActiveCat("all");
    setQuery(q);
  };

  const submitQuestion = () => {
    if (!newQ.trim()) return;

    setPosts((prev) => [
      {
        id: `c${prev.length + 1}`,
        q: newQ,
        body: "",
        status: "open",
        confidence: null,
        author: "You",
        date: "Just now",
        upvotes: 0,
        comments: 0,
        cat: "about",
      },
      ...prev,
    ]);

    setNewQ("");
    setShowAsk(false);
  };

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  return (
    <div
      style={{
        minHeight: "100%",
        background: "#EDEAE0",
        fontFamily:
          "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif",
        color: "#1E2A44",
      }}
    >
      <div
        className="faq-root"
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "32px 24px 96px",
        }}
      >
        {/* Top nav */}

        <Header
          tab={tab}
          onTabChange={setTab}
        />

        {/* ============================= HOME ============================= */}

        {tab === "home" && (
          <div>
            <div
              style={{
                textAlign: "center",
                marginBottom: 32,
              }}
            >
              <h1
                style={{
                  fontFamily:
                    "'Source Serif 4', serif",
                  fontWeight: 700,
                  fontSize:
                    "clamp(32px, 5vw, 46px)",
                  margin: "0 0 12px",
                  lineHeight: 1.08,
                }}
              >
                Ask. Discover. Get solved.
              </h1>

              <p
                style={{
                  color: "#4A5670",
                  fontSize: 15.5,
                  marginBottom: 10,
                }}
              >
                Search your doubt or explore solved
                questions from the community.
              </p>

              <p
                style={{
                  fontFamily:
                    "'IBM Plex Mono', monospace",
                  fontSize: 12.5,
                  color: "#8A8370",
                }}
              >
                {FAQS.length} FAQs ·{" "}
                {CATEGORIES.length} categories ·{" "}
                {posts.length} community threads
              </p>
            </div>

            <div
              style={{
                position: "relative",
                marginBottom: 36,
                maxWidth: 720,
                margin: "0 auto 40px",
              }}
            >
              <Search
                size={18}
                style={{
                  position: "absolute",
                  left: 18,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#8A8370",
                }}
              />

              <input
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    jumpToFaqSearch(query);
                  }
                }}
                placeholder="Ask anything about your internship..."
                style={{
                  width: "100%",
                  padding:
                    "16px 120px 16px 48px",
                  borderRadius: 6,
                  border:
                    "1.5px solid #C9C2AD",
                  background: "#FBF9F4",
                  fontSize: 15.5,
                  fontFamily: "inherit",
                  color: "#1E2A44",
                }}
              />

              <button
                onClick={() =>
                  jumpToFaqSearch(query)
                }
                style={{
                  position: "absolute",
                  right: 6,
                  top: 6,
                  bottom: 6,
                  padding: "0 18px",
                  background: "#2F6F62",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  fontWeight: 500,
                  fontSize: 13.5,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Search size={14} />
                Search
              </button>
            </div>

            <div
              className="home-grid"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr 1fr",
                gap: 20,
              }}
            >
              {/* Most popular */}

              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 14,
                  }}
                >
                  <TrendingUp
                    size={16}
                    color="#2F6F62"
                  />

                  <span
                    style={{
                      fontWeight: 600,
                      fontFamily:
                        "'Source Serif 4', serif",
                      fontSize: 17,
                    }}
                  >
                    Most popular
                  </span>
                </div>

                {mostViewed.map((f, i) => (
                  <button
                    key={f.id}
                    onClick={() =>
                      jumpToFaqSearch(f.q)
                    }
                    className="card"
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      background: "#FBF9F4",
                      border:
                        "1px solid #C9C2AD",
                      borderRadius: 8,
                      padding: "12px 14px",
                      marginBottom: 10,
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                      }}
                    >
                      <span
                        style={{
                          fontFamily:
                            "'IBM Plex Mono', monospace",
                          fontSize: 11,
                          color: "#8A8370",
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </span>

                      <div>
                        <p
                          style={{
                            fontSize: 13.5,
                            fontWeight: 500,
                            margin: "0 0 4px",
                          }}
                        >
                          {f.q}
                        </p>

                        <p
                          style={{
                            fontSize: 11.5,
                            color: "#8A8370",
                            margin: 0,
                          }}
                        >
                          {
                            CATEGORIES.find(
                              (c) =>
                                c.id === f.cat
                            )?.label
                          }{" "}
                          · {f.views} views
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Recent FAQs */}

              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 14,
                  }}
                >
                  <Clock
                    size={16}
                    color="#2F6F62"
                  />

                  <span
                    style={{
                      fontWeight: 600,
                      fontFamily:
                        "'Source Serif 4', serif",
                      fontSize: 17,
                    }}
                  >
                    Recent FAQs
                  </span>
                </div>

                {mostRecent.map((f, i) => (
                  <button
                    key={f.id}
                    onClick={() =>
                      jumpToFaqSearch(f.q)
                    }
                    className="card"
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      background: "#FBF9F4",
                      border:
                        "1px solid #C9C2AD",
                      borderRadius: 8,
                      padding: "12px 14px",
                      marginBottom: 10,
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                      }}
                    >
                      <span
                        style={{
                          fontFamily:
                            "'IBM Plex Mono', monospace",
                          fontSize: 11,
                          color: "#8A8370",
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </span>

                      <div>
                        <p
                          style={{
                            fontSize: 13.5,
                            fontWeight: 500,
                            margin: "0 0 4px",
                          }}
                        >
                          {f.q}
                        </p>

                        <p
                          style={{
                            fontSize: 11.5,
                            color: "#8A8370",
                            margin: 0,
                          }}
                        >
                          {f.updatedDaysAgo === 0
                            ? "today"
                            : `${f.updatedDaysAgo}d ago`}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Categories */}

              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 14,
                  }}
                >
                  <Tag
                    size={16}
                    color="#2F6F62"
                  />

                  <span
                    style={{
                      fontWeight: 600,
                      fontFamily:
                        "'Source Serif 4', serif",
                      fontSize: 17,
                    }}
                  >
                    Browse categories
                  </span>
                </div>

                {CATEGORIES.slice(0, 6).map(
                  (cat) => (
                    <button
                      key={cat.id}
                      onClick={() =>
                        jumpToCategory(cat.id)
                      }
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems: "center",
                        width: "100%",
                        textAlign: "left",
                        background:
                          "transparent",
                        border:
                          "1px solid #C9C2AD",
                        borderRadius: 8,
                        padding: "10px 14px",
                        marginBottom: 8,
                        cursor: "pointer",
                        fontSize: 13.5,
                      }}
                    >
                      <span>{cat.label}</span>

                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          color: "#8A8370",
                          fontSize: 12,
                        }}
                      >
                        {counts[cat.id]}
                        <ChevronRight size={13} />
                      </span>
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================= FAQ ============================= */}

        {tab === "faq" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "flex-start",
                gap: 20,
                marginBottom: 28,
                flexWrap: "wrap",
              }}
            >
              <div>
                <h1
                  style={{
                    fontFamily:
                      "'Source Serif 4', serif",
                    fontWeight: 700,
                    fontSize:
                      "clamp(26px, 4vw, 36px)",
                    margin: "0 0 8px",
                  }}
                >
                  Ask the register.
                </h1>

                <p
                  style={{
                    maxWidth: 520,
                    fontSize: 14.5,
                    lineHeight: 1.6,
                    color: "#4A5670",
                    margin: 0,
                  }}
                >
                  Every question the lab has answered
                  before, filed and searchable. Can't
                  find yours? It goes to the escalation
                  queue.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowInsights((s) => !s)
                }
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

                {missedSearches.length > 0
                  ? `${missedSearches.length} gaps found`
                  : "Insights"}
              </button>
            </div>

            {showInsights && (
              <InsightsPanel
                missedSearches={
                  missedSearches
                }
                escalatedQueries={
                  escalatedQueries
                }
              />
            )}

            {!query &&
              activeCat === "all" && (
                <TrendingChips
                  trending={trending}
                  votes={votes}
                  onClick={setQuery}
                />
              )}

            <div
              style={{
                position: "relative",
                marginBottom: 28,
              }}
            >
              <SearchBar
                value={query}
                onChange={setQuery}
                placeholder="Search the catalog — try 'hostel', 'NOC', 'team'…"
                inputRef={searchRef}
              />
            </div>

            <div
              className="faq-layout"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "220px 1fr",
                gap: 32,
              }}
            >
              <CategorySidebar
                activeCat={activeCat}
                onCategoryChange={
                  setActiveCat
                }
              />

              <div>
                {results.length === 0 ? (
                  <EmptyState
                    query={query}
                    isEscalated={
                      isEscalated
                    }
                    onEscalate={escalate}
                  />
                ) : (
                  <div
                    style={{
                      display: "grid",
                      gap: 14,
                    }}
                  >
                    {results.map((f) => (
                      <FaqCard
                        key={f.id}
                        faq={f}
                        voteData={
                          votes[f.id]
                        }
                        onVote={vote}
                        copiedId={
                          copiedId
                        }
                        onCopyLink={
                          copyLink
                        }
                        onRelatedClick={(
                          q
                        ) => {
                          setActiveCat(
                            "all"
                          );
                          setQuery(q);
                        }}
                        relatedFaqs={relatedTo(
                          f,
                          FAQS
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================= COMMUNITY ============================= */}

        {tab === "community" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "flex-start",
                gap: 16,
                marginBottom: 24,
                flexWrap: "wrap",
              }}
            >
              <div>
                <h1
                  style={{
                    fontFamily:
                      "'Source Serif 4', serif",
                    fontWeight: 700,
                    fontSize:
                      "clamp(26px, 4vw, 34px)",
                    margin: "0 0 6px",
                  }}
                >
                  Community board
                </h1>

                <p
                  style={{
                    color: "#4A5670",
                    fontSize: 14,
                    margin: 0,
                  }}
                >
                  Ask anything, get answers from peers
                  and mentors.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowAsk(true)
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#2F6F62",
                  color: "#fff",
                  border: "none",
                  borderRadius: 5,
                  padding: "10px 16px",
                  fontWeight: 600,
                  fontSize: 13.5,
                  cursor: "pointer",
                }}
              >
                <Plus size={15} />
                Ask a question
              </button>
            </div>

            {showAsk && (
              <AskQuestionForm
                value={newQ}
                onChange={setNewQ}
                onSubmit={submitQuestion}
                onCancel={() =>
                  setShowAsk(false)
                }
              />
            )}

            <CommunityStats posts={posts} />

            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 20,
              }}
            >
              {[
                ["all", "All"],
                [
                  "unanswered",
                  "Unanswered",
                ],
                [
                  "answered",
                  "Answered",
                ],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() =>
                    setCommunityFilter(id)
                  }
                  className={`cat-btn ${
                    communityFilter === id
                      ? "active"
                      : ""
                  }`}
                  style={{
                    padding: "7px 14px",
                    borderRadius: 20,
                    border:
                      "1px solid #C9C2AD",
                    background:
                      communityFilter === id
                        ? "#1E2A44"
                        : "transparent",
                    color:
                      communityFilter === id
                        ? "#EDEAE0"
                        : "#1E2A44",
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gap: 12,
              }}
            >
              {communityList.map((p) => (
                <CommunityPost
                  key={p.id}
                  post={p}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
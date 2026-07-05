// ---------------------------------------------------------------------------
// FAQ Service — Frontend-only module
// Contains: Mock data, utility functions, and API integration points
// Backend integration will be handled by the team lead.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// CATEGORIES
// TODO: Replace with API call when backend is ready
// TODO: GET /api/faqs/categories
// ---------------------------------------------------------------------------
export const CATEGORIES = [
    { id: "about", label: "About the internship", code: "01" },
    { id: "timing", label: "Timing & dates", code: "02" },
    { id: "noc", label: "NOC", code: "03" },
    { id: "selection", label: "Selection, offer & certificate", code: "04" },
    { id: "work", label: "Work & projects", code: "05" },
    { id: "comms", label: "Communication channels", code: "06" },
    { id: "coursework", label: "Phase 1 · Coursework & ViBe", code: "10" },
    { id: "spurti", label: "Spurti Points & leagues", code: "11" },
    { id: "vibe", label: "ViBe platform", code: "13" },
    { id: "teams", label: "Team formation", code: "14" },
  ];
  
  // ---------------------------------------------------------------------------
  // FAQS
  // TODO: Replace with API call when backend is ready
  // TODO: GET /api/faqs
  // TODO: GET /api/faqs?category={catId}
  // TODO: GET /api/faqs/search?q={query}
  // ---------------------------------------------------------------------------
  export const FAQS = [
    { id: "1.1", cat: "about", q: "What is the Vicharanashala internship?", a: "A two-month, full-time engagement at the Vicharanashala Lab at IIT Ropar. You work on a real open-source project under a mentor, after a short training phase tailored to where you already are. It's free — no charge, and the work is real.", updatedDaysAgo: 4, views: 412, votes: { up: 34, down: 2 } },
    { id: "1.2", cat: "about", q: "What is VINS?", a: "VINS is the online track of the internship, open to anyone who clears the interview. Real open-source contribution under a mentor, a certificate from the Vicharanashala Lab, free to join, no stipend. A yellow VINS panel on your dashboard means you're selected.", updatedDaysAgo: 4, views: 388, votes: { up: 27, down: 0 } },
    { id: "1.3", cat: "about", q: "What are the phases of VINS, and what do the badges mean?", a: "Four phases, each with a badge: Bronze (short training, ends with the CSFAQ project submission), Silver (main project work — finishing this + Bronze gets you the certificate), Gold (recognition for a standout contribution), Platinum (an invited visit to the lab afterward).", updatedDaysAgo: 4, views: 355, votes: { up: 31, down: 1 } },
    { id: "1.4", cat: "about", q: "Who is the internship for? Are alumni eligible?", a: "Any currently-enrolled UG/PG/doctoral student at a recognised college or university. Already-graduated candidates aren't eligible this cycle, but can reapply once re-enrolled.", updatedDaysAgo: 9, views: 201, votes: { up: 12, down: 3 } },
    { id: "1.6", cat: "about", q: "I have to attend class today/tomorrow — can I take leave?", a: "No. Leave is not permitted during the internship. If you're also attending classes or exams, you'll be relieved from the internship immediately and would need to join the next batch.", updatedDaysAgo: 4, views: 298, votes: { up: 22, down: 2 } },
    { id: "2.1", cat: "timing", q: "When can I start?", a: "Any time in 2026, but your internship must finish by 31 December 2026. Starting earlier is strongly recommended — you get cohort networking, concentrated TA support, and training that rolls out with the group.", updatedDaysAgo: 1, views: 501, votes: { up: 27, down: 0 } },
    { id: "2.3", cat: "timing", q: "Can I start in July, August, or later if I have exams now?", a: "Yes, but only if exams genuinely make an earlier start impossible. Finish your exams first, then opt in. Just make sure start + 2–3 months still lands on or before 31 December 2026.", updatedDaysAgo: 3, views: 276, votes: { up: 24, down: 0 } },
    { id: "2.4", cat: "timing", q: "Can I start with the cohort and take a relaxation during my exam window?", a: "No — this isn't offered. VINS is full-attention (6–10+ hrs/day) and splitting it with exams damages both. If exams fall inside the cohort window, defer your start until after they're done.", updatedDaysAgo: 3, views: 190, votes: { up: 19, down: 4 } },
    { id: "3.2", cat: "noc", q: "Who can sign the NOC?", a: "Any authorised signatory at your college — HOD, Acting HOD, Principal, Dean, Director, or Training & Placement Officer. For dual-degree students, either institution works.", updatedDaysAgo: 6, views: 344, votes: { up: 16, down: 0 } },
    { id: "3.4", cat: "noc", q: "What format should I use for the NOC?", a: "A printable NOC format is provided on your dashboard once your result is out (\"Download blank NOC\"). Get it signed and stamped, scan it, and upload it via \"Upload signed NOC.\"", updatedDaysAgo: 6, views: 312, votes: { up: 21, down: 0 } },
    { id: "3.6", cat: "noc", q: "Does the NOC need to be signed by hand?", a: "Yes — handwritten signature, institutional stamp, and the signatory's email are all required. Digital signatures aren't accepted.", updatedDaysAgo: 6, views: 220, votes: { up: 14, down: 1 } },
    { id: "3.7", cat: "noc", q: "Can my HOD email the NOC instead of uploading it?", a: "No — NOCs must be uploaded by you, the student, from your dashboard. Emailed NOCs are no longer accepted.", updatedDaysAgo: 6, views: 165, votes: { up: 11, down: 0 } },
    { id: "4.1", cat: "selection", q: "How do I know I am selected?", a: "If you can see your yellow VINS result panel on samagama.in, you're selected — there's no separate confirmation email.", updatedDaysAgo: 4, views: 430, votes: { up: 29, down: 0 } },
    { id: "4.3", cat: "selection", q: "When do I get the offer letter?", a: "Automatically, once your signed institutional NOC is uploaded and validated — usually within an hour to one working day. It appears on your dashboard, not in your email.", updatedDaysAgo: 4, views: 289, votes: { up: 18, down: 0 } },
    { id: "4.4", cat: "selection", q: "Will I get a certificate?", a: "Yes — every intern who completes the internship gets one from Vicharanashala, IIT Ropar. Candidates who drop out mid-way don't receive it.", updatedDaysAgo: 8, views: 367, votes: { up: 25, down: 0 } },
    { id: "4.8", cat: "selection", q: "Can I change my internship dates?", a: "Before the offer letter is issued — yes, anytime from the dashboard. After it's issued — no, dates are final.", updatedDaysAgo: 8, views: 143, votes: { up: 9, down: 1 } },
    { id: "5.1", cat: "work", q: "What will I work on?", a: "A real open-source project from the lab's portfolio, assigned based on your background and the lab's current needs — AI/ML, web dev, NLP, computer vision, Annam.AI, ViBe, and open-source infra.", updatedDaysAgo: 5, views: 298, votes: { up: 20, down: 0 } },
    { id: "5.4", cat: "work", q: "Is there a stipend?", a: "No, the internship is unpaid. Standout performers may occasionally receive a discretionary stipend, but it isn't promised.", updatedDaysAgo: 10, views: 356, votes: { up: 13, down: 3 } },
    { id: "5.5", cat: "work", q: "Do I need my own laptop? Any software to preload?", a: "Yes, a personal laptop is required — Linux or macOS preferred. Windows users should have WSL or a similar SSH-capable terminal ready.", updatedDaysAgo: 10, views: 176, votes: { up: 10, down: 0 } },
    { id: "6.1", cat: "comms", q: "What are the official communication channels?", a: "In order: your Zoom breakout room during live sessions, then the discussion forum, then Yaksha chat. No ticket form or support email. WhatsApp support and unofficial groups are banned.", updatedDaysAgo: 2, views: 512, votes: { up: 33, down: 0 } },
    { id: "10.6", cat: "coursework", q: "How do I get the daily Zoom standup link? Are standups mandatory?", a: "Links are posted in the Announcements section on your dashboard, at least an hour before each session. Attendance is mandatory; missing standups is treated as missing work.", updatedDaysAgo: 2, views: 289, votes: { up: 26, down: 0 } },
    { id: "10.10", cat: "coursework", q: "What are the attendance and participation rules?", a: "Tracked on a rolling 5-working-day window: 85%+ live attendance, 85%+ poll/quiz response rate, and every quiz attempted with a 50%+ pass rate. Falling below moves you to a later batch.", updatedDaysAgo: 2, views: 356, votes: { up: 28, down: 1 } },
    { id: "10.15", cat: "coursework", q: "How do I submit my Phase 1 (CSFAQ) project?", a: "Via the \"Submit Project\" button on your dashboard — a GitHub link plus product documentation and a project report with a Feature Spotlight section. One submission per student, can't be changed after.", updatedDaysAgo: 1, views: 601, votes: { up: 30, down: 0 } },
    { id: "11.3", cat: "spurti", q: "How much importance should I give to my Spurti Points (SP) number?", a: "Not much — SP is an early beta feature meant to give a broad sense of engagement, not a performance score. It plays no role in excusal or termination decisions.", updatedDaysAgo: 5, views: 245, votes: { up: 15, down: 0 } },
    { id: "11.10", cat: "spurti", q: "What actually happens if I fall below the participation threshold?", a: "You're moved to a later batch — not terminated. You'll need to update your dashboard dates and upload a fresh NOC matching the new period before rejoining.", updatedDaysAgo: 5, views: 198, votes: { up: 12, down: 0 } },
    { id: "13.4", cat: "vibe", q: "Can I use a mobile or tablet for ViBe?", a: "No — only desktop or laptop is supported.", updatedDaysAgo: 7, views: 267, votes: { up: 17, down: 0 } },
    { id: "13.8", cat: "vibe", q: "Is the ViBe consent form (camera access) compulsory?", a: "Yes. Proctoring runs throughout every course and requires camera/mic access for fairness. ViBe doesn't continuously record; it only does real-time presence checks.", updatedDaysAgo: 7, views: 234, votes: { up: 14, down: 2 } },
    { id: "13.11", cat: "vibe", q: "What is Linear Progression on ViBe?", a: "You must watch videos and attempt quizzes in the exact order they appear — no skipping ahead. Each item unlocks the next automatically.", updatedDaysAgo: 7, views: 189, votes: { up: 11, down: 0 } },
    { id: "14.2", cat: "teams", q: "What is the size of a team?", a: "Fixed at four members — mandatory, not fewer or more at final formation.", updatedDaysAgo: 3, views: 301, votes: { up: 20, down: 0 } },
    { id: "14.8", cat: "teams", q: "Can I form a team with someone from my own college?", a: "No — teams must span different institutions to encourage networking (same institution, different campus is an exception).", updatedDaysAgo: 3, views: 278, votes: { up: 18, down: 1 } },
    { id: "14.23", cat: "teams", q: "How should teams communicate internally?", a: "LinkedIn or email only, limited to your own team. A team WhatsApp group counts as an unofficial group and can lead to immediate termination if reported.", updatedDaysAgo: 3, views: 356, votes: { up: 23, down: 0 } },
  ];
  
  // ---------------------------------------------------------------------------
  // COMMUNITY POSTS
  // TODO: Replace with API call when backend is ready
  // TODO: GET /api/community/posts
  // TODO: POST /api/community/posts
  // ---------------------------------------------------------------------------
  export const COMMUNITY_POSTS = [
    { id: "c1", q: "Internship Evaluation Feedback Form", body: "My college requires an Industry_Internship_Evaluation Form filled by mentor for my 2 months internship...", status: "open", confidence: null, author: "Arni Johry", date: "4 Jul 2026", upvotes: 0, comments: 0, cat: "selection" },
    { id: "c2", q: "Unable to escalate issues", body: "Started my internship on July 1st, and I've been facing an issue with the Yaksha platform since my very first...", status: "answered", confidence: "medium", author: "Mani Deep Reddy Kandimalla", date: "3 Jul 2026", upvotes: 0, comments: 0, cat: "comms" },
    { id: "c3", q: "What is the naming convention in Zoom sessions?", body: "Today I joined the Zoom session and I got kicked for having the wrong display name — what's the actual convention?", status: "answered", confidence: "high", author: "Priya S.", date: "1 Jul 2026", upvotes: 4, comments: 0, cat: "coursework" },
    { id: "c4", q: "Can anybody explain things in Spurti Points properly?", body: "I am restarting my internship and I see 53... my SP looks wrong, does it carry over across batches?", status: "answered", confidence: "medium", author: "Rohit K.", date: "29 Jun 2026", upvotes: 1, comments: 1, cat: "spurti" },
    { id: "c5", q: "Are standups mandatory even after I clear the viva route?", body: "I cleared my viva and moved to Phase 2 — do I still need to attend the daily morning standups?", status: "answered", confidence: "high", author: "Ananya D.", date: "27 Jun 2026", upvotes: 2, comments: 0, cat: "coursework" },
    { id: "c6", q: "Self-paced internship confirmation for my college", body: "My college wants written confirmation this internship won't clash with my classes. What should I share with them?", status: "answered", confidence: "high", author: "Vikram T.", date: "24 Jun 2026", upvotes: 3, comments: 2, cat: "about" },
    { id: "c7", q: "How do I join the team formation Zoom breakout?", body: "I joined late and missed the May 15/16 activity — is there a separate link for late joiners?", status: "answered", confidence: "medium", author: "Fatima N.", date: "20 Jun 2026", upvotes: 1, comments: 1, cat: "teams" },
  ];
  
  // ---------------------------------------------------------------------------
  // CONFIDENCE STYLES
  // ---------------------------------------------------------------------------
  export const CONFIDENCE_STYLE = {
    high: { bg: "var(--bg-success)", text: "var(--text-success)", label: "High confidence" },
    medium: { bg: "#3A331A", text: "#E8A33D", label: "Medium confidence" },
  };
  
  // ---------------------------------------------------------------------------
  // UTILITY: Lightweight fuzzy match — no external deps
  // ---------------------------------------------------------------------------
  export function fuzzyScore(query, text) {
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
  
  // ---------------------------------------------------------------------------
  // UTILITY: Find related FAQs based on word overlap and category
  // ---------------------------------------------------------------------------
  export function relatedTo(target, pool, n = 3) {
    const words = (s) =>
      new Set(s.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter((w) => w.length > 3));
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
  
  // ---------------------------------------------------------------------------
  // UTILITY: Get FAQ count per category
  // ---------------------------------------------------------------------------
  export function getCategoryCounts(faqs, categories) {
    const counts = {};
    for (const cat of categories) {
      counts[cat.id] = faqs.filter((f) => f.cat === cat.id).length;
    }
    return counts;
  }
  
  // ---------------------------------------------------------------------------
  // API INTEGRATION POINTS
  // TODO: These functions are stubs for the team lead to implement
  // ---------------------------------------------------------------------------
  
  /**
   * Fetch all FAQs from the backend
   * TODO: Implement when backend is ready
   * @returns {Promise<Array>} Array of FAQ objects
   */
  export async function fetchFaqs() {
    // TODO: Replace with actual API call
    // return fetch('/api/faqs').then(res => res.json());
    return FAQS;
  }
  
  /**
   * Fetch FAQs by category
   * TODO: Implement when backend is ready
   * @param {string} categoryId - The category ID to filter by
   * @returns {Promise<Array>} Array of FAQ objects
   */
  export async function fetchFaqsByCategory(categoryId) {
    // TODO: Replace with actual API call
    // return fetch(`/api/faqs?category=${categoryId}`).then(res => res.json());
    return FAQS.filter((f) => f.cat === categoryId);
  }
  
  /**
   * Search FAQs
   * TODO: Implement when backend is ready
   * @param {string} query - Search query
   * @returns {Promise<Array>} Array of matching FAQ objects
   */
  export async function searchFaqs(query) {
    // TODO: Replace with actual API call
    // return fetch(`/api/faqs/search?q=${encodeURIComponent(query)}`).then(res => res.json());
    // For now, client-side search is used via fuzzyScore
    return FAQS;
  }
  
  /**
   * Submit a vote on a FAQ
   * TODO: Implement when backend is ready
   * @param {string} faqId - The FAQ ID
   * @param {string} direction - 'up' or 'down'
   * @returns {Promise<Object>} Updated vote counts
   */
  export async function submitVote(faqId, direction) {
    // TODO: Replace with actual API call
    // return fetch(`/api/faqs/${faqId}/vote`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ direction })
    // }).then(res => res.json());
    return { success: true };
  }
  
  /**
   * Escalate a missed search query
   * TODO: Implement when backend is ready
   * @param {string} query - The search query that returned no results
   * @returns {Promise<Object>} Escalation confirmation
   */
  export async function escalateQuery(query) {
    // TODO: Replace with actual API call
    // return fetch('/api/escalations', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ query, source: 'faq_search' })
    // }).then(res => res.json());
    return { success: true, escalated: query };
  }
  
  /**
   * Fetch community posts
   * TODO: Implement when backend is ready
   * @param {string} filter - 'all', 'unanswered', or 'answered'
   * @returns {Promise<Array>} Array of community post objects
   */
  export async function fetchCommunityPosts(filter = 'all') {
    // TODO: Replace with actual API call
    // return fetch(`/api/community/posts?filter=${filter}`).then(res => res.json());
    return COMMUNITY_POSTS;
  }
  
  /**
   * Submit a new community question
   * TODO: Implement when backend is ready
   * @param {string} question - The question text
   * @returns {Promise<Object>} Created post object
   */
  export async function submitCommunityQuestion(question) {
    // TODO: Replace with actual API call
    // return fetch('/api/community/posts', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ question })
    // }).then(res => res.json());
    return { success: true, id: `c${Date.now()}` };
  }
  
  /**
   * Log a missed search for analytics
   * TODO: Implement when backend is ready
   * @param {string} query - The search query
   * @returns {Promise<Object>} Confirmation
   */
  export async function logMissedSearch(query) {
    // TODO: Replace with actual API call
    // return fetch('/api/analytics/missed-search', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ query })
    // }).then(res => res.json());
    return { success: true };
  }
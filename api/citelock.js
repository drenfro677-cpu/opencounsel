const UA = "OpenCounsel/1.0 (access-to-justice; https://github.com/drenfro677-cpu/opencounsel)";

function normalizeCite(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function citeMatches(haystack, needle) {
  const n = normalizeCite(needle);
  return (haystack || []).some((c) => {
    const h = normalizeCite(c);
    return h === n || h.includes(n) || n.includes(h);
  });
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=1800");
  if (req.method === "OPTIONS") return res.status(204).end();

  const cite = String((req.query && req.query.cite) || (req.body && req.body.cite) || "").slice(0, 180).trim();
  if (!cite) return res.status(400).json({ error: "missing cite" });

  const params = new URLSearchParams({ type: "o", q: cite, order_by: "score desc" });

  try {
    const r = await fetch("https://www.courtlistener.com/api/rest/v4/search/?" + params, {
      headers: { Accept: "application/json", "User-Agent": UA },
    });
    const data = await r.json();
    const results = data.results || [];
    const exact = results.filter((hit) => citeMatches(hit.citation, cite));
    const status = exact.length ? "verified" : results.length ? "mentioned_only" : "blocked";

    const hit = exact[0] || results[0] || null;
    return res.status(200).json({
      cite,
      status,
      count: data.count || 0,
      match: hit && {
        caseName: hit.caseName,
        citation: hit.citation || [],
        court: hit.court,
        dateFiled: hit.dateFiled,
        url: "https://www.courtlistener.com" + (hit.absolute_url || ""),
      },
    });
  } catch (err) {
    return res.status(502).json({ error: "CourtListener unavailable", detail: String(err.message || err) });
  }
};

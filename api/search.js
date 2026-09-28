const UA = "OpenCounsel/1.0 (access-to-justice; https://github.com/drenfro677-cpu/opencounsel)";

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=120, stale-while-revalidate=600");
  if (req.method === "OPTIONS") return res.status(204).end();

  const q = String((req.query && req.query.q) || "").slice(0, 300).trim();
  if (!q) return res.status(400).json({ error: "missing q" });

  const court = String((req.query && req.query.court) || "").slice(0, 40);
  const params = new URLSearchParams({
    type: "o",
    q,
    order_by: "score desc",
  });
  if (court) params.set("court", court);

  try {
    const r = await fetch("https://www.courtlistener.com/api/rest/v4/search/?" + params, {
      headers: { Accept: "application/json", "User-Agent": UA },
    });
    const data = await r.json();
    const results = (data.results || []).slice(0, 8).map((hit) => ({
      caseName: hit.caseName,
      citation: hit.citation || [],
      court: hit.court,
      court_id: hit.court_id,
      dateFiled: hit.dateFiled,
      status: hit.status,
      cluster_id: hit.cluster_id,
      url: "https://www.courtlistener.com" + (hit.absolute_url || ""),
    }));
    return res.status(200).json({
      source: "CourtListener",
      count: data.count || 0,
      results,
    });
  } catch (err) {
    return res.status(502).json({ error: "CourtListener unavailable", detail: String(err.message || err) });
  }
};

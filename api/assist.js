module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  return res.status(501).json({ error: "Deploy the full api/assist.js from the local workbench. It verifies cites on CourtListener, then optionally calls xAI/OpenAI, then strips any cite not on the verified list." });
};

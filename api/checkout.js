const PLANS = {
  pro: { name: "OpenCounsel Pro", amount: 1900, interval: "month" },
  clinic: { name: "OpenCounsel Clinic", amount: 14900, interval: "month" }
};

function originFrom(req) {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  return process.env.APP_URL || proto + "://" + host;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return res.status(503).json({
      error: "billing_not_configured",
      detail: "Set STRIPE_SECRET_KEY on the host. See SELL.md."
    });
  }
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  const plan = PLANS[(body && body.plan) || ""];
  if (!plan) return res.status(400).json({ error: "plan must be pro or clinic" });
  const origin = originFrom(req);
  const params = new URLSearchParams({
    mode: "subscription",
    success_url: origin + "/?paid=1&session_id={CHECKOUT_SESSION_ID}",
    cancel_url: origin + "/pricing.html?canceled=1",
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][product_data][name]": plan.name,
    "line_items[0][price_data][unit_amount]": String(plan.amount),
    "line_items[0][price_data][recurring][interval]": plan.interval,
    "line_items[0][quantity]": "1",
    "metadata[plan]": (body && body.plan) || "",
    allow_promotion_codes: "true"
  });
  try {
    const r = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + secret,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data.error || data });
    return res.status(200).json({ id: data.id, url: data.url });
  } catch (err) {
    return res.status(502).json({ error: String(err.message || err) });
  }
};

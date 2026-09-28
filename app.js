const CL = "https://www.courtlistener.com/api/rest/v4/search/";
const PLAY = {
  debt: {
    title: "Ramirez v. North Shore Receivables",
    meta: "Cook County Cir. Ct. · Consumer debt · Defendant",
    q: "Henson v. Santander debt collector",
    home: '<div class="row"><div><h2 class="page">Debt defense — case home</h2><p class="sub">Jurisdiction locked: Illinois / Cook / Law Division.</p></div><span class="pill ok">Lock on</span></div><div class="cards"><div class="card"><h3>Answer window</h3><p style="font-size:28px;font-family:Fraunces,serif;margin:4px 0">11 days</p><p>Confirm against the summons and local rule.</p></div><div class="card"><h3>What usually matters</h3><p>Who owns the account. What documents are attached. Whether the amount matches anything you have.</p></div><div class="card"><h3>Aid first</h3><p>CARPLS and Illinois Legal Aid Online before you draft.</p></div></div><h3>This week</h3><ul class="list"><li><span>Read the complaint and every attachment.</span><span class="pill warn">Today</span></li><li><span>Do not ignore the summons.</span><span class="pill warn">Today</span></li><li><span>Run CiteLock before you print.</span><span class="pill">Before file</span></li></ul>',
    draft: '<h2 class="page">Draft — answer (teaching text)</h2><p class="sub">Not a form to file.</p><div class="draft"><p style="text-align:center">IN THE CIRCUIT COURT OF COOK COUNTY, ILLINOIS<br>NORTH SHORE RECEIVABLES LLC v. MARIA RAMIREZ<br>DEFENDANT’S ANSWER (DEMONSTRATION)</p><p>1. Defendant appears and denies that Plaintiff has shown it owns the account sued on.</p><p>2. Defendant denies the amount demanded and asks for the chain of assignment.</p><p>3. If Plaintiff is a debt collector under 15 U.S.C. § 1692a, see <i>Henson v. Santander Consumer USA Inc.</i>, 582 U.S. 79 (2017). Read the opinion.</p></div>',
    cal: '<h2 class="page">Deadlines — debt</h2><div class="q"><small>Served</small>The clock that matters is the one on the summons.</div><div class="q"><small>This week</small>Appearance / answer the clerk will accept.</div><div class="q"><small>First date</small>Bring the binder. Do not agree to a judgment you have not read.</div>',
    hear: '<h2 class="page">Hearing room — debt call</h2><div class="q"><small>Typical question</small>Have you filed an appearance? Do you dispute the amount?</div><div class="q"><small>20-second shape</small>I filed. I dispute ownership and the amount. I need the assignment documents.</div>',
    ev: '<h2 class="page">Evidence — debt</h2><ul class="list"><li><span>Ex. A Summons and complaint</span><span class="pill">Pleaded claim</span></li><li><span>Ex. B Statements in your possession</span><span class="pill warn">Gaps marked</span></li><li><span>Ex. C Assignment / bill of sale</span><span class="pill bad">Not produced</span></li></ul>',
    help: '<h2 class="page">Aid — Cook consumer</h2><div class="help-grid"><div class="card"><h3>Humans first</h3><p>CARPLS · Illinois Legal Aid Online · CVLS.</p></div><div class="card"><h3>Ask a clerk</h3><p>Correct appearance form. Fee-waiver window. Call time. Not will I win.</p></div></div>'
  },
  evict: {
    title: "Ortiz v. Lakeside Holdings LLC",
    meta: "Cook County · Residential eviction · Tenant",
    q: "Illinois eviction notice possession residential",
    home: '<div class="row"><div><h2 class="page">Eviction — case home</h2><p class="sub">Jurisdiction locked: Illinois / Cook / Eviction. Start with the notice.</p></div><span class="pill ok">Lock on</span></div><div class="cards"><div class="card"><h3>Notice in the file</h3><p>5-day / 10-day / 30-day / other.</p></div><div class="card"><h3>First court date</h3><p style="font-size:28px;font-family:Fraunces,serif;margin:4px 0">6 days</p><p>Bring lease, receipts, photos, and the notice.</p></div><div class="card"><h3>Safety / lockout</h3><p>If you are locked out, tell the clerk and legal aid the same day.</p></div></div><h3>Playbook</h3><ul class="list"><li><span>Photograph the notice, envelope, and door.</span><span class="pill warn">Today</span></li><li><span>Collect the lease and every rent receipt.</span><span class="pill warn">Today</span></li><li><span>Ask legal aid whether this notice matches the statute.</span><span class="pill ok">Aid</span></li><li><span>Do not miss the first court date.</span><span class="pill">Calendar</span></li></ul>',
    draft: '<h2 class="page">Draft — appearance shape (teaching text)</h2><p class="sub">Use the official Cook County eviction packet. This is only the idea of the paper.</p><div class="draft"><p style="text-align:center">LAKESIDE HOLDINGS LLC v. LUIS ORTIZ<br>APPEARANCE AND ANSWER (DEMONSTRATION)</p><p>1. Tenant appears and does not agree that Plaintiff is entitled to possession on the facts pleaded.</p><p>2. Tenant disputes that a proper notice was served as the complaint describes.</p><p>3. Tenant disputes the rent figure and will produce receipts at the hearing.</p></div>',
    cal: '<h2 class="page">Deadlines — eviction</h2><div class="q"><small>Notice</small>Keep the paper. Photograph it on the door if that is how it arrived.</div><div class="q"><small>Summons</small>The first court date ends the case if you do not appear.</div><div class="q"><small>After judgment</small>Short window before the sheriff. That is a legal-aid morning.</div>',
    hear: '<h2 class="page">Hearing room — eviction call</h2><div class="q"><small>Typical opening</small>Are you still in the unit? Have you paid? Do you have the notice and the lease?</div><div class="q"><small>20-second shape</small>I still live there. I have the notice and the receipts. I dispute the amount and the notice.</div>',
    ev: '<h2 class="page">Evidence — eviction</h2><ul class="list"><li><span>Ex. A Notice + photo of service</span><span class="pill">Threshold paper</span></li><li><span>Ex. B Lease</span><span class="pill">Who rented what</span></li><li><span>Ex. C Rent receipts</span><span class="pill warn">Match to months claimed</span></li></ul>',
    help: '<h2 class="page">Aid — Cook eviction</h2><div class="help-grid"><div class="card"><h3>Same-week help</h3><p>Eviction desks at or near the courthouse beat a late masterpiece.</p></div><div class="card"><h3>Official forms</h3><p>Ask the self-help desk which packet this courtroom wants.</p></div></div>'
  }
};

function enterApp(which){
  document.getElementById("landing").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  setPlaybook(which === "clinic" ? "clinic" : "debt");
  window.scrollTo(0,0);
}
function leaveApp(){
  document.getElementById("app").classList.add("hidden");
  document.getElementById("landing").classList.remove("hidden");
}
function setPlaybook(name){
  document.getElementById("sw-debt").classList.toggle("on", name==="debt");
  document.getElementById("sw-evict").classList.toggle("on", name==="evict");
  document.getElementById("sw-clinic").classList.toggle("on", name==="clinic");
  const clinic = name==="clinic";
  document.getElementById("nav-lit").classList.toggle("hidden", clinic);
  document.getElementById("nav-clinic").classList.toggle("hidden", !clinic);
  if(clinic){
    document.getElementById("side-meta").innerHTML = "<strong>Clinic desk</strong>Cook County self-help · 7 files";
    showView("clinic", document.querySelector("#nav-clinic button"));
    return;
  }
  const p = PLAY[name];
  document.getElementById("side-meta").innerHTML = "<strong>"+p.title+"</strong>"+p.meta;
  document.getElementById("view-home").innerHTML = p.home;
  document.getElementById("view-draft").innerHTML = p.draft;
  document.getElementById("view-calendar").innerHTML = p.cal;
  document.getElementById("view-hearing").innerHTML = p.hear;
  document.getElementById("view-evidence").innerHTML = p.ev;
  document.getElementById("view-help").innerHTML = p.help;
  document.getElementById("q").value = p.q;
  showView("home", document.querySelector("#nav-lit button"));
}
function showView(id, btn){
  document.querySelectorAll("main section").forEach(s => s.classList.add("hidden"));
  document.getElementById("view-"+id).classList.remove("hidden");
  const nav = btn ? btn.parentElement : null;
  if(nav){
    nav.querySelectorAll("button[data-view]").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  }
}
function esc(s){return String(s||"").replace(/[&<>"]/g, c => ({"&":"&","<":"<",">":">","\"":"""}[c]));}

async function clSearch(q){
  try {
    const r = await fetch("/api/search?q=" + encodeURIComponent(q));
    if(r.ok) return r.json();
  } catch(e) {}
  const r2 = await fetch(CL + "?type=o&order_by=score%20desc&q=" + encodeURIComponent(q), {headers:{Accept:"application/json"}});
  if(!r2.ok) throw new Error("CourtListener " + r2.status);
  const data = await r2.json();
  return {
    source:"CourtListener",
    count: data.count||0,
    results: (data.results||[]).slice(0,8).map(hit => ({
      caseName: hit.caseName,
      citation: hit.citation||[],
      court: hit.court,
      dateFiled: hit.dateFiled,
      status: hit.status,
      url: "https://www.courtlistener.com" + (hit.absolute_url||"")
    }))
  };
}

async function runSearch(){
  const q = document.getElementById("q").value.trim();
  const box = document.getElementById("results");
  const meta = document.getElementById("search-meta");
  box.innerHTML = "<p class='sub'>Querying CourtListener…</p>";
  try{
    const data = await clSearch(q);
    meta.textContent = data.count + " opinions · showing " + data.results.length + " · " + data.source;
    if(!data.results.length){ box.innerHTML = "<div class='opinion'><h4>No cluster returned</h4><span class='pill bad'>Empty</span></div>"; return; }
    box.innerHTML = data.results.map(hit => "<div class='opinion'><h4>"+esc(hit.caseName)+"</h4><div class='cite'>"+esc((hit.citation||[]).slice(0,3).join(" · ")||"no reporter cite")+"</div><p>"+esc(hit.court||"")+" · filed "+esc(hit.dateFiled||"n/d")+"</p><p><a href='"+esc(hit.url)+"' target='_blank' rel='noopener'>Open on CourtListener</a></p></div>").join("");
  }catch(err){
    box.innerHTML = "<div class='opinion'><h4>Lookup failed</h4><p>"+esc(err.message)+"</p></div>";
  }
}

function extractCites(text){
  const out = []; const seen = new Set();
  const patterns = [/\b\d{1,3}\s+U\.S\.\s+\d+\b/g, /\b\d{1,3}\s+S\.\s*Ct\.\s+\d+\b/g, /\b\d{1,3}\s+F\.\s*(?:2d|3d|4th)\s+\d+\b/g, /\b\d{4}\s+IL\s+App(?:\s+\(\d+[a-z]+\))?\s+\d+\b/gi, /\b\d{1,3}\s+Ill\.\s*(?:App\.\s*)?(?:\d+[dsthn]+\s+)?\d+\b/g, /\b\d{1,3}\s+N\.E\.\s*(?:2d|3d)\s+\d+\b/g];
  patterns.forEach(rx => { const r = new RegExp(rx.source, rx.flags); let m; while((m = r.exec(text))){ const c = m[0].replace(/\s+/g," ").trim(); if(!seen.has(c.toLowerCase())){ seen.add(c.toLowerCase()); out.push(c);} } });
  return out;
}
function norm(s){return String(s||"").toLowerCase().replace(/\s+/g," ").trim();}
function citeInList(list, needle){ const n = norm(needle).replace(/\./g,""); return (list||[]).some(c => norm(c).replace(/\./g,"").includes(n) || n.includes(norm(c).replace(/\./g,""))); }

async function runCiteLock(){
  const cites = extractCites(document.getElementById("cite-text").value);
  const box = document.getElementById("cite-out");
  const exp = document.getElementById("export-row");
  if(!cites.length){ box.innerHTML = "<p>No reporter-style citations found.</p>"; exp.innerHTML=""; return; }
  box.innerHTML = "<p class='sub'>Checking "+cites.length+" citation(s) on CourtListener…</p>";
  const rows = [];
  for(const cite of cites){
    try{
      let data;
      try{ const r = await fetch("/api/citelock?cite="+encodeURIComponent(cite)); if(r.ok) data = await r.json(); }catch(e){}
      if(!data){
        const raw = await clSearch(cite);
        const exact = (raw.results||[]).filter(h => citeInList(h.citation, cite));
        data = {cite, status: exact.length ? "verified" : (raw.results||[]).length ? "mentioned_only" : "blocked", match: (exact[0]||raw.results[0]||null)};
      }
      rows.push(data);
    }catch(err){ rows.push({cite, status:"error", match:null}); }
  }
  const blocked = rows.some(r => r.status==="blocked" || r.status==="error");
  box.innerHTML = rows.map(r => {
    const pill = r.status==="verified" ? "ok" : r.status==="mentioned_only" ? "warn" : "bad";
    const label = r.status==="verified" ? "Verified cluster" : r.status==="mentioned_only" ? "Hit exists — not an exact reporter match" : "Blocked — no cluster";
    const m = r.match || {};
    return "<div class='opinion'><h4>"+esc(r.cite)+"</h4><div class='cite'>"+esc(m.caseName||"no matching opinion")+"</div><p>"+esc((m.citation||[]).slice(0,2).join(" · "))+(m.url?" · <a href='"+esc(m.url)+"' target='_blank' rel='noopener'>open</a>":"")+"</p><span class='pill "+pill+"'>"+label+"</span></div>";
  }).join("");
  exp.innerHTML = blocked ? '<button class="btn" disabled>Export PDF — locked</button> <span class="pill bad">Remove blocked cites first</span>' : '<button class="btn gold" onclick="alert(\'Prototype: production writes PDF/A + verification log.\')">Export enabled</button>';
}

setPlaybook("debt");

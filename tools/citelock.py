#!/usr/bin/env python3
"""CiteLock. Verified only if CourtListener q=citation:\"VOL REP PAGE\" returns a cluster whose citation[] contains that string."""
from __future__ import annotations
import argparse, json, re, sys, urllib.parse, urllib.request
UA = "OpenCounsel-CiteLock/1.1 (verify-only; https://github.com/drenfro677-cpu/opencounsel)"
SEARCH = "https://www.courtlistener.com/api/rest/v4/search/"
CITE_RX = re.compile(r"(?P<full>(?P<vol>\d{1,4})\s+(?P<rep>U\.?\s*S\.|S\.\s*Ct\.|F\.\s*(?:2d|3d|4th)|N\.E\.\s*(?:2d|3d)|Ill\.\s*(?:App\.\s*)?|IL\s+App(?:\s+\(\d+[a-z]+\))?)\s+(?P<page>\d+))", re.I)

def norm(s):
    return re.sub(r"[^a-z0-9]+", "", (s or "").lower())

def extract(text):
    found, seen = [], set()
    for m in CITE_RX.finditer(text):
        raw = re.sub(r"\s+", " ", m.group("full")).strip()
        key = norm(raw)
        if key not in seen:
            seen.add(key); found.append(raw)
    return found

def cl_get(q):
    req = urllib.request.Request(SEARCH + "?" + urllib.parse.urlencode({"type":"o","q":q}), headers={"User-Agent":UA,"Accept":"application/json"})
    with urllib.request.urlopen(req, timeout=25) as resp:
        return json.load(resp)

def verify_cite(cite):
    data = cl_get('citation:"%s"' % cite)
    hits = data.get("results") or []
    needle = norm(cite)
    matched = []
    for hit in hits:
        cites = hit.get("citation") or []
        if any(needle == norm(c) or needle in norm(c) for c in cites):
            matched.append({"caseName":hit.get("caseName"),"citation":cites,"court":hit.get("court"),"dateFiled":hit.get("dateFiled"),"url":"https://www.courtlistener.com"+(hit.get("absolute_url") or ""),"cluster_id":hit.get("cluster_id")})
    return {"query":cite,"status":"VERIFIED" if matched else "BLOCKED","raw_count":data.get("count") or 0,"match":matched[0] if matched else None}

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("cites", nargs="*"); ap.add_argument("--file","-f"); ap.add_argument("--json", action="store_true")
    args = ap.parse_args(); blob = " ".join(args.cites)
    if args.file: blob += "\n" + open(args.file, encoding="utf-8").read()
    if not blob.strip():
        ap.print_help(); return 2
    cites = extract(blob) or [blob.strip()]
    rows = [verify_cite(c) for c in cites]
    if args.json:
        print(json.dumps(rows, indent=2))
    else:
        for row in rows:
            print("%s\t%s" % (row["status"], row["query"]))
            if row["match"]:
                print("  %s" % row["match"]["caseName"])
                print("  %s" % row["match"]["url"])
            else:
                print("  no cluster whose citation[] contains this string")
    return 0 if all(r["status"]=="VERIFIED" for r in rows) else 1

if __name__ == "__main__":
    sys.exit(main())

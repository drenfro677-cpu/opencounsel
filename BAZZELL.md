# Operating protocol (Bazzell rules)

This product does not invent law. It looks things up.

1. Stop.
2. Investigate the source.
3. Find the record.
4. Trace the claim to the original document.

If step 4 fails, the claim is not verified.

## Allowed on screen

CourtListener fields only: caseName, citation[], court, dateFiled, absolute_url, cluster_id. Status is VERIFIED or BLOCKED.

## Forbidden

Generated holdings. First-result-from-a-name-search treated as the case. A reporter number that is not inside citation[].

Known miss from an earlier draft: `2013 IL App (1st) 113286`. Real cluster for Unifund CCR Partners v. Shah is `2013 IL App (1st) 113658`.

## The only verification query

```
GET https://www.courtlistener.com/api/rest/v4/search/?type=o&q=citation:"582 U.S. 79"
```

Verified only if a returned cluster's citation array contains that string.

```
python3 tools/citelock.py "582 U.S. 79" "347 U.S. 483" "2022 IL App 99999"
```

Sources: CourtListener search API, eyecite (freelawproject/eyecite), courtlistener-api-client.

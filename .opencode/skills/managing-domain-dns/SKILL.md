---
name: managing-domain-dns
description: Use when changing DNS for boosterai.pl, pointing the domain at Vercel, editing A/CNAME/MX records in the MasterNET panel, fixing the "Domain not configured properly" Vercel warning, issuing or troubleshooting the SSL certificate, or switching the primary domain between boosterai.pl and www.boosterai.pl. Covers the MasterNET (registrar/DNS) + Vercel (hosting) split and the broken MasterNET "Dodaj" button workaround.
compatibility: opencode
---

## Topology

- **Registrar + authoritative DNS**: MasterNET (`https://www.masternet.pl`). Nameservers stay `ns1.masternet.pl` / `ns2.masternet.pl` — do NOT switch to `vercel-dns.com` (that would drop Google email MX and the `restrukturyzacja` subdomain). Use the **A-record approach** (Vercel's recommended option a).
- **Hosting**: Vercel project `boostersite` under scope `szymon-bazans-projects`. `boosterai.pl` is the primary domain; `www.boosterai.pl` 308-redirects to it.
- `boostersite` is the only Vercel project for the site. The old `boosterai-site` project was deleted.

## Credentials

- MasterNET login: the account email and password are held by Szymon — ask if not provided. Never write them into this repo (it is public). Login page: `https://www.masternet.pl/?go=login` (the homepage header form is unreliable; use the dedicated login page).
- Vercel: `VERCEL_TOKEN` in `.env.local`, scope/team slug `szymon-bazans-projects`.

## Target zone (boosterai.pl → Vercel)

| Host | Type | Value | Note |
|------|------|-------|------|
| `@` (empty host) | A | `76.76.21.21` | apex → Vercel |
| `www` | A | `76.76.21.21` | → Vercel |
| `@` | MX | `10 SMTP.GOOGLE.COM.` | Google email — never delete |
| `restrukturyzacja` | CNAME | `...vercel-dns-017.com` | other Vercel project — never delete |
| `mail`, `ftp` | A | `94.124.10.66` | leave as-is |
| `@` / `boosterai.pl` | TXT | `google-site-verification=...` | leave as-is |

Vercel also accepts newer apex IPs (`216.198.79.1`, `64.29.17.1`); `76.76.21.21` still works (`ipStatus: optional-change`).

## Editing DNS in MasterNET

The zone editor is at: Panel → Domeny → Lista i zarządzanie (`?go=domenyhome`) → expand the domain row → **Plik strefy DNS**. It only supports **delete** (red ×) and **add** — there is NO in-place edit. To change a record: delete the old one, add the new one.

### CRITICAL: the "Dodaj" (add) button is broken in the browser

The `#guzik_add_dns` click handler does NOT fire — clicking adds nothing and shows no error. Also `add_in_host="@"` is rejected as invalid; **apex host must be empty string**. Drive adds via the panel's AJAX endpoint with the active session cookie instead.

Get the session cookie (`PHPSESSID`) from a logged-in browser (`document.cookie`) or login via curl, then:

```bash
# ADD a record (apex = empty add_in_host; www = "www")
curl -s "https://www.masternet.pl/ajax_service_action.php" \
  -H "Cookie: PHPSESSID=<sid>; cookie=true" \
  --data-urlencode "client=<masternet-login-email>" \
  --data-urlencode "domain=boosterai.pl" \
  --data-urlencode "add_in_host=" \
  --data-urlencode "add_in_type=A" \
  --data-urlencode "add_in_data=76.76.21.21" \
  --data-urlencode "operation=Plik Strefy dns ADD"
# success → HTML contains id='monit_ok' (green); failure → id='monit_error' (red)

# READ the current zone (parse .dns-table-col1/2/3, charset iso-8859-2)
curl -s "https://www.masternet.pl/ajax_service_action.php" \
  -H "Cookie: PHPSESSID=<sid>; cookie=true" \
  --data-urlencode "client=<masternet-login-email>" \
  --data-urlencode "clientdm=boosterai.pl" \
  --data-urlencode "operation=Domain Manage strefa dns"
```

Deletes DO work in the browser: expand the domain row → Plik strefy DNS → click the red × next to the target record (each is `<input class="removeButton" id="guzik<recordId>">`; the id starts with a digit so `agent-browser click "#guzik..."` works, but `#8guzik...` style ids are invalid CSS selectors — trigger those via `eval` `document.getElementById(...).click()`).

The `?go=domeny*` page menu links use ids like `8guzik<domain_with_underscores>` and load modals via AJAX `ajax_service_action.php`. The url is relative to the site root (`https://www.masternet.pl/ajax_service_action.php`), not `/panel/`.

## Verify DNS propagation

```bash
dig +short boosterai.pl A @ns1.masternet.pl       # expect 76.76.21.21
dig +short www.boosterai.pl A @ns1.masternet.pl   # expect 76.76.21.21
dig boosterai.pl MX @ns1.masternet.pl +short      # expect 10 SMTP.GOOGLE.COM. (email intact)
dig +short boosterai.pl A @8.8.8.8                 # public propagation
```

The MasterNET nameserver regenerates the zone with a short lag; `dig +short A` may briefly return empty right after edits even while `dig ANY` already shows the record. Re-check after ~1 min before concluding failure.

## Vercel side: config, cert, primary domain

```bash
TOKEN="$(grep VERCEL_TOKEN .env.local | cut -d= -f2 | tr -d '"')"; TEAM="szymon-bazans-projects"

# Is Vercel happy with DNS? expect "misconfigured":false, "acceptedChallenges":["http-01"]
curl -s -H "Authorization: Bearer $TOKEN" "https://api.vercel.com/v6/domains/boosterai.pl/config?slug=$TEAM"

# Existing certs (only restrukturyzacja by default until you issue apex/www)
curl -s -H "Authorization: Bearer $TOKEN" "https://api.vercel.com/v7/certs?domain=boosterai.pl&slug=$TEAM"

# Force-issue the SSL cert when HTTPS handshake fails (SSL_ERROR_SYSCALL) despite valid DNS
curl -s -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  "https://api.vercel.com/v3/certs?slug=$TEAM" -d '{"cns":["boosterai.pl","www.boosterai.pl"]}'
```

### Make boosterai.pl the primary domain (www redirects to apex)

```bash
# apex serves the site (remove its redirect)
curl -s -X PATCH -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  "https://api.vercel.com/v9/projects/boostersite/domains/boosterai.pl?slug=$TEAM" \
  -d '{"redirect":null,"redirectStatusCode":null}'

# www 308-redirects to apex
curl -s -X PATCH -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  "https://api.vercel.com/v9/projects/boostersite/domains/www.boosterai.pl?slug=$TEAM" \
  -d '{"redirect":"boosterai.pl","redirectStatusCode":308}'
```

Verify end-to-end:

```bash
curl -sI https://boosterai.pl       | head -1   # HTTP/2 200
curl -sI https://www.boosterai.pl   | head -1   # HTTP/2 308 → location: https://boosterai.pl/
```

## Gotchas

- HTTP works (Vercel returns 307/200) before HTTPS — the SSL cert is provisioned async; force-issue via `/v3/certs` if it stalls.
- `vercel domains inspect` keeps showing nameservers `✘` because we use A records, not Vercel NS — this is expected, NOT an error. Trust `"misconfigured":false` from `/v6/domains/.../config`.
- Never change nameservers to `vercel-dns.com` — it would break Google email and the `restrukturyzacja` subdomain.

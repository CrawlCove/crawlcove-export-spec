# CSV column reference

The Crawl Cove desktop app's Reports page can also export the full crawl as
CSV (RFC 4180: comma-separated, `\r\n` line endings, UTF-8 with a BOM so Excel
opens it correctly). It contains the same page set and the same fields as the
[JSON export](../schema/crawl-export.schema.json), in this column order:

| # | Column | Type | Notes |
|---|---|---|---|
| 1 | `URL` | string | The URL as requested. |
| 2 | `Final URL` | string | The URL after following redirects. Empty if not recorded. |
| 3 | `Status` | integer | HTTP status code of the final response. Empty if the request never got one. |
| 4 | `Content-Type` | string | Response `Content-Type`. Empty if absent. |
| 5 | `Depth` | integer | Crawl depth from the start URL (0 = start URL). |
| 6 | `Indexable` | `yes` / `no` | HTTP 200 and not noindex, by robots meta OR `X-Robots-Tag`. |
| 7 | `Title` | string | `<title>` contents. Empty if absent. |
| 8 | `Title length` | integer | Character count of `Title`. Empty if `Title` is empty. |
| 9 | `Meta description` | string | Empty if absent. |
| 10 | `Meta length` | integer | Character count of `Meta description`. Empty if empty. |
| 11 | `Canonical` | string | `<link rel="canonical">` href. Empty if absent. |
| 12 | `HTML lang` | string | `<html lang>` attribute. Empty if absent. |
| 13 | `Robots meta` | string | Raw `<meta name="robots">` content. Empty if absent. |
| 14 | `X-Robots-Tag` | string | Raw response header. Empty if absent — the other source of a noindex. |
| 15 | `H1 count` | integer | Number of `<h1>` elements. |
| 16 | `Word count` | integer | Visible body word count. |
| 17 | `Internal links` | integer | Count of links to the same site. |
| 18 | `External links` | integer | Count of links to other sites. |
| 19 | `Images` | integer | Total `<img>` count. |
| 20 | `Images missing alt` | integer | Count of images with an empty or absent `alt`. |
| 21 | `Response time (ms)` | integer | Time to first byte / fetch completion. Empty if not recorded. |
| 22 | `Byte size` | integer | Response body size in bytes. Empty if not recorded. |
| 23 | `Rendered` | `yes` / `no` | Whether the page was fetched with a JS-rendering pass rather than the plain HTTP response. |
| 24 | `Redirect hops` | integer | Number of redirect hops the URL went through (0 = none). |
| 25 | `Fetch error` | string | Network/fetch-level error (e.g. a timeout code). Empty if the request completed. |
| 26 | `Schema blocks` | integer | Count of JSON-LD schema.org blocks on the page. |
| 27 | `hreflang count` | integer | Count of `<link rel="alternate" hreflang>` entries. |
| 28 | `Content fingerprint` | string | 64-bit content fingerprint as hex, or empty when the page had too little content to fingerprint. |
| 29 | `Findings` | integer | Number of SEO findings attributed to this page in the run. |

## Differences from the JSON export

CSV has no native boolean or null, so two fields are re-encoded on the way
out — the JSON export is the source of truth for these:

- `Indexable` and `Rendered` (JSON: real booleans) become the strings `yes`
  / `no`.
- Every `null` field (JSON: `null`) becomes an **empty cell** in CSV — there
  is no way to tell "empty string" apart from "absent" in a CSV cell, unlike
  JSON where `""` and `null` are distinct (see `contentFingerprint`, which is
  `""` — not absent — when a page had too little content to fingerprint).

A cell whose content would otherwise parse as a spreadsheet formula (leading
`=`, `+`, `-`, `@`, tab, or CR) is prefixed with `'` so Excel/Sheets/LibreOffice
treats it as text rather than executing it. This can only affect `Title`,
`Meta description`, `Fetch error`, `URL`, `Final URL`, and `Canonical` — the
free-text fields sourced from a third-party page.

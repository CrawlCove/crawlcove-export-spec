# crawlcove-export-spec

The JSON Schema and CSV column reference for [Crawl Cove](https://crawlcove.com)'s SEO crawl export — validate, script against, or build integrations on top of a Crawl Cove crawl export without reverse-engineering it.

## What's here

- **[`schema/crawl-export.schema.json`](schema/crawl-export.schema.json)** — a JSON Schema (2020-12) for the full-crawl JSON export the desktop app produces from its Reports page.
- **[`docs/csv-columns.md`](docs/csv-columns.md)** — the column reference for the equivalent CSV export, including exactly how it differs from JSON (booleans, nulls, formula-injection escaping).
- **[`docs/versioning.md`](docs/versioning.md)** — how the `schemaVersion` field changes, and what counts as a breaking change.
- **[`examples/sample-crawl-export.json`](examples/sample-crawl-export.json)** — a real export, produced by the app's own export code against a small seeded crawl, not hand-written JSON.
- **[`scripts/validate.js`](scripts/validate.js)** — a small Ajv-based validator you can point at your own export.

## Install & validate

```sh
git clone https://github.com/CrawlCove/crawlcove-export-spec.git
cd crawlcove-export-spec
npm install
npm run validate -- path/to/your-export.json   # or omit the path to check the bundled sample
```

## Using the schema in your own tools

```js
const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const schema = require('crawlcove-export-spec/schema/crawl-export.schema.json')

const ajv = new Ajv()
addFormats(ajv)
const validate = ajv.compile(schema)
validate(myExport) // false + validate.errors on mismatch
```

## Works with CrawlCove

This is the export format produced by [Crawl Cove](https://crawlcove.com/?utm_source=github&utm_medium=crawlcove-export-spec), a desktop SEO crawler for Windows and Mac. Run a crawl, export the Reports page to JSON or CSV, and validate it here — or build against the schema directly if you're consuming exports programmatically.

## Related tools

- [crawlcove-mcp](https://github.com/CrawlCove/crawlcove-mcp) — MCP server that gives Claude, Cursor and other AI assistants the crawl data: crawl a site, list issues, find broken links.
- [crawlcove-cli](https://github.com/CrawlCove/crawlcove-cli) — command line SEO crawler for scripts and CI; its per-page output uses this spec's field names where it checks the same thing.
- [crawlcove-connector](https://github.com/CrawlCove/crawl-cove-connector) — WordPress plugin that applies Crawl Cove's approved fixes to Yoast, Rank Math, SEOPress, or AIOSEO.
- [crawlcove-redirect-chain-checker](https://github.com/CrawlCove/crawlcove-redirect-chain-checker) — follow every hop of a URL’s redirects; flags chains, loops, HTTPS downgrades and meta refreshes.
- [crawlcove-sitemap-validator](https://github.com/CrawlCove/crawlcove-sitemap-validator) — validate an XML sitemap or sitemap index against the protocol and search-engine limits.
- [crawlcove-robots-txt-tester](https://github.com/CrawlCove/crawlcove-robots-txt-tester) — lint a robots.txt and test which URLs each crawler may fetch, with the deciding line.

## License

MIT — see [LICENSE](LICENSE).

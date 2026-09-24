# Versioning policy

The JSON export carries its own version in the `schemaVersion` field
(e.g. `"1.0.0"`), independent of the Crawl Cove app's own release version and
independent of this repo's git tags (though the two are kept in step — see
below).

`schemaVersion` follows semver, applied to the **shape of the export**, not
its content:

- **Patch** (`1.0.0` → `1.0.1`): a description, example, or non-normative doc
  change in this repo. Never a shape change in the app.
- **Minor** (`1.0.0` → `1.1.0`): an added, optional field, or a widened value
  set (e.g. a new field, or `robotsMeta` starting to allow a previously-unseen
  string). Existing consumers keep working unmodified.
- **Major** (`1.0.0` → `2.0.0`): a removed field, a renamed field, a retyped
  field (e.g. a field that used to be `string | null` becoming `string`), or
  any other change that could break a strict consumer. The app bumps
  `EXPORT_SCHEMA_VERSION` in `src/shared/report/buildJson.ts` in the SAME
  commit as the shape change — the two can never drift.

This repo's own releases track the schema version 1:1 (repo tag `v1.0.0`
documents `schemaVersion: "1.0.0"`). A repo release with no `schemaVersion`
bump is doc-only.

## What's covered

Only the **full-crawl JSON export** (`reports:export-json` in the app) is
versioned here today. The app's other CSV exports (findings, tasks, keyword
movement, meta bulk-edit) are not yet part of this spec — the full-crawl CSV
export is documented in [csv-columns.md](csv-columns.md) as a fixed-order
companion to the JSON export, but does not carry its own version field; treat
column additions there as append-only (new columns are added at the end) and
watch this repo's CHANGELOG for column changes.

## Validating an export

Run the validator against any export the app has actually produced:

```sh
npm install
node scripts/validate.js path/to/your-export.json
```

It exits non-zero and prints every schema violation if the file does not
match `schema/crawl-export.schema.json`. CI runs it against
`examples/sample-crawl-export.json` on every push.

#!/usr/bin/env node
/**
 * Validates a Crawl Cove crawl export (JSON) against schema/crawl-export.schema.json.
 * Usage: node scripts/validate.js [path/to/export.json]
 * Defaults to examples/sample-crawl-export.json when no path is given (CI's check).
 */
const fs = require('node:fs')
const path = require('node:path')
const Ajv2020 = require('ajv/dist/2020').default
const addFormats = require('ajv-formats').default

const target = process.argv[2] ?? path.join(__dirname, '..', 'examples', 'sample-crawl-export.json')
const schemaPath = path.join(__dirname, '..', 'schema', 'crawl-export.schema.json')

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
const data = JSON.parse(fs.readFileSync(target, 'utf8'))

const ajv = new Ajv2020({ allErrors: true, strict: true })
addFormats(ajv)
const validate = ajv.compile(schema)

if (validate(data)) {
  console.log(`OK: ${target} matches schemaVersion ${data.schemaVersion} (${data.pageCount} pages).`)
  process.exit(0)
}

console.error(`FAILED: ${target} does not match ${path.relative(process.cwd(), schemaPath)}`)
for (const err of validate.errors ?? []) {
  console.error(`  ${err.instancePath || '(root)'} ${err.message}`)
}
process.exit(1)

#!/usr/bin/env node
/**
 * GitHub Pages serves missing SPA paths as HTTP 404 (via 404.html).
 * Crawlers treat that as "not found". Copy the built index shell into
 * each public route so Google/Bing/AI bots get HTTP 200.
 */
import { copyFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const dist = join(process.cwd(), 'dist')
const index = join(dist, 'index.html')

const routes = [
  'websites',
  'our-story',
  'partners',
  'team',
  'blog',
  'onboarding',
]

if (!existsSync(index)) {
  console.error('postbuild: dist/index.html missing — run vite build first')
  process.exit(1)
}

for (const route of routes) {
  const dir = join(dist, route)
  mkdirSync(dir, { recursive: true })
  copyFileSync(index, join(dir, 'index.html'))
  console.log(`postbuild: ${route}/index.html`)
}

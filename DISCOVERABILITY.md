# End-to-end discoverability (Google + Bing + AI engines)

## Already on the site (after this deploy)

- `/robots.txt` — allows Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, Claude-SearchBot, etc.
- `/sitemap.xml` — all public routes
- `/llms.txt` + `/llms-full.txt` — AI agent site map
- JSON-LD Organization + FAQ + WebSite schema
- Per-route titles, descriptions, canonicals, Open Graph
- IndexNow key + auto-ping on every GitHub Pages deploy (Bing → ChatGPT Search surface)
- `.nojekyll` so GitHub Pages serves static crawl files cleanly

## You must do once (accounts only you can open)

### 1. Google Search Console
1. Go to https://search.google.com/search-console
2. Add property: `https://shiftaitech.com`
3. Verify (DNS TXT or HTML meta — if meta, send the code and we paste it in `index.html`)
4. Sitemaps → submit `https://shiftaitech.com/sitemap.xml`

### 2. Bing Webmaster Tools (feeds ChatGPT Search)
1. Go to https://www.bing.com/webmasters
2. Add `https://shiftaitech.com`
3. Import from Google Search Console, or verify via XML/meta
4. Sitemaps → submit `https://shiftaitech.com/sitemap.xml`
5. Confirm IndexNow is active (key file is already live after deploy)

### 3. Quick live checks (should all be 200)
- https://shiftaitech.com/robots.txt
- https://shiftaitech.com/sitemap.xml
- https://shiftaitech.com/llms.txt
- https://shiftaitech.com/e1e40fbadc73cc1bec95ead487ae3f3f.txt

### 4. Optional but high leverage
- Claim Clutch / DesignRush / GoodFirms / Sortlist profiles (see visibility playbook)
- Create LinkedIn Company + Crunchbase with exact name **Shift AI Tech**

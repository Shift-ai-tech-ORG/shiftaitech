# End-to-end discoverability (Google + Bing + AI engines)

## Live on shiftaitech.com (verified)

- `/robots.txt` — Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, Claude-SearchBot, etc.
- `/sitemap.xml` — all public routes
- `/llms.txt` + `/llms-full.txt` — AI agent site map
- JSON-LD Organization + FAQ + WebSite in HTML
- Per-route titles / meta / canonicals (client Seo component)
- SPA routes (`/websites`, `/our-story`, …) emit real `index.html` shells → HTTP 200 for crawlers
- IndexNow key + auto-ping on every deploy (Bing → ChatGPT Search)
- Deploy host: `BIGROCKS67/art-ai-website` (custom domain owner). Mirror also on `Shift-ai-tech-ORG/shiftaitech`.

## You must do once (only you can log in)

### 1. Google Search Console
1. https://search.google.com/search-console
2. Add `https://shiftaitech.com`
3. Verify (DNS TXT or HTML meta — paste the meta code here if you need help)
4. Sitemaps → submit `https://shiftaitech.com/sitemap.xml`

### 2. Bing Webmaster Tools (required for ChatGPT Search)
1. https://www.bing.com/webmasters
2. Add `https://shiftaitech.com` (import from GSC if offered)
3. Sitemaps → submit `https://shiftaitech.com/sitemap.xml`
4. IndexNow key file is already at `/e1e40fbadc73cc1bec95ead487ae3f3f.txt`

### 3. Live checks
- https://shiftaitech.com/robots.txt
- https://shiftaitech.com/sitemap.xml
- https://shiftaitech.com/llms.txt
- https://shiftaitech.com/websites (must be **200**, not 404)

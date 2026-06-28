# Scraper Architecture

## Scraper types
- HTML scraper
- PDF downloader
- Search-page crawler
- Sitemap/RSS watcher
- OCR ingest for scanned PDF

## Scraper components
- downloader
- parser
- metadata extractor
- duplicate detector
- retry logic
- rate limiter
- logger

## Safety
- Respect robots.txt
- Prefer official downloads and public endpoints
- Avoid aggressive crawling
- Store every source URL

## Source categories
- Supreme Court
- High Courts
- India Code
- eGazette
- Public repositories with clear permissions

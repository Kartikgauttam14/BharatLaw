# Search Architecture

## Search goals
- Fast full-text search
- Faceted filters
- Typo tolerance
- Court and act filters

## Index strategy
Index normalized metadata and searchable text in OpenSearch/Elasticsearch.

## Query features
- phrase search
- boolean search
- filter by court
- filter by date range
- filter by judge
- filter by statute/section

## Ranking signals
- exact title match
- citation match
- recency
- court priority
- keyword density

# Docker

## Containers
- api
- worker
- scheduler
- postgres
- redis
- opensearch
- frontend
- nginx

## Docker rules
- use slim base images
- pin versions
- keep separate dev and prod compose files
- mount volumes for persistent storage

## Startup
`docker compose up --build`

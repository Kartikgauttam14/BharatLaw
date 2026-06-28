# Deployment

## Recommended deployment
- Docker Compose for development
- Separate containers for API, workers, DB, cache, and search
- NGINX reverse proxy in production

## Environments
- local
- staging
- production

## Deployment checklist
- environment variables set
- migrations run
- search index created
- worker queue active
- backups configured

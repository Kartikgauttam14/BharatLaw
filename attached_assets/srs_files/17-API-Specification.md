# API Specification

## Base principles
- REST JSON API
- versioned routes
- pagination
- filtering
- deterministic responses

## Example endpoints
- GET /api/v1/search
- GET /api/v1/judgments/{id}
- GET /api/v1/courts
- GET /api/v1/acts
- GET /api/v1/sections
- POST /api/v1/bookmarks
- GET /api/v1/ai/summary/{id}
- GET /api/v1/admin/jobs

## Response requirements
- include id
- include source_url
- include timestamps
- include pagination metadata

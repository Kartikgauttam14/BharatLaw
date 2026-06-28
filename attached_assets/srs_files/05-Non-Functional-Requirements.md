# Non-Functional Requirements

## Performance
- Search latency under 1 second for common queries
- API responses under 500 ms for cached metadata

## Scalability
- Support millions of documents
- Horizontal scale for indexing workers

## Reliability
- Idempotent jobs
- Retry with backoff
- Failures logged and replayable

## Maintainability
- Modular scrapers
- Clear service boundaries
- Type hints and structured logging

## Security
- JWT authentication
- Rate limiting
- Input validation
- Audit logs

## Observability
- Metrics
- Traces
- Structured logs
- Alerting on source failures

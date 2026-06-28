# Microservices

## Services
- ingestion-service
- parser-service
- ocr-service
- search-service
- api-service
- auth-service
- admin-service
- ai-service

## Service responsibilities
### ingestion-service
Downloads and tracks source documents.

### parser-service
Extracts text and metadata.

### ocr-service
Handles scanned documents.

### search-service
Maintains the search index and query layer.

### api-service
Serves client requests.

### ai-service
Provides summaries and embeddings.

## Communication
- REST for external APIs
- Queue-based jobs internally
- Shared schema contracts

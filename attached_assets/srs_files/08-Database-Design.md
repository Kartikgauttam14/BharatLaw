# Database Design

## Core entities
- courts
- judges
- cases
- judgments
- acts
- sections
- articles
- citations
- source_documents
- users
- bookmarks
- ingestion_jobs
- ai_summaries

## Design rules
- Keep raw text separate from normalized metadata
- Store source URL and fetch timestamp
- Use stable IDs
- Use soft deletes only when necessary

## Suggested fields for judgments
- id
- court_id
- case_number
- title
- judgment_date
- judges
- bench_size
- citation
- neutral_citation
- source_url
- pdf_url
- full_text
- language
- hash
- created_at
- updated_at

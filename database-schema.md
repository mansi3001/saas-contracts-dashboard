# Database Schema

## Tables Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     USERS       │    │   DOCUMENTS     │    │     CHUNKS      │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ user_id (PK)    │◄──┐│ doc_id (PK)     │◄──┐│ chunk_id (PK)   │
│ username        │   ││ user_id (FK)    │   ││ doc_id (FK)     │
│ password_hash   │   ││ filename        │   ││ user_id (FK)    │
│ created_at      │   ││ contract_name   │   ││ text_chunk      │
└─────────────────┘   ││ parties         │   ││ embedding       │
                      ││ status          │   ││ chunk_metadata  │
                      ││ risk_score      │   │└─────────────────┘
                      ││ uploaded_on     │   │
                      ││ expiry_date     │   │
                      │└─────────────────┘   │
                      └──────────────────────┘

Relationships:
- Users (1) → Documents (Many)
- Documents (1) → Chunks (Many)  
- Users (1) → Chunks (Many)
```

## Table Details

### Users Table
- **user_id**: String (Primary Key) - Unique user identifier
- **username**: String (Unique) - User login name
- **password_hash**: String - Bcrypt hashed password
- **created_at**: DateTime - Account creation timestamp

### Documents Table
- **doc_id**: String (Primary Key) - Unique document identifier
- **user_id**: String (Foreign Key) - References Users.user_id
- **filename**: String - Original uploaded filename
- **contract_name**: String - Display name for contract
- **parties**: String - Contract parties information
- **status**: String - Contract status (Active, Expired, etc.)
- **risk_score**: String - Risk assessment (Low, Medium, High)
- **uploaded_on**: DateTime - Upload timestamp
- **expiry_date**: DateTime - Contract expiration date

### Chunks Table
- **chunk_id**: String (Primary Key) - Unique chunk identifier
- **doc_id**: String (Foreign Key) - References Documents.doc_id
- **user_id**: String (Foreign Key) - References Users.user_id
- **text_chunk**: Text - Extracted text segment
- **embedding**: Text (JSON) - Vector embedding for similarity search
- **chunk_metadata**: Text (JSON) - Additional metadata (page, section, etc.)

## Data Flow

1. **User Registration/Login** → Users table
2. **File Upload** → Documents table + text extraction
3. **Document Processing** → Chunks table with embeddings
4. **Search/Query** → Vector similarity across Chunks
5. **Results** → Aggregated from Documents + Chunks

## Vector Search Implementation

- Text chunks are converted to embeddings using ML models
- Embeddings stored as JSON arrays in SQLite
- Cosine similarity used for semantic search
- Query embeddings compared against stored chunk embeddings
- Top matching chunks returned with relevance scores
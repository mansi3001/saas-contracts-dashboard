# Database Schema - ER Diagram

## Tables Structure

### Users Table
```sql
users (
    user_id UUID PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    password_hash VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
)
```

### Documents Table
```sql
documents (
    doc_id UUID PRIMARY KEY,
    user_id UUID FOREIGN KEY REFERENCES users(user_id),
    filename VARCHAR NOT NULL,
    uploaded_on TIMESTAMP DEFAULT NOW(),
    expiry_date TIMESTAMP,
    status VARCHAR DEFAULT 'Active',
    risk_score VARCHAR DEFAULT 'Low',
    contract_name VARCHAR,
    parties VARCHAR
)
```

### Chunks Table
```sql
chunks (
    chunk_id UUID PRIMARY KEY,
    doc_id UUID FOREIGN KEY REFERENCES documents(doc_id),
    user_id UUID FOREIGN KEY REFERENCES users(user_id),
    text_chunk TEXT NOT NULL,
    embedding VECTOR(4),  -- pgvector extension
    metadata TEXT  -- JSON string
)
```

## Relationships

- **users** 1:N **documents** (One user can have many documents)
- **users** 1:N **chunks** (One user can have many chunks)
- **documents** 1:N **chunks** (One document can have many chunks)

## ER Diagram (Text Representation)

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     USERS       │       │   DOCUMENTS     │       │     CHUNKS      │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ user_id (PK)    │◄─────┐│ doc_id (PK)     │◄─────┐│ chunk_id (PK)   │
│ username        │      ││ user_id (FK)    │      ││ doc_id (FK)     │
│ password_hash   │      ││ filename        │      ││ user_id (FK)    │
│ created_at      │      ││ uploaded_on     │      ││ text_chunk      │
└─────────────────┘      ││ expiry_date     │      ││ embedding       │
                         ││ status          │      ││ metadata        │
                         ││ risk_score      │      │└─────────────────┘
                         ││ contract_name   │      │
                         ││ parties         │      │
                         │└─────────────────┘      │
                         └─────────────────────────┘
```

## Key Features

1. **Multi-tenant isolation**: All queries filtered by user_id
2. **Vector embeddings**: Using pgvector extension for semantic search
3. **Document metadata**: Rich metadata for business intelligence
4. **Chunk-based storage**: Documents split into searchable chunks
5. **UUID primary keys**: Better for distributed systems and security
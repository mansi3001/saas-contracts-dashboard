# Contracts SaaS Backend

FastAPI backend for the Contracts SaaS application with PostgreSQL + pgvector for document storage and vector search.

## Features

- **Authentication**: JWT-based multi-user authentication
- **Multi-tenancy**: All operations scoped to user_id
- **Document Upload**: PDF/TXT/DOCX file processing
- **Vector Search**: Semantic search using pgvector
- **Mock LlamaCloud**: Simulated document parsing and embedding

## Tech Stack

- **Framework**: FastAPI
- **Database**: PostgreSQL + pgvector
- **Authentication**: JWT tokens
- **File Processing**: PyPDF2, python-docx
- **Vector Operations**: pgvector, scikit-learn

## Setup

### Prerequisites

- Python 3.11+
- PostgreSQL with pgvector extension
- pip

### Installation

1. **Clone and navigate to backend**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Setup PostgreSQL with pgvector**
   ```sql
   CREATE DATABASE contracts_db;
   CREATE EXTENSION vector;
   ```

5. **Run the application**
   ```bash
   uvicorn main:app --reload
   ```

The API will be available at `http://localhost:8000`

## API Endpoints

### Authentication
- `POST /signup` - Create new user account
- `POST /login` - User login

### Contracts
- `POST /upload` - Upload and process contract file
- `GET /contracts` - List user's contracts
- `GET /contracts/{doc_id}` - Get contract details

### Query
- `POST /ask` - Natural language query with vector search

## Database Schema

### Users
- `user_id` (UUID, Primary Key)
- `username` (String, Unique)
- `password_hash` (String)
- `created_at` (DateTime)

### Documents
- `doc_id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `filename` (String)
- `uploaded_on` (DateTime)
- `expiry_date` (DateTime)
- `status` (String)
- `risk_score` (String)
- `contract_name` (String)
- `parties` (String)

### Chunks
- `chunk_id` (UUID, Primary Key)
- `doc_id` (UUID, Foreign Key)
- `user_id` (UUID, Foreign Key)
- `text_chunk` (Text)
- `embedding` (Vector(4))
- `metadata` (Text/JSON)

## Deployment

### Render/Heroku

1. **Create new web service**
2. **Connect GitHub repository**
3. **Set environment variables**:
   - `DATABASE_URL`
   - `SECRET_KEY`
4. **Deploy**

### Environment Variables

```env
DATABASE_URL=postgresql://username:password@host:port/database
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Mock LlamaCloud Response

The application simulates LlamaCloud document parsing:

```json
{
  "document_id": "doc123",
  "chunks": [
    {
      "chunk_id": "c1",
      "text": "Termination clause: Either party may terminate with 90 days' notice.",
      "embedding": [0.12, -0.45, 0.91, 0.33],
      "metadata": { "page": 2, "contract_name": "MSA.pdf" }
    }
  ]
}
```

## Testing

```bash
# Test signup
curl -X POST "http://localhost:8000/signup" \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "password": "password123"}'

# Test login
curl -X POST "http://localhost:8000/login" \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "password": "password123"}'

# Test upload (with token)
curl -X POST "http://localhost:8000/upload" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@contract.pdf"
```
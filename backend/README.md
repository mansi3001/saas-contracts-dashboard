# SaaS Contracts Dashboard - Backend API

A FastAPI-based backend for the SaaS Contracts Dashboard with AI-powered contract processing and vector search capabilities.

## 🚀 Live API

- **API Base URL**: [https://contracts-saas-api.onrender.com](https://contracts-saas-api.onrender.com)
- **API Documentation**: [https://contracts-saas-api.onrender.com/docs](https://contracts-saas-api.onrender.com/docs)

## 📋 Features

- **Multi-tenant Authentication** - JWT-based user management
- **Document Processing** - PDF, TXT, DOCX file parsing
- **Vector Search** - Semantic search across contract content
- **Natural Language Queries** - AI-powered contract Q&A
- **RESTful API** - Clean API design with automatic documentation
- **Database Integration** - SQLite with vector embeddings

## 🛠️ Tech Stack

- **Framework**: FastAPI
- **Database**: SQLite with vector storage
- **Authentication**: JWT tokens with bcrypt hashing
- **File Processing**: PyPDF2, python-docx
- **Vector Search**: scikit-learn cosine similarity
- **Deployment**: Render
- **Documentation**: Automatic OpenAPI/Swagger

## 🔧 Environment Setup

Create `.env` file:
```bash
DATABASE_URL=sqlite:///./contracts.db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## 🚀 Setup Instructions

### Prerequisites
- Python 3.11+
- pip

### Installation

1. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Initialize database**
   ```bash
   python init_db.py
   ```

4. **Start development server**
   ```bash
   uvicorn main:app --reload
   ```

5. **Access API**
   - API: `http://localhost:8000`
   - Docs: `http://localhost:8000/docs`

## 📊 Database Schema

### Users Table
- `user_id` (String, Primary Key)
- `username` (String, Unique)
- `password_hash` (String)
- `created_at` (DateTime)

### Documents Table
- `doc_id` (String, Primary Key)
- `user_id` (String, Foreign Key)
- `filename` (String)
- `contract_name` (String)
- `parties` (String)
- `status` (String)
- `risk_score` (String)
- `uploaded_on` (DateTime)
- `expiry_date` (DateTime)

### Chunks Table
- `chunk_id` (String, Primary Key)
- `doc_id` (String, Foreign Key)
- `user_id` (String, Foreign Key)
- `text_chunk` (Text)
- `embedding` (Text, JSON)
- `chunk_metadata` (Text, JSON)

## 🔌 API Endpoints

### Authentication
- `POST /signup` - User registration
- `POST /login` - User authentication

### Contracts
- `GET /contracts` - List user contracts
- `GET /contracts/{doc_id}` - Get contract details
- `POST /upload` - Upload contract file

### AI Features
- `POST /ask` - Natural language contract queries

### System
- `GET /` - Health check
- `GET /health` - System status

## 🧠 AI Features

### Document Processing
- Automatic text extraction from PDF, DOC, DOCX files
- Smart chunking for better search performance
- Metadata extraction and storage

### Vector Search
- Semantic embeddings for contract content
- Cosine similarity matching
- Relevance scoring for query results

### Natural Language Queries
- Question answering over contract content
- Evidence-based responses with source citations
- Multi-document search capabilities

## 🚀 Deployment

### Render Deployment
```yaml
# render.yaml
services:
  - type: web
    name: contracts-saas-api
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Environment Variables
Set in Render dashboard:
- `DATABASE_URL`: SQLite database path
- `SECRET_KEY`: JWT signing key
- `ENVIRONMENT`: production

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt
- **JWT Tokens**: Secure authentication
- **Multi-tenant Isolation**: User data separation
- **Input Validation**: Pydantic models
- **CORS Protection**: Configured origins

## 📈 Performance

- **Async Operations**: FastAPI async/await
- **Database Optimization**: Indexed queries
- **Vector Caching**: Efficient similarity search
- **File Streaming**: Memory-efficient uploads

## 🧪 Testing

### Manual Testing
```bash
# Test signup
curl -X POST "http://localhost:8000/signup" \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "password": "test123"}'

# Test file upload
curl -X POST "http://localhost:8000/upload" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@contract.pdf"
```

### API Documentation
Visit `/docs` for interactive API testing with Swagger UI.

## 🔗 Frontend Integration

This backend serves the React frontend:
- **Frontend URL**: `https://saas-contracts-dashboard-mansi.netlify.app`
- **CORS Enabled**: For frontend domain
- **JWT Integration**: Seamless authentication flow
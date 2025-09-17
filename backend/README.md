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
- **Deployment**: Render

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

- `POST /signup` - User registration
- `POST /login` - User authentication
- `GET /contracts` - List user contracts
- `GET /contracts/{doc_id}` - Get contract details
- `POST /upload` - Upload contract file
- `POST /ask` - Natural language contract queries

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
- `ALGORITHM`: algorithm
- `ACCESS_TOKEN_EXPIRE_MINUTES`: minutes

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt
- **JWT Tokens**: Secure authentication
- **Multi-tenant Isolation**: User data separation
- **CORS Protection**: Configured origins

## 📈 Performance

- **Async Operations**: FastAPI async/await
- **Database Optimization**: Indexed queries
- **Vector Caching**: Efficient similarity search
- **File Streaming**: Memory-efficient uploads

### API Documentation
Visit `/docs` for interactive API testing with Swagger UI.

## 🔗 Frontend Integration

This backend serves the React frontend:
- **Frontend URL**: `https://saas-contracts-dashboard-mansi.netlify.app`
- **CORS Enabled**: For frontend domain
- **JWT Integration**: Seamless authentication flow
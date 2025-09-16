# SaaS Contracts Dashboard - Full Stack Prototype

A modern full-stack SaaS application for contract management with AI-powered insights and natural language querying.

## 🚀 Live Demo

- **Frontend**: [Live Application](https://saas-contracts-dashboard-mansi.netlify.app)
- **Backend API**: [API Endpoint](https://contracts-saas-api.onrender.com)

## 📋 Features

### Core Functionality
- **Multi-tenant Authentication** - Secure user signup and login
- **Document Upload** - Drag & drop support for PDF, TXT, DOCX files
- **Smart Parsing** - Automatic document processing and chunking
- **Vector Search** - Semantic search across contract content
- **Natural Language Queries** - Ask questions about your contracts
- **Business Dashboard** - Professional interface for contract management

### Dashboard Features
- Contract overview with search and filtering
- Detailed contract insights and analysis
- AI-powered recommendations
- Evidence-based query responses
- Responsive design for desktop and mobile

## 🛠️ Technology Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: Python FastAPI
- **Database**: PostgreSQL with pgvector
- **Authentication**: JWT tokens
- **Deployment**: Netlify + Render

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL with pgvector

### Frontend Setup
```bash
cd saas-contracts-dashboard
npm install
npm start
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Configure your database URL in .env
uvicorn main:app --reload
```

## 📁 Project Structure

```
├── saas-contracts-dashboard/     # React frontend
├── backend/                      # FastAPI backend
├── sample-contracts/             # Test contract files
└── documentation files
```

## 🧪 How to Use

1. **Sign Up/Login** - Create account or login
2. **Upload Contracts** - Drag & drop PDF/TXT/DOCX files
3. **Browse Dashboard** - View and search your contracts
4. **Query Contracts** - Ask natural language questions
5. **View Insights** - Get AI-powered contract analysis



## 🚀 Deployment

The application is deployed and ready to use:
- Frontend hosted on Netlify
- Backend API on Render
- Database on Supabase with pgvector

## 🔐 Security & Architecture

- Multi-tenant data isolation
- JWT-based authentication
- Secure password handling
- Vector-based semantic search
- Scalable microservices architecture
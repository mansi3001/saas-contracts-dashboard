# SaaS Contracts Dashboard - Frontend

A modern React-based frontend for the SaaS Contracts Dashboard with AI-powered contract management and natural language querying.

## 🚀 Live Demo

[View Live Demo](https://saas-contracts-dashboard-mansi.netlify.app)

## 📋 Features

- **Multi-tenant Authentication** - JWT-based secure login/signup
- **Document Upload** - Drag & drop support for PDF, TXT, DOCX files
- **Smart Dashboard** - Contract overview with search and filtering
- **Contract Details** - AI insights, clauses analysis, and evidence
- **Natural Language Queries** - Ask questions about contracts
- **Responsive Design** - Mobile-first responsive design

## 🛠️ Tech Stack

- **Frontend**: React 18 + Hooks
- **Styling**: Tailwind CSS
- **State Management**: Context API + localStorage
- **Routing**: React Router DOM
- **HTTP Client**: Fetch API
- **Icons**: Lucide React
- **Build Tool**: Create React App

## 🔧 Environment Setup

Create `.env` file:
```bash
REACT_APP_API_URL=https://contracts-saas-api.onrender.com
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+
- npm

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API URL
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open browser**
   Navigate to `http://localhost:3000`

### Usage
- Sign up with any username/password
- Upload PDF/TXT/DOCX contracts
- Browse dashboard and ask questions

## 🏗️ Architecture

### Authentication Flow
- JWT tokens stored in localStorage
- Automatic token refresh handling
- Protected routes with auth context

### State Management
- React Context for global auth state
- Local state for component-specific data
- API service layer for backend communication

### File Upload
- Drag & drop interface
- File type validation (PDF, DOC, DOCX, TXT)
- Progress tracking and error handling

### API Integration
- RESTful API communication
- Error handling and loading states
- Automatic token inclusion in requests

## 📁 Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components
│   ├── layout/          # Layout components
│   └── ui/              # UI components
├── context/             # React Context providers
├── pages/               # Page components
├── services/            # API service layer
└── App.js               # Main app component
```

## 🚀 Deployment

**Live Demo**: [https://saas-contracts-dashboard-mansi.netlify.app](https://saas-contracts-dashboard-mansi.netlify.app)

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables in Netlify dashboard

## 🔗 Backend Integration

This frontend connects to the FastAPI backend:
- **API Base URL**: `https://contracts-saas-api.onrender.com`
- **Authentication**: JWT Bearer tokens
- **File Upload**: Multipart form data
- **Vector Search**: Semantic contract querying
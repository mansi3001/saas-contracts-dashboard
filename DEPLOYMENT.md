# Deployment Guide

Complete deployment guide for the SaaS Contracts Dashboard.

## Prerequisites

- GitHub account
- Netlify account (for frontend)
- Render account (for backend)
- Supabase account (for database) OR local PostgreSQL with pgvector

## Database Setup (Supabase)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note down the database URL

2. **Enable pgvector Extension**
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```

3. **Get Connection String**
   - Go to Settings > Database
   - Copy the connection string
   - Format: `postgresql://postgres:[password]@[host]:6543/postgres`

## Backend Deployment (Render)

1. **Push Code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Create Render Web Service**
   - Go to [render.com](https://render.com)
   - Click "New" > "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder as root directory

3. **Configure Build Settings**
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Python Version**: 3.11

4. **Set Environment Variables**
   ```
   DATABASE_URL=your_supabase_connection_string
   SECRET_KEY=your_secret_key_here
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note the service URL (e.g., `https://your-app.onrender.com`)

## Frontend Deployment (Netlify)

1. **Update API URL**
   - Edit `saas-contracts-dashboard/.env.production`
   ```
   REACT_APP_API_URL=https://your-render-app.onrender.com
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Select the `saas-contracts-dashboard` folder

3. **Configure Build Settings**
   - **Build Command**: `npm run build`
   - **Publish Directory**: `build`
   - **Base Directory**: `saas-contracts-dashboard`

4. **Set Environment Variables**
   ```
   REACT_APP_API_URL=https://your-render-app.onrender.com
   ```

5. **Deploy**
   - Click "Deploy site"
   - Wait for deployment to complete
   - Note the site URL

## Local Development Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your database URL
python init_db.py
uvicorn main:app --reload
```

### Frontend
```bash
cd saas-contracts-dashboard
npm install
cp .env.example .env.local
# Edit .env.local with your API URL
npm start
```

## Testing Deployment

1. **Test Backend**
   ```bash
   cd backend
   python test_api.py
   ```

2. **Test Frontend**
   - Visit your Netlify URL
   - Try signup/login
   - Upload a test file
   - Query contracts

## Troubleshooting

### Backend Issues
- Check Render logs for errors
- Verify DATABASE_URL is correct
- Ensure pgvector extension is enabled
- Check environment variables

### Frontend Issues
- Verify REACT_APP_API_URL is correct
- Check browser console for errors
- Ensure CORS is configured in backend

### Database Issues
- Test connection string locally
- Verify pgvector extension is installed
- Check database permissions

## Production Considerations

### Security
- Use strong SECRET_KEY
- Enable HTTPS only
- Set proper CORS origins
- Use environment variables for secrets

### Performance
- Enable database connection pooling
- Add caching for frequent queries
- Optimize vector search queries
- Use CDN for static assets

### Monitoring
- Set up error tracking (Sentry)
- Monitor API response times
- Track database performance
- Set up uptime monitoring

## Scaling

### Database
- Use read replicas for queries
- Implement database sharding
- Optimize vector indexes
- Monitor query performance

### Backend
- Use multiple Render instances
- Implement caching (Redis)
- Add rate limiting
- Use async processing for uploads

### Frontend
- Implement code splitting
- Use lazy loading
- Optimize bundle size
- Add service worker for caching
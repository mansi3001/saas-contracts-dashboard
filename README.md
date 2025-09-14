# SaaS Contracts Dashboard

A modern React-based SaaS application for managing contracts with AI-powered insights, built for the UI/UX Developer Assignment.

## 🚀 Live Demo

[View Live Demo](https://saas-contracts-dashboard-mansi.netlify.app/login)

## 📋 Features

- **Authentication**: Mock login system with JWT token management
- **Dashboard**: Comprehensive contracts overview with search and filtering
- **Contract Details**: Detailed view with clauses, AI insights, and evidence
- **File Upload**: Drag-and-drop file upload simulation
- **Responsive Design**: Mobile-first responsive design
- **State Management**: Context API for global state management

## 🛠️ Tech Stack Choices

- **Frontend**: React 19 (Functional Components + Hooks)
- **Styling**: Tailwind CSS 3.x
- **State Management**: React Context API
- **Routing**: React Router DOM
- **HTTP Client**: Fetch API
- **Icons**: Lucide React
- **Package Manager**: npm

### Why These Choices?

- **React 19**: Latest version with modern hooks and performance improvements
- **Tailwind CSS**: Utility-first approach for rapid development and consistent design
- **Context API**: Built-in React solution, sufficient for this application's state needs
- **Functional Components**: Modern React best practices with better performance

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mansi3001/saas-contracts-dashboard.git
   cd saas-contracts-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Login Credentials
- **Username**: Any value
- **Password**: `test123`

## 🔧 Assumptions Made

### Authentication
- Mock authentication system (no real backend)
- Any username accepted, fixed password for demo purposes
- JWT token stored in localStorage for session persistence

### Data Management
- Static JSON files for contract data (`public/contracts.json`)
- No real database or API endpoints
- File uploads are simulated with timeout delays

### API Simulation
- 1-3 second upload delay to simulate real network requests
- Contract details fetched from static JSON files

### Design Decisions
- Mobile-first responsive design approach
- Professional SaaS application UI patterns
- Consistent color scheme with primary blue theme
- Loading states and error handling for better UX

### File Upload
- Only accepts PDF, DOC, DOCX, TXT files
- File validation happens client-side
- No actual file storage (simulation only)

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ features used

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components (Modal, etc.)
│   ├── layout/          # Layout components (Sidebar, Header)
│   └── ui/              # Specific UI components
├── context/             # Context providers
├── pages/               # Page components
├── services/            # API services
```

## 🧪 Testing

### Test Scenarios
1. Login with correct/incorrect credentials
2. Navigate between dashboard and contract details
3. Search and filter contracts
4. Upload files (valid/invalid formats)
5. View contract insights and evidence in contract detail page
6. Test responsive design on mobile

## 🚀 Deployment

**Live Demo**: [https://saas-contracts-dashboard-mansi.netlify.app/login](https://saas-contracts-dashboard-mansi.netlify.app/login)

Deployed on Netlify. To deploy elsewhere:

```bash
npm run build
```

---

**Note**: This is a demo application built for assignment purposes. Authentication and API endpoints are mocked for demonstration.
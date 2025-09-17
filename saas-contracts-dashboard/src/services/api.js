const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://contracts-saas-api.onrender.com' || 'http://localhost:8000';
console.log('API_BASE_URL:', API_BASE_URL);
console.log('Environment:', process.env.NODE_ENV);
console.log('All env vars:', Object.keys(process.env).filter(key => key.startsWith('REACT_APP')));

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Network error' }));
    throw new Error(error.detail || 'Request failed');
  }
  return response.json();
};

export const authAPI = {
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    const data = await handleResponse(response);
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user', JSON.stringify({ username: credentials.username }));
    
    return {
      success: true,
      token: data.access_token,
      user: { username: credentials.username }
    };
  },
  
  signup: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    const data = await handleResponse(response);
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user', JSON.stringify({ username: credentials.username }));
    
    return {
      success: true,
      token: data.access_token,
      user: { username: credentials.username }
    };
  },
  
  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return { success: true };
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export const contractsAPI = {
  getContracts: async (filters = {}) => {
    const response = await fetch(`${API_BASE_URL}/contracts`, {
      headers: getAuthHeaders()
    });
    
    let contracts = await handleResponse(response);
    
    // Apply client-side filters
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      contracts = contracts.filter(contract => 
        contract.contract_name.toLowerCase().includes(searchTerm) ||
        contract.parties.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.status && filters.status !== 'all') {
      contracts = contracts.filter(contract => contract.status === filters.status);
    }
    
    if (filters.risk && filters.risk !== 'all') {
      contracts = contracts.filter(contract => contract.risk_score === filters.risk);
    }
    
    return contracts;
  },
  
  getContractById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/contracts/${id}`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  },
  
  uploadContract: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData
    });
    
    return handleResponse(response);
  },
  
  askQuestion: async (question) => {
    const response = await fetch(`${API_BASE_URL}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({ question })
    });
    
    return handleResponse(response);
  }
};

// Legacy API for backward compatibility
export const api = {
  getContracts: contractsAPI.getContracts,
  getContractDetails: contractsAPI.getContractById,
  uploadFile: contractsAPI.uploadContract
};
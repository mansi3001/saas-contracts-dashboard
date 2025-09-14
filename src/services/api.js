export const api = {
  async getContracts() {
    try {
      const response = await fetch('/contracts.json');
      if (!response.ok) throw new Error('Failed to fetch contracts');
      return await response.json();
    } catch (error) {
      throw new Error('Failed to load contracts');
    }
  },

  async getContractDetails(id) {
    try {
      const response = await fetch('/contract-details.json');
      if (!response.ok) throw new Error('Failed to fetch contract details');
      const data = await response.json();
      return data[id] || null;
    } catch (error) {
      throw new Error('Failed to load contract details');
    }
  },

  async uploadFile(file) {
    return new Promise((resolve) => {
      // Simulate upload time (1-3 seconds)
      const uploadTime = Math.random() * 2000 + 1000;
      
      setTimeout(() => {
        resolve({
          id: Date.now(),
          name: file.name,
          size: file.size,
          status: 'success'
        });
      }, uploadTime);
    });
  }
};
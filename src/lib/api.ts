// API Client for MongoDB Backend
// HARDCODED for production - change this if needed
const API_URL = 'https://vishnulogisticsbackend.onrender.com';

// Debug: Log the API URL
console.log('🔗 API URL configured:', API_URL);
console.log('🔗 Environment variable:', import.meta.env.VITE_API_URL);

// Token management
export const getToken = (): string | null => localStorage.getItem('token');
export const setToken = (token: string): void => localStorage.setItem('token', token);
export const removeToken = (): void => localStorage.removeItem('token');

// API request helper
const apiRequest = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
  const token = getToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
};

// Auth API
export const authAPI = {
  register: async (userData: {
    email: string;
    password: string;
    full_name: string;
    phone?: string;
    role: 'customer' | 'driver' | 'admin';
  }) => {
    const data = await apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    if (data.data.token) setToken(data.data.token);
    return data.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const data = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (data.data.token) setToken(data.data.token);
    return data.data;
  },

  getCurrentUser: async () => {
    const data = await apiRequest('/api/auth/me');
    return data.data.user;
  },

  logout: () => removeToken(),
};

// Deliveries API
export const deliveriesAPI = {
  getAll: async () => {
    const data = await apiRequest('/api/deliveries');
    return data.data;
  },

  getById: async (id: string) => {
    const data = await apiRequest(`/api/deliveries/${id}`);
    return data.data;
  },

  create: async (deliveryData: any) => {
    const data = await apiRequest('/api/deliveries', {
      method: 'POST',
      body: JSON.stringify(deliveryData),
    });
    return data.data;
  },

  update: async (id: string, updates: any) => {
    const data = await apiRequest(`/api/deliveries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    return data.data;
  },

  assignDriver: async (id: string, driver_id: string) => {
    const data = await apiRequest(`/api/deliveries/${id}/assign`, {
      method: 'PUT',
      body: JSON.stringify({ driver_id }),
    });
    return data.data;
  },
};

// Tracking API
export const trackingAPI = {
  getByDeliveryId: async (deliveryId: string) => {
    const data = await apiRequest(`/api/tracking/${deliveryId}`);
    return data.data;
  },

  create: async (trackingData: {
    delivery_id: string;
    latitude: number;
    longitude: number;
  }) => {
    const data = await apiRequest('/api/tracking', {
      method: 'POST',
      body: JSON.stringify(trackingData),
    });
    return data.data;
  },
};

// Admin API
export const adminAPI = {
  getStats: async () => {
    const data = await apiRequest('/api/admin/stats');
    return data.data;
  },

  getDrivers: async () => {
    const data = await apiRequest('/api/admin/drivers');
    return data.data;
  },
};

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ra_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('ra_token');
      localStorage.removeItem('ra_user');
    }
    return Promise.reject(error);
  }
);

export const getImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http') || !url.startsWith('/uploads')) return url;
  const base = import.meta.env.VITE_UPLOADS_URL || 'http://localhost:5000';
  return `${base}${url}`;
};

export default api;

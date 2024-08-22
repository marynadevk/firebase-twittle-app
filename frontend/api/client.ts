import { envConfig } from '@/config';
import axios from 'axios';

const api = axios.create({
  withCredentials: true,
  baseURL: envConfig.apiBaseUrl,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  }

  return config;
});

export default api;

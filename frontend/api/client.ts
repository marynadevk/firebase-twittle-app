import { envConfig } from '@/config';
import { auth } from '@/lib/firebase/firebase.config';
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

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const token = await currentUser.getIdToken();
          localStorage.setItem('token', JSON.stringify(token));

          return api.request(originalRequest);
        }
      } catch (e) {}
    }
    throw error;
  }
);

export default api;

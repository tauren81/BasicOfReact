import axios from 'axios';

import { useAuthStore } from '../store/authstore';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  console.log('api.interceptors.request 1:', config);
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('api.interceptors.request 2:', config);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log('api.interceptors.response:', response);
    return response;
  },
  (error) => {
    console.error('api.interceptors.response Error:', error);
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  },
);

export default api;

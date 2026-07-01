import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  };

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.DEV) {
      console.error('API Error:', error);
    }

    return Promise.reject(error);
  }
);

export default api;

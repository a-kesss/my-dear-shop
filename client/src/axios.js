import axios from 'axios';

const axiosInstance = axios.create({
  baseUrl: import.meta.env.VITE_URL,
});

let accessToken = '';

export function setAccessToken(newToken) {
  accessToken = newToken;
}

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosInstance;

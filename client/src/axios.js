import axios from 'axios';

const axiosInstance = axios.create({
  baseURl: import.meta.env.VITE_URL,
});

export default axiosInstance;

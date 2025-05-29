import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:5000/api',
  withCredentials: true // Permite enviar cookies httpOnly
});

export default api;

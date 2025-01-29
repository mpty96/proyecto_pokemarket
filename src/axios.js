import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
  withCredentials: true, // Para trabajar con cookies y autenticación CSRF
});

export default api;


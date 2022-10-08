import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL:    'http://localhost:7000',    //process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export default api;
import axios from 'axios';

export const api: any = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // withCredentials: true
});
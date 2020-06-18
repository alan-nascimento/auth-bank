import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Accept': 'application/json',
    'Content': 'application/json',
  }
})

http.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config;
}, err => Promise.reject(err))

export default http;
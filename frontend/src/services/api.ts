import axios from 'axios';

// Configuração da API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 segundos de timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para debug de erros
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Erro na requisição:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      baseURL: error.config?.baseURL
    });
    return Promise.reject(error);
  }
);

// Log da configuração para debug
console.log('🔧 API configurada para:', API_URL); 
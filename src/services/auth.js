import axios from 'axios';

const baseURL = 'http://localhost:3000/api';

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL,
      timeout: 5000
    });
    
    // Add request interceptor
    this.api.interceptors.request.use(
      config => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token ? token.replace(/['"]+/g, '').trim() : null;
  }

  setToken(token) {
    if (token) {
      localStorage.setItem('token', token.trim());
    }
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  getApi() {
    return this.api;
  }
}

export default new AuthService();

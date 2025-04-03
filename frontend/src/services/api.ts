import axios from 'axios';
import { AuthService } from './auth.service';

let accessToken = '';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://ux-glossary-back-production.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 👉 Подставляем access_token
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 👉 Обработка 401 — рефрешим токен
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Проверка: если 401 и запрос ещё не был повторён
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const rt = localStorage.getItem('rt');
        if (!rt) throw new Error('No refresh token');

        const tokens = await AuthService.refresh({rt});
        localStorage.setItem('at', tokens.access_token);
        localStorage.setItem('rt', tokens.refresh_token);

        // Применяем новый токен и повторяем запрос
        originalRequest.headers.Authorization = `Bearer ${tokens.access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        // Можно сюда добавить логаут
      }
    }

    return Promise.reject(error);
  }
);

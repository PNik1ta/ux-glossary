import { ILoginUserDto } from '../dto/auth/login-user.dto';
import { IRefreshTokenDto } from '../dto/auth/refresh-token.dto';
import { IRegisterUserDto } from '../dto/auth/register-user.dto';
import { api } from './api';

interface Tokens {
  access_token: string;
  refresh_token: string;
}

export const AuthService = {
  async login(dto: ILoginUserDto): Promise<Tokens> {
    const res = await api.post<Tokens>('/auth/login', dto);
    localStorage.setItem('rt', res.data.refresh_token);
    localStorage.setItem('at', res.data.access_token);
    return res.data;
  },

  async register(dto: IRegisterUserDto): Promise<Tokens> {
    const res = await api.post<Tokens>('/auth/register', dto);
    localStorage.setItem('rt', res.data.refresh_token);
    localStorage.setItem('at', res.data.access_token);
    return res.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
    localStorage.removeItem('at')
    localStorage.removeItem('rt')
  },

  async refresh(dto: IRefreshTokenDto): Promise<Tokens> {
    const res = await api.post<Tokens>('/auth/refresh', dto);
    localStorage.setItem('rt', res.data.refresh_token);
    localStorage.setItem('at', res.data.access_token);
    return res.data;
  },
};

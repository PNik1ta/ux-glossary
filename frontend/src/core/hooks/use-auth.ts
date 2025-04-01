import { useState, useEffect } from 'react';
import { AuthService } from '@/services/auth.service';
import { setAccessToken } from '@/services/api';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);

  const login = async (email: string, password: string) => {
    const tokens = await AuthService.login(email, password);
    localStorage.setItem('rt', tokens.refresh_token);
    setAccessToken(tokens.access_token);
    // Можно сразу получить профиль
  };

  const logout = async () => {
    await AuthService.logout();
    localStorage.removeItem('rt');
    setAccessToken('');
    setUser(null);
  };

  const tryRefresh = async () => {
    const rt = localStorage.getItem('rt');
    if (!rt) return;
    try {
      const tokens = await AuthService.refresh(rt);
      setAccessToken(tokens.access_token);
    } catch (e) {
      console.error('Refresh failed');
    }
  };

  useEffect(() => {
    tryRefresh();
  }, []);

  return {
    user,
    login,
    logout,
  };
};

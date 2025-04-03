import { useState, useEffect } from 'react';
import { AuthService } from '@/services/auth.service';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);

  const login = async (email: string, password: string) => {
    await AuthService.login({ email, password });
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  const tryRefresh = async () => {
    const rt = localStorage.getItem('rt');
    if (!rt) return;
    try {
      await AuthService.refresh({ rt });
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

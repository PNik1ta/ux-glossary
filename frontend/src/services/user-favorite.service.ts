import { IUserFavorites } from '../core/interfaces/user-favorites.interface';
import { api } from './api';

interface BaseResponse<T> {
  message: string;
  date: string;
  data: T;
}

export const UserFavoriteService = {
  async getFavorites(): Promise<BaseResponse<IUserFavorites[]>> {
    const res = await api.get<BaseResponse<IUserFavorites[]>>(`/user-favorite`);
    return res.data;
  },

  async getFavoritesByUserId(): Promise<BaseResponse<IUserFavorites[]>> {
    const res = await api.get<BaseResponse<IUserFavorites[]>>(`/user-favorites/get-favorites`)
    return res.data
  },

  async create(data: IUserFavorites): Promise<BaseResponse<IUserFavorites>> {
    const res = await api.post<BaseResponse<IUserFavorites>>(`/user-favorite`, data);
    return res.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/user-favorite/${id}`);
  },
};

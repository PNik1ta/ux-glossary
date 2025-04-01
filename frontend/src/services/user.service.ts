import { IUser } from '../core/interfaces/user.interface';
import { ICreateUserDto } from '../dto/user/create-user.dto';
import { IUpdateUserDto } from '../dto/user/update-user.dto';
import { api } from './api';

interface BaseResponse<T> {
  message: string;
  date: string;
  data: T;
}

export const UserService = {
  async getAll(): Promise<BaseResponse<IUser[]>> {
    const res = await api.get<BaseResponse<IUser[]>>(`/user`);
    return res.data;
  },

  async findById(id: number): Promise<BaseResponse<IUser>> {
    const res = await api.get<BaseResponse<IUser>>(`/user/${id}`);
    return res.data;
  },

  async findByEmail(email: string): Promise<BaseResponse<IUser>> {
    const res = await api.get<BaseResponse<IUser>>(`/user/find-by-email/${email}`);
    return res.data;
  },

  async getProfile(): Promise<BaseResponse<IUser>> {
    const res = await api.get<BaseResponse<IUser>>(`/user/get-profile`);
    return res.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/user/${id}`);
  },

  async updateCurrentUser(dto: IUpdateUserDto): Promise<void> {
    await api.put(`/user/update-info`, dto);
  },

  async create(dto: ICreateUserDto): Promise<BaseResponse<IUser>> {
    const res = await api.post(`/user`, dto)
    return res.data
  }
};

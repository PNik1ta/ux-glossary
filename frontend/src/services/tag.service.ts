import { ITag } from '../core/interfaces/tag.interface';
import { ICreateTagDto } from '../dto/tag/create-tag.dto';
import { IUpdateTagDto } from '../dto/tag/update-tag.dto';
import { api } from './api';

interface BaseResponse<T> {
  message: string;
  date: string;
  data: T;
}

export const TagService = {
  async getAll(): Promise<BaseResponse<ITag[]>> {
    const res = await api.get<BaseResponse<ITag[]>>(`/tag`);
    return res.data;
  },

  async getById(id: number): Promise<BaseResponse<ITag>> {
    const res = await api.get<BaseResponse<ITag>>(`/tag/${id}`)
    return res.data;
  },

  async create(dto: ICreateTagDto): Promise<BaseResponse<ITag>> {
    const res = await api.post<BaseResponse<ITag>>(`/tag`, dto);
    return res.data;
  },

  async update(id: number, dto: IUpdateTagDto): Promise<void> {
    await api.put(`/tag/${id}`, dto);
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/tag/${id}`);
  },
};

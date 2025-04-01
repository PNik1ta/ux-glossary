import { BaseResponse } from '../core/classes/base-response';
import { ITermin } from '../core/interfaces/termin.interface';
import { ICreateTerminDto } from '../dto/termin/create-termin.dto';
import { IUpdateTerminDto } from '../dto/termin/update-termin.dto';
import { api } from './api';


export const TerminService = {
  async findBySearch(search: string): Promise<BaseResponse<ITermin[]>> {
    const res = await api.get<BaseResponse<ITermin[]>>(`/termin/find-by-search`, {
      params: { search }
    });
    return res.data;
  },

  async findByUserId(): Promise<BaseResponse<ITermin[]>> {
    const res = await api.get<BaseResponse<ITermin[]>>(`/termin/get-termins`)
    return res.data
  },

  async findById(id: number): Promise<BaseResponse<ITermin>> {
    const res = await api.get<BaseResponse<ITermin>>(`/termin/${id}`);
    return res.data;
  },

  async findByIds(ids: number[]): Promise<BaseResponse<ITermin[]>> {
    const query = ids.join(',')
    const res = await api.get<BaseResponse<ITermin[]>>(`/termin/find-by-ids`, {
      params: { ids: query }
    })
    return res.data;
  },

  async findByTag(tagId: number): Promise<BaseResponse<ITermin[]>> {
    const res = await api.get<BaseResponse<ITermin[]>>(`/termin/find-by-tag/${tagId}`);
    return res.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/termin/${id}`);
  },

  async create(dto: ICreateTerminDto): Promise<BaseResponse<ITermin>> {
    const res = await api.post<BaseResponse<ITermin>>(`/termin`, dto);
    return res.data;
  },

  async update(id: number, dto: IUpdateTerminDto): Promise<void> {
    await api.put(`/termin/${id}`, dto);
  },
};

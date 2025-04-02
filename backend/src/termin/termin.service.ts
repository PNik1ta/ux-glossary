import { Injectable } from "@nestjs/common";
import { TerminRepository } from "./repositories/termin.repository";
import { CreateTerminDto } from "./dto/create-termin.dto";
import { TerminEntity } from "./entities/termin.entity";
import { BaseResponse } from "../shared/classes/base-response";
import { Termin } from "./models/termin.model";
import { UpdateTerminDto } from "./dto/update-termin.dto";
import { UserRepository } from "../user/repositories/user.repository";
import { ERoles } from "../shared/enums/roles.enum";

@Injectable()
export class TerminService {
	constructor(
		private readonly terminRepository: TerminRepository,
		private readonly userRepository: UserRepository
	) {}

	async create(dto: CreateTerminDto, userId: number): Promise<BaseResponse<Termin>> {
		const termin = new TerminEntity({
			title: dto.title,
			description: dto.description,
			example: dto.example,
			tag_id: dto.tag_id,
			user_id: userId ?? null,
		})

		const createdTermin = await this.terminRepository.create(termin)

		if (!createdTermin) {
			throw new Error('Could not create termin');
		}

		return new BaseResponse<Termin>('Termin created', createdTermin)
	}

	async findBySearch(search: string): Promise<BaseResponse<Termin[]>> {
		const termins = await this.terminRepository.findBySearch(search);

		if (!termins) {
			throw new Error('Could not find any termin');
		}

		return new BaseResponse<Termin[]>('Termins found successfully', termins);
	}

	async findById(id: number): Promise<BaseResponse<Termin>> {
		const termin = await this.terminRepository.findById(id);

		if (!termin) {
			throw new Error('Could not find any termin');
		}

		return new BaseResponse<Termin>('Termin found successfully', termin);
	}

	async findByIds(ids: number[]): Promise<BaseResponse<Termin[]>> {
		const termins = await this.terminRepository.findByIds(ids);

		if (!termins) {
			throw new Error('Could not find any termin');
		}

		return new BaseResponse<Termin[]>('Termins found successfully', termins);
	}

	async findByTagId(tagId: number): Promise<BaseResponse<Termin[]>> {
		const termins = await this.terminRepository.findByTagId(tagId);

		if (!termins) {
			throw new Error('Could not find any termin');
		}

		return new BaseResponse<Termin[]>('Termins found successfully', termins);
	}

	async findByUserId(userId: number): Promise<BaseResponse<Termin[]>> {
		const termins = await this.terminRepository.findByUserId(userId);

		if (!termins) {
			throw new Error('Could not find any termin');
		}

		return new BaseResponse<Termin[]>('Termins found successfully', termins);
	}

	async delete(id: number, userId: number): Promise<BaseResponse<void>> {
		const termin = await this.terminRepository.findById(id);

		if (!termin) {
			throw new Error('Could not find any termin');
		}
		
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new Error('Could not find any user');
		}

		if (termin.user_id !== user.id && user.role === ERoles.USER) {
			throw new Error("You don't have permissions to delete this termin")
		}
		await this.terminRepository.delete(id);

		return new BaseResponse<void>('Termin deleted successfully');
	}

	async update(id: number, userId: number, dto: UpdateTerminDto): Promise<BaseResponse<void>> {
		const termin = await this.terminRepository.findById(id);

		if (!termin) {
			throw new Error('Could not find any termin');
		}
		
		const user = await this.userRepository.findById(id);

		if (!user) {
			throw new Error('Could not find any user');
		}

		if (termin.user_id !== user.id && user.role === ERoles.USER) {
			throw new Error("You don't have permissions to update this termin")
		}

		const terminEntity = new TerminEntity({
			title: dto.title ?? termin.title,
			description: dto.description ?? termin.description,
			example: dto.example ?? termin.example,
			tag_id: dto.tag_id ?? termin.tag_id,
			user_id: termin.user_id
		});

		const updatedTermin = await this.terminRepository.update(id, terminEntity);

		if (!updatedTermin) {
			throw new Error('Could not update termin');
		}

		return new BaseResponse<void>('Termin updated successfully');
	}
}
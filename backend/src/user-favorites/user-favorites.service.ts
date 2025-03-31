import { Injectable } from "@nestjs/common";
import { UserFavoriteRepository } from "./repositories/user-favorite.repository";
import { CreateUserFavoriteDto } from "./dto/create-user-favorite.dto";
import { BaseResponse } from "../shared/classes/base-response";
import { UserFavorite } from "./models/user-favorite.model";
import { UserFavoriteEntity } from "./entities/user-favorite.entity";

@Injectable()
export class UserFavoriteService {
	constructor(private readonly userFavoriteRepository: UserFavoriteRepository) {}

	async createUserFavorite(dto: CreateUserFavoriteDto, userId: number): Promise<BaseResponse<UserFavorite>> {
		const userFavorite = new UserFavoriteEntity({
			user_id: userId,
			termin_id: dto.termin_id
		})

		const createdUserFavorite = await this.userFavoriteRepository.create(userFavorite)

		if (!createdUserFavorite) {
			throw new Error('Could not add to favorite');
		}

		return new BaseResponse<UserFavorite>('Termin added to favorites', createdUserFavorite)
	}

	async findAll(): Promise<BaseResponse<UserFavorite[]>> {
		const userFavorites = await this.userFavoriteRepository.findAll()

		if (!userFavorites) {
			throw new Error('Could not find any favorite termin')
		}

		return new BaseResponse<UserFavorite[]>('Favorites termins found successfully', userFavorites)
	}

	async findByUserId(userId: number): Promise<BaseResponse<UserFavorite[]>> {
		const userFavorites = await this.userFavoriteRepository.findByUserId(userId);

		if (!userFavorites) {
			throw new Error('Could not find any favorite termin')
		}

		return new BaseResponse<UserFavorite[]>('Favorites termins found successfully', userFavorites)
	}

	async delete(id: number): Promise<BaseResponse<void>> {
		await this.userFavoriteRepository.delete(id);

		return new BaseResponse<void>('Termin deleted from favorites');
	}
}
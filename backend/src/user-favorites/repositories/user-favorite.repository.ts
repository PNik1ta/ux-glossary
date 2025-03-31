import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserFavorite } from "../models/user-favorite.model";
import { Repository } from "typeorm";
import { UserFavoriteEntity } from "../entities/user-favorite.entity";

@Injectable()
export class UserFavoriteRepository {
	constructor(
		@InjectRepository(UserFavorite)
		private userFavoriteRepository: Repository<UserFavorite>
	) {}

	async create(userFavorite: UserFavoriteEntity): Promise<UserFavorite> {
		return this.userFavoriteRepository.save(userFavorite)
	}

	async findAll(): Promise<UserFavorite[]> {
		return this.userFavoriteRepository.find();
	}

	async findByUserId(userId: number): Promise<UserFavorite[]> {
		return this.userFavoriteRepository.findBy({ user_id: userId })
	}

	async delete(id: number): Promise<void> {
		await this.userFavoriteRepository.delete(id);
	}
}
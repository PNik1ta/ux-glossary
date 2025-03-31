import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IUserFavorites } from "../../shared/interfaces/user-favorites.interface";

@Entity()
export class UserFavorite implements IUserFavorites {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	user_id: number;

	@Column()
	termin_id: number;
}
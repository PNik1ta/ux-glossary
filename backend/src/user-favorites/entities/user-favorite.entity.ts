import { IUserFavorites } from "../../shared/interfaces/user-favorites.interface";
import { UserFavorite } from "../models/user-favorite.model";

export class UserFavoriteEntity implements IUserFavorites {
	id?: number;
	user_id: number;
	termin_id: number;
	
	constructor(userFavorite: IUserFavorites) {
		this.id = userFavorite.id;
		this.user_id = userFavorite.user_id;
		this.termin_id = userFavorite.termin_id;
	}
}
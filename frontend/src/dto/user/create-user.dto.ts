import { ERoles } from "../../core/enums/roles.enum";

export interface ICreateUserDto {
	email: string;
	username: string;
	password: string;
	role?: ERoles;
}
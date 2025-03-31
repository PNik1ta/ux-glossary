import { Injectable } from "@nestjs/common";
import { UserRepository } from "./repositories/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { BaseResponse } from "../shared/classes/base-response";
import { User } from "./models/user.model";
import { UserEntity } from "./entities/user.entity";
import { ERoles } from "../shared/enums/roles.enum";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) { }

	async createUser(dto: CreateUserDto): Promise<BaseResponse<User>> {
		const user = await new UserEntity({
			email: dto.email,
			username: dto.username,
			role: dto.role ?? ERoles.USER,
			password_hash: '',
		}).setPassword(dto.password)

		const createdUser = await this.userRepository.create(user)

		if (!createdUser) {
			throw new Error('Could not create user')
		}

		return new BaseResponse<User>('User created', createdUser)
	}

	async findAll(): Promise<BaseResponse<User[]>> {
		const users = await this.userRepository.findAll()

		if (!users) {
			throw new Error('Could not find any user')
		}

		return new BaseResponse<User[]>('Users find successfully', users)
	}

	async findUserByEmail(email: string): Promise<BaseResponse<User>> {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			throw new Error('Could not find any user');
		}

		return new BaseResponse<User>('User found successfully', user);
	}

	async findUserById(id: number): Promise<BaseResponse<User>> {
		const user = await this.userRepository.findById(id);

		if (!user) {
			throw new Error('Could not find any user');
		}

		return new BaseResponse<User>('User found successfully', user);
	}

	async deleteUser(id: number): Promise<BaseResponse<void>> {
		const user = await this.userRepository.findById(id)

		if (!user) {
			throw new Error('Could not find any user')
		}

		await this.userRepository.delete(id);

		return new BaseResponse<void>('User deleted successfully')
	}

	async update(
		user_id: number,
		dto: UpdateUserDto,
	 ): Promise<BaseResponse<void>> {
		const updatedUser = await this.userRepository.findById(user_id);
  
		if (!updatedUser) {
		  throw new Error('Could not find any user');
		}
  
		const entity = await new UserEntity({
		  email: updatedUser.email,
		  username: dto.username ?? updatedUser.username,
		  role: updatedUser.role,
		  password_hash: updatedUser.password_hash,
		});
  
		const res = await this.userRepository.update(user_id, entity);
		if (!res) {
		  throw new Error('Could not update any user');
		}
		return new BaseResponse<void>('User updated successfully');
	 }

}
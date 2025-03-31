import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from '../shared/classes/base-response';
import { ERoles } from '../shared/enums/roles.enum';
import { Roles } from '../shared/decorators/roles.decorator';
import { RolesGuard } from '../shared/guards/roles.guard';
import { UserFavoriteService } from './user-favorites.service';
import { UserFavorite } from './models/user-favorite.model';
import { CreateUserFavoriteDto } from './dto/create-user-favorite.dto';
import { GetCurrentUserId } from '../shared/decorators/get-current-user-id.decorator';

@Controller('user-favorite')
@ApiBearerAuth('JWT-auth')
@ApiTags('user-favorite')
@UseGuards(RolesGuard)
export class UserFavoriteController {
	constructor(private readonly userFavoriteService: UserFavoriteService) { }

	@ApiOkResponse({
		description: 'Created user favorite',
		type: BaseResponse<UserFavorite>,
	})
	@Post()
	@ApiBearerAuth('JWT-auth')
	@HttpCode(201)
	@Roles(ERoles.ADMIN, ERoles.USER)
	async create(@Body() dto: CreateUserFavoriteDto, @GetCurrentUserId() userId: number): Promise<BaseResponse<UserFavorite>> {
		try {
			return await this.userFavoriteService.createUserFavorite(dto, userId);
		} catch (err) {
			if (err instanceof HttpException) {
				throw err;
			}
			throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOkResponse({
		description: 'All user favorites',
		type: BaseResponse<UserFavorite[]>,
	})
	@Get()
	@ApiBearerAuth('JWT-auth')
	@HttpCode(200)
	@Roles(ERoles.ADMIN)
	async findAll(): Promise<BaseResponse<UserFavorite[]>> {
		try {
			return await this.userFavoriteService.findAll();
		} catch (err) {
			if (err instanceof HttpException) {
				throw err;
			}
			throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Get('get-favorites')
	@ApiOkResponse({
		description: 'User favorites by user id',
		type: BaseResponse<UserFavorite[]>,
	})
	@ApiBearerAuth('JWT-auth')
	@HttpCode(200)
	@Roles(ERoles.ADMIN, ERoles.USER)
	async findByUserId(@GetCurrentUserId() userId: number): Promise<BaseResponse<UserFavorite[]>> {
		try {
			return await this.userFavoriteService.findByUserId(userId);
		} catch (err) {
			if (err instanceof HttpException) {
				throw err;
			}
			throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Delete(':id')
	@ApiOkResponse({
		description: 'Deleted message',
		type: BaseResponse<void>,
	})
	@ApiBearerAuth('JWT-auth')
	@HttpCode(200)
	@Roles(ERoles.ADMIN, ERoles.USER)
	async delete(@Param('id') id: number): Promise<BaseResponse<void>> {
		try {
			return await this.userFavoriteService.delete(id);
		} catch (err) {
			if (err instanceof HttpException) {
				throw err;
			}
			throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
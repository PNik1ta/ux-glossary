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
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from '../shared/classes/base-response';
import { ERoles } from '../shared/enums/roles.enum';
import { GetCurrentUserId } from '../shared/decorators/get-current-user-id.decorator';
import { Public } from '../shared/decorators/public.decorator';
import { Roles } from '../shared/decorators/roles.decorator';
import { RolesGuard } from '../shared/guards/roles.guard';
import { TerminService } from './termin.service';
import { Termin } from './models/termin.model';
import { CreateTerminDto } from './dto/create-termin.dto';
import { UpdateTerminDto } from './dto/update-termin.dto';

@Controller('termin')
@ApiBearerAuth('JWT-auth')
@ApiTags('termin')
@UseGuards(RolesGuard)
export class TerminController {
	constructor(private readonly terminService: TerminService) { }

	@ApiOkResponse({
		description: 'Created termin',
		type: BaseResponse<Termin>,
	})
	@Post()
	@ApiBearerAuth('JWT-auth')
	@HttpCode(201)
	@Roles(ERoles.ADMIN, ERoles.USER)
	async create(@Body() dto: CreateTerminDto, @GetCurrentUserId() userId: number): Promise<BaseResponse<Termin>> {
		try {
			return await this.terminService.create(dto, userId);
		} catch (err) {
			if (err instanceof HttpException) {
				throw err;
			}
			throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Get('get-termins')
	@ApiOkResponse({
		description: 'Termins by user id',
		type: BaseResponse<Termin[]>,
	})
	@ApiBearerAuth('JWT-auth')
	@HttpCode(200)
	@Roles(ERoles.ADMIN, ERoles.USER)
	async findByUserId(@GetCurrentUserId() userId: number): Promise<BaseResponse<Termin[]>> {
		try {
			return await this.terminService.findByUserId(userId);
		} catch (err) {
			if (err instanceof HttpException) {
				throw err;
			}
			throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOkResponse({
		description: 'Termins by array of IDs',
		type: BaseResponse<Termin[]>,
	})
	@Get('find-by-ids')
	@ApiBearerAuth('JWT-auth')
	@HttpCode(200)
	@Public()
	async findByIds(@Query('ids') ids: string): Promise<BaseResponse<Termin[]>> {
		try {
			// Преобразуем строку типа "1,2,3" в [1, 2, 3]
			const parsedIds = ids.split(',').map(id => Number(id.trim())).filter(Boolean);
	
			if (!parsedIds.length) {
				throw new HttpException('IDs are required', HttpStatus.BAD_REQUEST);
			}
	
			return await this.terminService.findByIds(parsedIds);
		} catch (err) {
			if (err instanceof HttpException) {
				throw err;
			}
			throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOkResponse({
		description: 'All termins by search',
		type: BaseResponse<Termin[]>,
	})
	@Get('find-by-search')
	@ApiBearerAuth('JWT-auth')
	@HttpCode(200)
	@Public()
	async findAll(@Query('search') search: string): Promise<BaseResponse<Termin[]>> {
		try {
			return await this.terminService.findBySearch(search);
		} catch (err) {
			if (err instanceof HttpException) {
				throw err;
			}
			throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Get(':id')
	@ApiOkResponse({
		description: 'Termin by id',
		type: BaseResponse<Termin>,
	})
	@ApiBearerAuth('JWT-auth')
	@HttpCode(200)
	@Public()
	async findById(@Param('id') id: number): Promise<BaseResponse<Termin>> {
		try {
			return await this.terminService.findById(id);
		} catch (err) {
			if (err instanceof HttpException) {
				throw err;
			}
			throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Get('find-by-tag/:tag_id')
	@ApiOkResponse({
		description: 'Termins by tag id',
		type: BaseResponse<Termin[]>,
	})
	@ApiBearerAuth('JWT-auth')
	@HttpCode(200)
	@Public()
	async findByTagId(@Param('tag_id') tagId: number): Promise<BaseResponse<Termin[]>> {
		try {
			return await this.terminService.findByTagId(tagId);
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
			return await this.terminService.delete(id);
		} catch (err) {
			if (err instanceof HttpException) {
				throw err;
			}
			throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOkResponse({
		description: 'Updated message',
		type: BaseResponse<void>,
	})
	@Put(':id')
	@HttpCode(201)
	@ApiBearerAuth('JWT-auth')
	@Roles(ERoles.ADMIN, ERoles.USER)
	async update(
		@Param('id') id: number,
		@GetCurrentUserId() userId: number,
		@Body() dto: UpdateTerminDto,
	): Promise<BaseResponse<void>> {
		try {
			return await this.terminService.update(id, userId, dto);
		} catch (err) {
			throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
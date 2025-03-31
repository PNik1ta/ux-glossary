import { Injectable } from "@nestjs/common";
import { BaseResponse } from "../shared/classes/base-response";
import { TagRepository } from "./repositories/tag.repository";
import { CreateTagDto } from "./dto/create-tag.dto";
import { Tag } from "./models/tag,model";
import { TagEntity } from "./entities/tag.entity";
import { UpdateTagDto } from "./dto/update-tag.dto";

@Injectable()
export class TagService {
	constructor(private readonly tagRepository: TagRepository) { }

	async createTag(dto: CreateTagDto): Promise<BaseResponse<Tag>> {
		const tag = await new TagEntity({
			name: dto.name,
		})

		const createdTag = await this.tagRepository.create(tag)

		if (!createdTag) {
			throw new Error('Could not create tag')
		}

		return new BaseResponse<Tag>('Tag created', createdTag)
	}

	async findAll(): Promise<BaseResponse<Tag[]>> {
		const tags = await this.tagRepository.findAll()

		if (!tags) {
			throw new Error('Could not find any tag')
		}

		return new BaseResponse<Tag[]>('Tags find successfully', tags)
	}

	async findTagById(id: number): Promise<BaseResponse<Tag>> {
		const tag = await this.tagRepository.findById(id);

		if (!tag) {
			throw new Error('Could not find any tag');
		}

		return new BaseResponse<Tag>('Tag found successfully', tag);
	}

	async deleteTag(id: number): Promise<BaseResponse<void>> {
		const tag = await this.tagRepository.findById(id)

		if (!tag) {
			throw new Error('Could not find any tag')
		}

		await this.tagRepository.delete(id);

		return new BaseResponse<void>('Tag deleted successfully')
	}

	async update(
		tag_id: number,
		dto: UpdateTagDto,
	): Promise<BaseResponse<void>> {
		const updatedTag = await this.tagRepository.findById(tag_id);

		if (!updatedTag) {
			throw new Error('Could not find any tag');
		}

		const entity = await new TagEntity({
			name: dto.name ?? updatedTag.name,
		});

		const res = await this.tagRepository.update(tag_id, entity);
		if (!res) {
			throw new Error('Could not update any tag');
		}
		return new BaseResponse<void>('Tag updated successfully');
	}

}
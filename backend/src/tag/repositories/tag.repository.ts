import { Injectable } from "@nestjs/common";
import { Repository, UpdateResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Tag } from "../models/tag,model";
import { TagEntity } from "../entities/tag.entity";

@Injectable()
export class TagRepository {
	constructor(
		@InjectRepository(Tag)
		private tagRepository: Repository<Tag>
	) { }

	async create(user: TagEntity): Promise<Tag> {
		return this.tagRepository.save(user)
	}

	async findAll(): Promise<Tag[]> {
		return this.tagRepository.find();
	}

	async findById(id: number): Promise<Tag> {
		return this.tagRepository.findOneBy({ id });
	}

	async delete(id: number): Promise<void> {
		await this.tagRepository.delete(id);
	}

	async update(id: number, user: TagEntity): Promise<UpdateResult> {
		return this.tagRepository.update({ id }, user);
	}
}
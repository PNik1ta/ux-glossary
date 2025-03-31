import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Termin } from "../models/termin.model";
import { ILike, In, Repository, UpdateResult } from "typeorm";
import { TerminEntity } from "../entities/termin.entity";

@Injectable()
export class TerminRepository {
	constructor(
		@InjectRepository(Termin)
		private terminRepository: Repository<Termin>
	) { }

	async create(termin: TerminEntity): Promise<Termin> {
		return this.terminRepository.save(termin)
	}

	async findBySearch(search: string): Promise<Termin[]> {
		if (!search?.trim()) {
			return this.terminRepository.find()
		}

		return this.terminRepository.findBy({
			title: ILike(`%${search}%`)
		 })}

	async findById(id: number): Promise<Termin> {
		return this.terminRepository.findOneBy({ id });
	}

	async findByTagId(tagId: number): Promise<Termin[]> {
		return this.terminRepository.findBy({ tag_id: tagId })
	}

	async findByUserId(userId: number): Promise<Termin[]> {
		return this.terminRepository.findBy({ user_id: userId })
	}

	async findByIds(ids: number[]): Promise<Termin[]> {
		if (!ids || ids.length === 0) {
		  return []
		}
	
		return this.terminRepository.findBy({ id: In(ids) });
	 }
	 

	async delete(id: number): Promise<void> {
		await this.terminRepository.delete(id);
	}

	async update(id: number, termin: TerminEntity): Promise<UpdateResult> {
		return this.terminRepository.update({ id }, termin);
	}
}
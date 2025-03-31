import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ITermin } from "../../shared/interfaces/termin.interface";

@Entity()
export class Termin implements ITermin {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	example: string;

	@Column()
	tag_id: number;

	@Column({ nullable: true })
	user_id: number;
}
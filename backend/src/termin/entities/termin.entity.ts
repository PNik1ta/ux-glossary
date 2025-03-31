import { ITermin } from "../../shared/interfaces/termin.interface";

export class TerminEntity implements ITermin {
	id?: number;
	title: string;
	description: string;
	example: string;
	tag_id: number;
	user_id?: number;

	constructor(termin: ITermin) {
		this.id = termin.id;
		this.title = termin.title;
		this.description = termin.description;
		this.example = termin.example;
		this.tag_id = termin.tag_id;
		this.user_id = termin.user_id;
	}
}
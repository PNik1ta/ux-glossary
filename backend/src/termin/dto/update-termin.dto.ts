import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateTerminDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		title: 'Termin title',
		example: 'test'
	})
	title: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		title: 'Termin description',
		example: 'test'
	})
	description: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		title: 'Termin example',
		example: 'test'
	})
	example: string;

	@IsNotEmpty()
	@IsNumber()
	@ApiProperty({
		title: 'Termin tag id',
		example: 1
	})
	tag_id: number;
}
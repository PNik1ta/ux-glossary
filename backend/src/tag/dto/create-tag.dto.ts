import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTagDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'Tag name',
		example: 'test'
	})
	name: string;
}
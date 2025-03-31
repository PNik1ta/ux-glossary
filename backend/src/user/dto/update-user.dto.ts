import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'User username',
		example: 'test',
		type: String,
	})
	username?: string;
}
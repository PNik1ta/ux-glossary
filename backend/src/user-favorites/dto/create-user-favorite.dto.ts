import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateUserFavoriteDto {
	@IsNotEmpty()
	@IsNumber()
	@ApiProperty({
		description: 'Termin id',
		example: 1
	})
	termin_id: number;
}
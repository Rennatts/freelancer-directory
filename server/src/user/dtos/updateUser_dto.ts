import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDTO {
    @ApiProperty()
    name: string;

    @ApiProperty()

    @ApiProperty()
    surname: string;

    @ApiProperty()
    username?: string;

    @ApiProperty()
    password?: string;

    @ApiProperty()
    profile_photo?: string;
}
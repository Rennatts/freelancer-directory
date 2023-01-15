import { ApiProperty } from "@nestjs/swagger";

export class NewUserDTO {
    @ApiProperty()
    name: string;

    @ApiProperty()
    surname: string;

    @ApiProperty()
    username?: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    profile_photo?: string;
}
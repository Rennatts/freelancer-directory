import { ApiProperty } from "@nestjs/swagger";

//testando github, apague isso aqui depois
export class ExistingUserDTO {
    @ApiProperty()
    email: string;
    
    @ApiProperty()
    password: string;
}
import { ApiProperty } from "@nestjs/swagger";

export class LoginFreelancerDTO {
    @ApiProperty()
    email: string;
    
    @ApiProperty()
    password: string;
}
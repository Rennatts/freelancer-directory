import { FreelancerCategory } from "../interfaces/freelancerCategory_enum";
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { FreelancerMember } from "./../interfaces/freelancerMember_enum";

export class NewFreelancersDTO {
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    surname: string;

    @ApiProperty()
    username?: string;

    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    profile_photo?: String;

    @ApiProperty()
    zip_code: String;

    @ApiProperty()
    address: String;

    @ApiProperty()
    number: String;

    @ApiProperty()
    city: String;

    @ApiProperty()
    country: String;

    @ApiProperty()
    phone_number: String;

    @ApiProperty()
    service_type: String;

    @ApiProperty()
    instagram?: String;

    @ApiProperty()
    website?: String;

    @ApiProperty()
    professional_period: String;

    @ApiProperty()
    description?: String;

    @ApiProperty()
    job_title?: String;

    @ApiProperty()
    category: FreelancerCategory;

    @ApiProperty()
    member_role: FreelancerMember;

    createdAt: Date;
    updatedAt: Date;
}

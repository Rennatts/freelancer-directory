import { ApiProperty } from "@nestjs/swagger";
import { FreelancerCategory } from "../interfaces/freelancerCategory_enum";
import { FreelancerMember } from "../interfaces/FreelancerMember_enum";
import { createReviewDTO } from "./createReview_dto";

export class UpdateFrelancersDTO {
    @ApiProperty()
    name: string;

    @ApiProperty()
    surname: string;

    @ApiProperty()
    username?: string;

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
    service_type?: String[];

    @ApiProperty()
    instagram?: String;

    @ApiProperty()
    website?: String[];

    @ApiProperty()
    professional_period: String;

    @ApiProperty()
    description?: String;

    reviews: createReviewDTO[];

    @ApiProperty()
    category: FreelancerCategory[] = [];

    @ApiProperty()
    job_title?: String;

    @ApiProperty()
    member_role: FreelancerMember;
    createdAt: Date;
    updatedAt: Date;
}
import { FreelancerCategory } from "../interfaces/freelancerCategory_enum";
import { FreelancerMember } from "../interfaces/FreelancerMember_enum";
import { IsNotEmpty } from 'class-validator';

export class NewFreelancersDTO {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    surname: string;
    username?: string;
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
    profile_photo?: String;
    zip_code: String;
    address: String;
    number: String;
    city: String;
    country: String;
    phone_number: String;
    instagram?: String;
    website?: String;
    professional_period: String;
    description?: String;
    jobTitle?: string;
    category: FreelancerCategory;
    member_role: FreelancerMember;
    createdAt: Date;
    updatedAt: Date;
}

import { FreelancerCategory } from "../interfaces/freelancerCategory_enum";
import { FreelancerMember } from "../interfaces/FreelancerMember_enum";
import { createReviewDTO } from "./createReview_dto";

export class UpdateFrelancersDTO {
    name: string;

    surname: string;

    username?: string;

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

    reviews: createReviewDTO[];

    category: FreelancerCategory[] = [];

    job_title?: String;

    member_role: FreelancerMember;
    createdAt: Date;
    updatedAt: Date;
}
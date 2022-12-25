import { Rating } from "./rating.interface";
import { CreateReview } from './createReview.interface';


export class FreelancerDetails {
    _id: string;
    name: string;
    surname: string;
    username?: string;
    email: string;
    profile_photo?: String;
    rating?: Rating[];
    reviews?: CreateReview[];
    city: String;
    zip_code: String;
    number: String;
    member_role: String;
    description?: String;
    service_type?: String[];
    instagram?: String;
    website?: String;
    job_title?: String;
    createdAt: Date;
    updatedAt: Date;
}
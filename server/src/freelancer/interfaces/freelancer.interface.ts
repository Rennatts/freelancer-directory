import { Rating } from "./rating.interface";
import { Review } from "./review.interface";


export class FreelancerDetails {
    id: string;
    name: string;
    surname: string;
    username?: string;
    email: string;
    profile_photo?: String;
    reviews?: Review[];
    rating?: Rating[];
    city: String;
    zip_code: String;
    number: String;
    member_role: String;
    createdAt: Date;
    updatedAt: Date;
}
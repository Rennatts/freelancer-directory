import { Reviews } from "./Review";

export interface Freelancer { 
    _id: string;
    name: string;
    surname: string;
    username?: string;
    email: string;
    profile_photo?: string;
    reviews?: Reviews[];
    city: String;
    country: String;
    zip_code: String;
    member_role: String;
    description?: String;
    instagram?: String;
    website?: String;
    service_type: Array<String>;
    job_title?: String;
    createdAt: Date;
    updatedAt: Date;
}
import { SchemaDescription } from "yup/lib/schema";
import { Reviews } from "./Review";

export interface Freelancer { 
    id: string;
    name: string;
    surname: string;
    username?: string;
    email: string;
    profile_photo?: string;
    reviews?: Reviews[];
    city: String;
    zip_code: String;
    member_role: String;
    description?: String;
    jobTitle?: SchemaDescription;
    createdAt: Date;
    updatedAt: Date;
}
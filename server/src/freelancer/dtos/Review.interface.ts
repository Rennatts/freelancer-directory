import { UserDetails } from "src/user/interface/user.interface";

export class Review {
    reviewText: string;
    postedBy: UserDetails;
    _id: string;
    createdAt: Date;
}
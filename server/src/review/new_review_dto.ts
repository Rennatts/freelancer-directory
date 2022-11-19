import { IsNotEmpty } from 'class-validator';

export class createReviewDTO {
    userId: string;
    reviewText: string;
    score: number;
}

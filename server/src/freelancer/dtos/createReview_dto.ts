import { IsNotEmpty } from 'class-validator';

export class createReviewDTO {
    @IsNotEmpty()
    reviewText: string;
    userId: string;
}


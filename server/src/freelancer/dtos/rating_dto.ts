import { IsNotEmpty } from 'class-validator';

export class ratingDTO {
    @IsNotEmpty()
    userId: string;
    score: number;
}
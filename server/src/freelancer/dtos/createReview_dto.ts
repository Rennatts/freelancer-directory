import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class createReviewDTO {
    @IsNotEmpty()
    @ApiProperty()
    reviewText: string;

    @ApiProperty()
    userId: string;
}


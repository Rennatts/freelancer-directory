import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ratingDTO {
    @IsNotEmpty()
    @ApiProperty()
    userId: string;

    @ApiProperty()
    score: number;
}
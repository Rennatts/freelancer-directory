import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FreelancerService } from 'src/freelancer/freelancer.service';
import { createReviewDTO } from './new_review_dto';
import { ReviewDocument } from './review.schema';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
    constructor(
        private reviewService: ReviewService,
        private freelancerService: FreelancerService,
    ) {}

    @Post(':freelancerId')
    async createReview(
        @Body() review: createReviewDTO,
        @Param('freelancerId') freelancerId: string,
        ): Promise<any | null> {
        const freelancer = await this.freelancerService.findById(freelancerId);
        return this.reviewService.createReview(review, freelancer);
    }

    @Get()
    allReviews(): Promise<createReviewDTO[] | null> {
        return this.reviewService.allReviews();
    }
}

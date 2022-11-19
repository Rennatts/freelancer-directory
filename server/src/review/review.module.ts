import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FreelancerModule } from 'src/freelancer/freelancer.module';
import { FreelancerSchema } from 'src/freelancer/freelancer.schema';
import { ReviewController } from './review.controller';
import { ReviewSchema } from './review.schema';
import { ReviewService } from './review.service';

@Module({
    imports:[MongooseModule.forFeature([
        {name: 'Review', schema: ReviewSchema},
        {name: 'Freelancer', schema: FreelancerSchema},
    ]), 
    FreelancerModule],
    controllers: [ReviewController],
    providers: [ReviewService],
    exports: [ReviewService],
})
export class ReviewModule {

}

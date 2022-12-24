import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createReviewDTO } from './new_review_dto';
import { Review, ReviewDocument } from './review.schema';
const _ = require("lodash"); 

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel('Review') private readonly reviewModel: Model<Review>
    ){} 


    async createReview(review: createReviewDTO, freelancer: any): Promise<any | null> {
        if(this.reviewAlreadyExists(review.userId, freelancer.id)){
   
        }
        const newReview = new this.reviewModel({
            freelancer: freelancer, 
            userId: review.userId,
            reviewText: review.reviewText, 
            score: review.score,
        })

        //return newReview.save(); 
    }


    async allReviews(): Promise<any[] | null> {
        const allReviews = this.reviewModel.find();

        return allReviews;
    }


    async reviewAlreadyExists(userId: string, freelancerId: string): Promise<any> {
        console.log("freelancerId", freelancerId)
        const userReviews = await this.reviewModel.find({userId: userId});
        userReviews.forEach(review => {
            console.log("review", review)
        })
    }
}

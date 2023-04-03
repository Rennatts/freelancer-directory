import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { createReviewDTO } from './dtos/createReview_dto';
import { NewFreelancersDTO } from './dtos/newFreelancer_dto';
import { FreelancerDetails } from './interfaces/freelancer.interface';
import { Freelancer} from './freelancer.schema';
import { UpdateFrelancersDTO } from './dtos/updateFreelancer_dto';
import { Review } from './dtos/Review.interface';
import { UserDocument } from 'src/user/user.schema';


@Injectable()
export class FreelancerService {
    constructor(
        @InjectModel('Freelancer') private readonly freelancerModel: Model<Freelancer>,
        @InjectModel('User') private readonly userModel: Model<UserDocument>
    ){}


    async create(freelancer: NewFreelancersDTO): Promise<Freelancer>  {
        const newFreelancer = new this.freelancerModel({
            name: freelancer.name.toLowerCase(),
            surname: freelancer.surname.toLowerCase(),
            username: freelancer.username.toLowerCase(),
            email: freelancer.email,
            password: freelancer.password,
            profile_photo: freelancer.profile_photo,
            zip_code: freelancer.zip_code,
            address: freelancer.address,
            number: freelancer.number,
            city: freelancer.city.toLowerCase(),
            country: freelancer.country.toLowerCase(),
            phone_number: freelancer.phone_number, 
            instagram: freelancer.instagram,
            website: freelancer.website,
            professional_period: freelancer.professional_period,
            service_type: freelancer.service_type,
            description: freelancer.description,
            job_title: freelancer.job_title,
            category: freelancer.category,
            member_role: freelancer.member_role,
            created: Date.now(),
        })

        return newFreelancer.save(); 
    }

    async findByEmail(email: string): Promise<Freelancer | null> {
        return this.freelancerModel.findOne({email}).exec();
    }

    async findById(id: string): Promise<any | null> {
        const freelancer = await this.freelancerModel.findById(id);

        if(!freelancer) return null;

        return this._getFreelancerDetails(freelancer);
    }

    async findAllFreelancers(): Promise<FreelancerDetails[] | string> {

        const allFreelancers = await this.freelancerModel.find();

        if(!allFreelancers) throw HttpException;

        const FreelancersSelectedDetails = []
        if(allFreelancers) allFreelancers.forEach(
            (item) => FreelancersSelectedDetails.push(
                this._getFreelancerDetails(item)
        ));

        return FreelancersSelectedDetails;
    }



    async getAllTheReviews(id: string, res: any) {
        const allReviews = [];
    
        this.freelancerModel.findById(id)
        .select("_id reviews")
        .populate('reviews.postedBy.userId', "_id name surname")
        .sort({ 'reviews.createdAt': -1 })
        .exec((err, reviews)=> {
            if(err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(reviews);
        });
    }

    
    
    

    async delete(id: string): Promise<boolean | string> {
        const FreelancerFound = await this.freelancerModel.findById(id);
        if(!FreelancerFound) return "Freelancer not found";
        if(FreelancerFound){
            const result = await this.freelancerModel.deleteOne({ _id: id }).exec();
            return result.acknowledged;
        }
    }

    async updateFreelancer(id: string, freelancer: UpdateFrelancersDTO ): Promise<any | string>  {
        this.freelancerModel.findByIdAndUpdate(id, 
            {$set: 
                {
                    name: freelancer.name,
                    surname: freelancer.surname,
                    username: freelancer.username,
                    profile_photo: freelancer.profile_photo,
                    zip_code: freelancer.zip_code,
                    address: freelancer.address,
                    number: freelancer.number,
                    city: freelancer.city,
                    country: freelancer.country,
                    phone_number: freelancer.phone_number, 
                    instagram: freelancer.instagram,
                    website: freelancer.website,
                    service_type: freelancer.service_type,
                    professional_period: freelancer.professional_period,
                    description: freelancer.description,
                    job_title: freelancer.job_title,
                    category: freelancer.category,
                    member_role: freelancer.member_role,
                    updated: Date.now(),
                }},
                {new: true},
                function(err, user){
                    if(err) {
                        return ({error: err});
                    }else{
                        return user;
                    }
                }
        );
    }

    async createReview(id: string, review: createReviewDTO): Promise<any> {
        const user = await this.userModel.findById(review.userId).exec();
    
        if (!user) {
            throw new NotFoundException('User not found');
        }

    
        let newReview = {
            reviewText: review.reviewText,
            postedBy: {
                userId: user._id,
                name: user.name,
            },
        };
    
        this.freelancerModel.findByIdAndUpdate(
            id,
            { $push: {reviews: newReview}},
            {new: true}
        )
        .sort({ createdAt: -1 })
        .exec((err, result) => {
            if (err) {
                return err;
            } else {
                return result;
            }
        });
    }
    

    async createRating(id: string, rating: any): Promise<any>  {

        let newRating = {
            score: rating.score, 
            postedBy: rating.userId,
        };
    
        this.freelancerModel.findByIdAndUpdate(
            id,
            { $push: {rating: newRating }},
            {new: true}
        )
        .sort({ createdAt: -1 })
        .exec((err,result) => {
            if(err){
                return err;
            } else {
                return result;
            }
        });
    }

    async getAvgScore(id: string): Promise<any> {
        const tattooArtist = await this.freelancerModel.findById(id);


        if (!tattooArtist || !tattooArtist.rating || tattooArtist.rating.length === 0) {
            return { "averageScore": 0 };
        }

        let arrayOfScores = [];

        tattooArtist.rating.forEach((item) =>  arrayOfScores.push(item.score));

        const averageScore = arrayOfScores.reduce((a, b) => a + b, 0) / arrayOfScores.length;

        return {"averageScore": averageScore};
    }




    async getFreelancerByCity(city: string): Promise<FreelancerDetails[]> {
        const allFreelancers = await this.freelancerModel.find();

        const sameCityDetails = []

        allFreelancers.filter(
            (item) => item.city === city.toLowerCase()
        ).forEach((art) => sameCityDetails.push(this._getFreelancerDetails(art)))

        return sameCityDetails;
    }

    async getFreelancerByServiceType(serviceInput: string): Promise<FreelancerDetails[]>{
        const allFreelancers = await this.freelancerModel.find();

        const splitedServiceInput = serviceInput.split("_").join(" ")

        const filteredResult = allFreelancers.filter((item) => {
            return (item.service_type.indexOf(splitedServiceInput) >= 0);
        });


        return filteredResult;
    }

    

    _getFreelancerDetails(freelancer: Freelancer): FreelancerDetails {
        return {
            _id: freelancer._id,
            name: freelancer.name,
            surname: freelancer.surname,
            username: freelancer.username,
            email: freelancer.email,
            profile_photo: freelancer.profile_photo,
            address: freelancer.address,
            city: freelancer.city,
            country: freelancer.country,
            zip_code: freelancer.zip_code,
            number: freelancer.number,
            member_role: freelancer.member_role,
            rating: freelancer.rating,
            reviews: freelancer.reviews,
            service_type: freelancer.service_type,
            instagram: freelancer.instagram,
            website: freelancer.website,
            job_title: freelancer.job_title, 
            description: freelancer.description,
            createdAt: freelancer.createdAt,
            updatedAt: freelancer.updatedAt
        }
    }
}

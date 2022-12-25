import * as mongoose from "mongoose"
import { createReviewDTO } from "./dtos/createReview_dto";
import { ratingDTO } from "./dtos/rating_dto";
import { FreelancerCategory } from "./interfaces/freelancerCategory_enum";
import { FreelancerMember } from "./interfaces/FreelancerMember_enum";


export const FreelancerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    profile_photo: {
      type: String,
    },
    zip_code: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: false,
    },
    instagram: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    professional_period: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    job_title: {
      type: String,
      required: false,
    },
    rating: [
      {
      score: Number,
      postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    }],
    reviews: [{
      reviewText: String, 
      score: Number,
      createdAt: {type: Date, default: Date.now},
      postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    }],
    member_role: {
      type: String,
      enum: ["MEMBER", "NOT_MEMBER",],
      default: FreelancerMember.not_member,
      required: true,
    },
    category: {
      type: String,
      enum: ["PROFESSIONAL", "APPRENTICE",],
      default: FreelancerCategory.professional,
      required: false,
    },
    service_type: {
      type: Array,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    }
  },
  { timestamps: true }
)

export interface Freelancer extends mongoose.Document {
  _id: string;
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  profile_photo: String;
  zip_code: String;
  address: String;
  number: String;
  city: String;
  rating: ratingDTO[];
  reviews: createReviewDTO[];
  country: String;
  phone_number: String;
  instagram: String;
  website: String;
  professional_period: String;
  description: String;
  job_title: String;
  category: FreelancerCategory;
  service_type: String[];
  member_role: FreelancerMember;
  hashedPassword: string;
  createdAt: Date,
  updatedAt: Date,
}
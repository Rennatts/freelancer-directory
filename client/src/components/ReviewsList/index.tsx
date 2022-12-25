import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { clsx } from 'clsx';
import Moment from 'react-moment';
import ProfilePhoto from './../../../images/profilePhoto.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faUserPen, faSquarePen } from "@fortawesome/free-solid-svg-icons";
import StarRatingComponent from 'react-star-rating-component';
import { Freelancer } from '../../Interfaces/Freelancer';
import { UserContext } from '../../UserContext';
import { Reviews } from '../../Interfaces/Review';

export interface IReviewListProps {
    size?: 'sm' | 'md' | 'lg';
    reviews?: Reviews[];
}


export function ReviewList ({ size= 'lg', reviews}: IReviewListProps) {
    let { freelancerId } = useParams() as any;
    const navigate = useNavigate();
    const context = React.useContext(UserContext);

    console.log("reviews", reviews)
  

    return (
        <div className="border-t mt-10">
            <div className="flex items-start flex-start flex-col">
                {reviews?.map((item) => 
                    <div key={item._id} className='w-full flex align-center justify-center mt-8 mb-8'>
                        <h1>{item?.reviewText}</h1> 
                        <p>{item?.postedBy}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

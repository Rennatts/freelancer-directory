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
import { AllReviewsPerFreelancer } from '../../Interfaces/NewReview';

export interface IReviewListProps {
    size?: 'sm' | 'md' | 'lg';
}


export function ReviewList ({ size= 'lg',}: IReviewListProps) {
    const [reviews, setReviews] = React.useState<AllReviewsPerFreelancer>();
    let { freelancerId } = useParams() as any;
    const [isLoading, setIsLoading] = React.useState(false);
    const [success, setSuccess] = React.useState<boolean>(false);
    const navigate = useNavigate();
    const context = React.useContext(UserContext);


    React.useEffect(() => {
        const fetchPositions = async () => {
          setIsLoading(true);
          await axios(`http://localhost:3000/api/freelancer/reviews/${freelancerId}`)
          .then((response) => setReviews(response.data))
        };

        if(!reviews){
            fetchPositions(); 
            setIsLoading(false)
        }

    }, [reviews]);

    console.log("reviews", reviews)
  

    return (
        <div className="border-t mt-10">
            <div className='flex align-center justify-center'>
               <span className='mt-12 text-md text-teal-500'>Reviews</span>
            </div>
            <div className="flex items-start flex-start flex-col">
                {reviews?.reviews.map((item) => 
                    <div key={item._id} className='w-full flex flex-col justify-items-start mt-8 mb-8'>
                        <p>{item?.reviewText}</p> 
                        <p>{item?.postedBy.name}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

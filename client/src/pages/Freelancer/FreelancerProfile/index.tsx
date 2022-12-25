import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Freelancer } from '../../../Interfaces/Freelancer';
import { clsx } from 'clsx';
import Moment from 'react-moment';
import { UserContext } from '../../../UserContext';
import ProfilePhoto from './../../../images/profilePhoto.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faUserPen, faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { serviceType } from '../../../data';
import StarRatingComponent from 'react-star-rating-component';
import ReviewModal from '../../../components/ReviewModal';
import { ReviewList } from '../../../components/ReviewsList';

export interface ITFreelancerProfileProps {
  size?: 'sm' | 'md' | 'lg';
}



export function FreelancerProfile ({ size= 'lg'}: ITFreelancerProfileProps) {
    const [freelancer, setFreelancer] = React.useState<Freelancer>();
    const [rating, setRating] = React.useState<number>(0);
    const [isLoading, setIsLoading] = React.useState(false);
    const [success, setSuccess] = React.useState<boolean>(false);
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [error, setError] = React.useState<boolean>(false);
    let { freelancerId } = useParams() as any;
    const navigate = useNavigate();
    const context = React.useContext(UserContext);

    console.log("freelancer", freelancer)
  

    React.useEffect(() => {
        const fetchPositions = async () => {
          setIsLoading(true);
          await axios(`http://localhost:3000/api/freelancer/${freelancerId}`)
          .then((response) => setFreelancer(response.data))
        };

        const fetchAvgRating = async () => {
            setIsLoading(true);
            await axios(`http://localhost:3000/api/freelancer/avg_score/${freelancerId}`)
            .then((response) => setRating(response.data.averageScore))
        };


        if(!freelancer){
            fetchPositions(); 
            fetchAvgRating();
            setIsLoading(false)
        }

    }, [freelancer]);

    function onStarClick(e: any) {
        const ratingData = {
            userId: context?.id,
            score: e
        }

        axios.put(`http://localhost:3000/api/review/${freelancerId}`, ratingData)
        .then((res) => {
          if(res.status === 200){
            setSuccess(true)
            setTimeout(() => {
                setOpenModal(false)
            }, 1000)
          }
        })
        .catch((err) => setError(true));
    }


    return (
        <>
            <div className="place-content-around p-20  mt-2 ml-80 mr-80 shadow-2xl">
                <div className="flex items-start flex-start flex-col">
                    <div className='w-full flex flex-row align-center justify-center text-xl'>
                    <h1 className="flex align-center">{freelancer?.job_title}</h1> 
                    </div>
                    <div className='w-full flex flex-col items-center justify-center border-b border-teal-500'>
                        <img className='h-14 w-12' src={ProfilePhoto} alt="profile_photo"></img>
                        <p className='mt-2'>{freelancer?.name}</p>
                        <p className='mt-2'>
                        <FontAwesomeIcon className="text-teal-500 mr-2" icon={faLocationDot} />{freelancer?.city}
                        </p> 
                        <p className='mt-2'>Member since
                            <Moment className="ml-2" format="YYYY/MM/DD">{freelancer?.createdAt}</Moment>
                        </p>
                        <div className='text-xl mt-6'>
                            <StarRatingComponent 
                            name="rate1" 
                            starCount={5}
                            value={rating}
                            onStarClick={(e: any)=> onStarClick(e)}
                            />
                        </div>
                        <span>Average score {rating}</span>
                        <br/>
                    </div>
                    <div className='w-full flex align-center justify-center mt-8 mb-8'>
                        <h1>{freelancer?.description}</h1> 
                    </div>
                    <ul className='grid grid-cols-4 gap-4 mb-8'>
                        {freelancer?.service_type?.map((item: any)=> 
                        <li className="pl-2 pb-1 pt-1 pr-2 rounded bg-teal-500 text-white flex align-center justify-center">
                            <p className=''>{item}</p>
                        </li>)}
                    </ul>
                    <div>
                        <p>Contact Info</p>
                    <p>{freelancer?.email}</p> 
                    <p>{freelancer?.instagram}</p> 
                    <p>{freelancer?.website}</p> 
                    </div>
                </div>

                {context?.id === freelancer?._id ? 
                (
                    <div className='mt-12 w-full flex justify-items-end'>
                        <button onClick={() => navigate(`/freelancer/profile/edit/${freelancer?._id}`)} className="text-teal-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                        <FontAwesomeIcon className="mr-2" icon={faUserPen} />Edit Profile
                        </button>
                    </div>
                ): (
                    <div className='mt-12 w-full flex justify-items-end'>
                        <button onClick={()=> setOpenModal(true)} className="text-teal-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                        <FontAwesomeIcon className="mr-2" icon={faSquarePen} />Create Review
                        </button>
                    </div>
                )}
                <ReviewModal show={openModal} userId={context?.id}></ReviewModal>
                <ReviewList></ReviewList>
            </div>
        </>

    );
}

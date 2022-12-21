import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Freelancer } from '../../../Interfaces/Freelancer';
import { clsx } from 'clsx';
import Moment from 'react-moment';
import { UserContext } from '../../../UserContext';
import ProfilePhoto from './../../../images/profilePhoto.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faUserPen } from "@fortawesome/free-solid-svg-icons";

export interface ITFreelancerProfileProps {
  size?: 'sm' | 'md' | 'lg';
}



export function FreelancerProfile ({ size= 'lg'}: ITFreelancerProfileProps) {
    const [freelancer, setFreelancer] = React.useState<Freelancer>();
    const [isLoading, setIsLoading] = React.useState(false);
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

        if(!freelancer){
            fetchPositions(); 
            setIsLoading(false)
        }
    }, [freelancer]);


    return (
        <div className="place-content-around p-20 ml-80 mr-80">
            <div className="flex items-start flex-start flex-col">
                <div className='w-full flex flex-row align-center justify-center text-xl'>
                  <h1 className="flex align-center">{freelancer?.job_title}</h1> 
                </div>
                <div className='w-full flex flex-col items-center justify-center'>
                    <img className='h-14 w-12' src={ProfilePhoto} alt="profile_photo"></img>
                    <p className=''>{freelancer?.name}</p>
                    <p className=''>
                      <FontAwesomeIcon className="text-teal-500 mr-2" icon={faLocationDot} />{freelancer?.city}
                    </p> 
                    <p>Member since
                        <Moment className="ml-2" format="YYYY/MM/DD">{freelancer?.createdAt}</Moment>
                    </p>
                </div>
                <div>
                <h1>{freelancer?.description}</h1> 
                </div>
                <div>
                    <p>Contact Info</p>
                   <p>{freelancer?.email}</p> 
                </div>
            </div>

            {context?.id === freelancer?.id ? 
            (
                <div>
                    <button onClick={() => navigate(`/freelancer/profile/edit/${freelancer?.id}`)} className="text-teal-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                       <FontAwesomeIcon className="mr-2" icon={faUserPen} />Edit Profile
                    </button>
                </div>
            ): null }
        </div>
    );
}

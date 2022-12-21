import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Freelancer } from '../../../Interfaces/Freelancer';
import { clsx } from 'clsx';
import Moment from 'react-moment';
import { UserContext } from '../../../UserContext';

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
        <div className="bg-teal-300 place-content-around p-20 ml-80 mr-80">
            <div className="flex items-start flex-start flex-col">
                {/* <h1>{freelancer?.job_title}</h1>  */}
                <h1>{freelancer?.description}</h1> 
                <p>{freelancer?.name}</p>
                <p>{freelancer?.email}</p> 
                <p>city {freelancer?.city}</p> 
                <p>Member since
                    <Moment format="YYYY/MM/DD">{freelancer?.createdAt}</Moment>
                </p>
            </div>

            {context?.id === freelancer?.id ? 
            (
                <div>
                    <button onClick={() => navigate(`/freelancer/profile/edit/${freelancer?.id}`)}>Edit Profile</button>
                </div>
            ): null }
        </div>
    );
}

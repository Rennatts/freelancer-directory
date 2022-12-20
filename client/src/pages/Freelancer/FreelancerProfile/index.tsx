import * as React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Freelancer } from '../../../Interfaces/Freelancer';
import { clsx } from 'clsx';

export interface ITFreelancerProfileProps {
  size?: 'sm' | 'md' | 'lg';
}



export function FreelancerProfile ({ size= 'lg'}: ITFreelancerProfileProps) {
    const [freelancer, setFreelancer] = React.useState<Freelancer>();
    const [isLoading, setIsLoading] = React.useState(false);
    let { freelancerId } = useParams();

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
        <div className={clsx(
        'm-10 grid grid-cols-4 gap-4',
        {
            'w-16': size === 'sm',
            'md:w-768': size === 'md',
            'lg:w-1024': size === 'lg',
        }
        )}>
            <p>{freelancer?.name}</p>
            <p>{freelancer?.email}</p> 
        </div>
    );
}

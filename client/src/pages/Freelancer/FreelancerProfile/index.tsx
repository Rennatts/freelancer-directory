import * as React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Freelancer } from '../../../Interfaces/Freelancer';
import { clsx } from 'clsx';

export interface ITFreelancerProfileProps {
  size?: 'sm' | 'md' | 'lg';
}



export function FreelancerProfile ({ size= 'lg'}: ITFreelancerProfileProps) {
    const [Freelancer, setFreelancer] = React.useState<Freelancer>();
    const [isLoading, setIsLoading] = React.useState(false);
    let { FreelancerId } = useParams();
  

    React.useEffect(() => {
        const fetchPositions = async () => {
          setIsLoading(true);
          await axios(`http://localhost:3000/api/freelancer/${FreelancerId}`)
          .then((response) => setFreelancer(response.data))
        };

        if(!Freelancer){
            fetchPositions(); 
            setIsLoading(false)
        }
    }, [Freelancer]);


    return (
        <div className={clsx(
        'm-10 grid grid-cols-4 gap-4',
        {
            'w-16': size === 'sm',
            'md:w-768': size === 'md',
            'lg:w-1024': size === 'lg',
        }
        )}>
            <p>{Freelancer?.name}</p>
            <p>{Freelancer?.email}</p>
            
        </div>
    );
}

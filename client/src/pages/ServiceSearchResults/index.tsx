import * as React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Freelancer } from '../Interfaces/Freelancer';
import { clsx } from 'clsx';
import { InfoCard } from '../../components';

export interface IServiceSearchResultsProps {
  size?: 'sm' | 'md' | 'lg';
}



export function ServiceSearchResults ({size= 'lg'}: IServiceSearchResultsProps) {
  const [freelancers, setFreelancers] = React.useState<Freelancer[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  let { selectedService } = useParams();
  
  React.useEffect(() => {

    const fetchPositions = async () => {
      setIsLoading(true);
      const response: any = await axios(`http://localhost:3000/api/freelancer/find_by_service/${selectedService}`);
      setFreelancers(response.data);

    };
    fetchPositions();
    setIsLoading(false)
  }, [isLoading, selectedService]);

  console.log("freelancers", freelancers)


  return (
    <div className={clsx(
      'm-10 grid grid-cols-4 gap-4',
      {
        'w-16': size === 'sm',
        'md:w-768': size === 'md',
        'lg:w-1024': size === 'lg',
      }
      )}>
      {freelancers.map((item: Freelancer) => (
        <InfoCard key={item._id} freelancer={item}></InfoCard>
      ))}
    </div>
  );
}


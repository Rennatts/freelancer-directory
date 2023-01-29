import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { Freelancer } from '../../Interfaces/Freelancer';
import { clsx } from 'clsx';
import { InfoCard } from '../../components';

export interface ICitySearchResultsProps {
  name?: string;
  size?: 'sm' | 'md' | 'lg';
}



export function CitySearchResults ({name, size= 'lg'}: ICitySearchResultsProps) {
  const [freelancers, setFreelancers] = React.useState<Freelancer[]>([]);
  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  let { selectedCity } = useParams();
  const navigate = useNavigate();

  console.log("selectedCity", selectedCity)
  
  React.useEffect(() => {
    const fetchPositions = async () => {
      setIsLoading(true);
      const response: any = await axios(`http://localhost:3000/api/freelancer/find_by_city/${selectedCity}`);
      setFreelancers(response.data);

    };
    fetchPositions();
    setIsLoading(false)
  }, [isLoading]);


  return (
    <div className='m-10 grid grid-cols-2 gap-4 xl:grid-cols-4 xl:gap-4'>
      {freelancers.map((item: Freelancer) => (
        <InfoCard key={item._id} freelancer={item}></InfoCard>
      ))}
    </div>
  );
}


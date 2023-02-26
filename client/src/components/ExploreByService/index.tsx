import * as React from 'react';
import { serviceType } from '../../data';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export interface IExploreByServiceProps {
  size?: 'sm' | 'md' | 'lg';
}

interface IServiceType {
  label: string;
  value: string;
  url: string;
}



export function ExploreByService ({ size= 'md' } : IExploreByServiceProps) {
  const [data, setData] = React.useState<IServiceType[]>()
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true)
    if(isLoading){
      setData(serviceType)
    }
  },[isLoading])


  function handleServiceTypeSelection(event: string){
    const fetchPositions = async () => {
      try {
        setIsLoading(true);
        const response: any = await axios(`http://localhost:3000/api/freelancer/find_by_service/${event}`);

        if (response.data.length === 0) { 
          navigate(`/service/service_not_found`,  { state: event }); 
        } else { 
          navigate(`/service/${event}`); 
        }

      } catch (error) {
        console.log('Error fetching positions', error); 
      }
    };

    fetchPositions();   
  }

  return (
    <div className='mb-32 mt-12 sm:mb-24 sm:mt-22'>
      <div className='flex align-center justify-center flex-row mb-8'>
        <span className='text-gray-500 sm:text-md md:text-xl md:mt-16'>Search by Service Category</span>
      </div>
      <div className='m-10 grid grid-cols-2 gap-2 mr-24 ml-24 md:grid-cols-1 md:gap-1 xl:grid-cols-5 xl:gap-4'>
        {data?.map((item) => 
          <div 
          onClick={()=> handleServiceTypeSelection(item.value)} 
          className="cursor-pointer hover:opacity-60 transition duration-300 ease-in-out mt-12"
          key={item.value}>
            <img className="w-full h-full" src={item.url} alt="img"/>
            <div className='flex align-center justify-center w-full bg-gray-100'>
              <p className='uppercase'>{item.label}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

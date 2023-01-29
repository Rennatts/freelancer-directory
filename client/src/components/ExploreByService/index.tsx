import * as React from 'react';
import { serviceType } from '../../data';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight, faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';


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
  const [servicesToBeShown, setServicesToBeShown] = React.useState<IServiceType[]>()
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true)
    if(isLoading){
      setData(serviceType)
      if(size === 'sm'){
        console.log(size === 'sm')
        setServicesToBeShown(serviceType.slice(0, 3))
      }else {
        setServicesToBeShown(serviceType.slice(0, 5))
      }
    }
  },[isLoading])

  function handleRightClick(){
    if(size === 'sm'){
      setServicesToBeShown(serviceType.slice(0,3))
    }
    setServicesToBeShown(serviceType.slice(0,5))
  }

  function handleLeftClick(){
    if(size === 'sm'){
      setServicesToBeShown(serviceType.slice(3))
    }
    setServicesToBeShown(serviceType.slice(5))
  }

  function handleServiceTypeSelection(event: string){

    const fetchPositions = async () => {
      setIsLoading(true);
      const response: any = await axios(`http://localhost:3000/api/freelancer/find_by_service/${event}`);

      response.data.length === 0 ? navigate(`/service/service_not_found`,  { state: event }) : navigate(`/service/${event}`);

    };
    fetchPositions();
  }

  console.log("servicesToBeShown", servicesToBeShown);

  return (
    <div className='mb-32 mt-12 sm:mb-24 sm:mt-22'>
      <div className='flex align-center justify-center flex-row mb-8'>
        <span className='text-gray-500 sm:text-md md:text-xl md:mt-16'>Search by Service Category</span>
      </div>
      <div className='flex align-center flex-row w-full sm:h-52 sm:mb-64 lg:ml-8 lg:mr-8'>
        <button 
        onClick={handleLeftClick} 
        className='flex align-center justify-center mt-32 mr-2'>
          <FontAwesomeIcon 
          className='text-2xl cursor-pointer text-gray-500' 
          icon={faCircleChevronLeft}/>
        </button>
        {servicesToBeShown?.map((item) => 
          <div 
          onClick={()=> handleServiceTypeSelection(item.value)} 
          className="cursor-pointer hover:opacity-60 transition duration-300 ease-in-out sm:bg-teal-300 sm:h-52 sm:mb-64 sm:w-12 sm:ml-1"
          key={item.value}>
            <img className="w-full h-full" src={item.url} alt="img"/>
            <div className='flex align-center justify-center w-full bg-gray-100'>
               <p className='uppercase'>{item.label}</p>
            </div>
          </div>
        )}
        <button 
        onClick={handleRightClick} 
        className='flex align-center justify-center mt-32 ml-2'>
          <FontAwesomeIcon 
          className='text-2xl cursor-pointer text-gray-500' 
          icon={faCircleChevronRight}/>
        </button>
      </div>
    </div>
  );
}

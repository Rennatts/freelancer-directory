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



export function ExploreByService ({ size= 'sm' } : IExploreByServiceProps) {
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
    <div className='mb-24 mt-22'>
      <div className='flex align-center justify-center flex-row mb-8'>
        <span className={clsx('text-gray-500', 
        {
          'text-md': size === 'sm',
        })}>Search by Service Category</span>
      </div>
      <div className={clsx('flex align-center flex-row w-full', 
      {
        'bg-teal-300 h-52 mb-64': size === 'sm',
        'ml-8 mr-8': size === 'lg'
      })}>
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
          className={clsx("cursor-pointer hover:opacity-60 transition duration-300 ease-in-out", 
          {
            'bg-teal-300 h-52 mb-64 w-12 ml-1': size === 'sm',
          })}
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

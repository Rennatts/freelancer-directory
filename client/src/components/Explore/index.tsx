import * as React from 'react';
import { serviceType } from '../../data';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight, faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export interface IExploreProps {
}

interface IServiceType {
  label: string;
  value: string;
  url: string;
}



export function Explore (props: IExploreProps) {
  const [data, setData] = React.useState<IServiceType[]>()
  const [servicesToBeShown, setServicesToBeShown] = React.useState<IServiceType[]>()
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true)
    if(isLoading){
      setData(serviceType)
      setServicesToBeShown(serviceType.slice(0, 5))
    }
  },[isLoading])

  function handleRightClick(){
    setServicesToBeShown(serviceType.slice(0,5))
  }

  function handleLeftClick(){
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
    <div className='mb-56'>
      <div className='flex align-center flex-row ml-8 mr-8'>
        <button onClick={handleLeftClick} className='flex align-center justify-center mt-32 mr-2'>
          <FontAwesomeIcon className='text-2xl cursor-pointer text-gray-500' icon={faCircleChevronLeft}></FontAwesomeIcon>
        </button>
        {servicesToBeShown?.map((item) => 
          <div onClick={()=> handleServiceTypeSelection(item.value)} className="w-42 h-72 ml-2 cursor-pointer hover:opacity-60 transition duration-300 ease-in-out" key={item.value}>
            <img className="w-full h-full" src={item.url} alt="img"/>
            <div className='flex align-center justify-center w-full bg-gray-100'>
               <p className='uppercase'>{item.label}</p>
            </div>
          </div>
        )}
        <button onClick={handleRightClick} className='flex align-center justify-center mt-32 ml-2'>
          <FontAwesomeIcon className='text-2xl cursor-pointer text-gray-500' icon={faCircleChevronRight}></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
}

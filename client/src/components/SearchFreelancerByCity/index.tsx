import * as React from 'react';
import './search.css';

import {useNavigate } from "react-router-dom";
import teamImage from './../../images/creative_team_re.svg';
import axios from 'axios';
import clsx from 'clsx';

export interface ISearchProps {
  size?: 'sm' | 'md' | 'lg';
}

export function SearchFreelancerByCity ({ size= 'md' }: ISearchProps) {
  const [selectedCity, setSelectedCity] = React.useState("");
  const [FreelancerBySelectedCity, setFreelancerBySelectedCity] = React.useState([]);
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    const fetchPositions = async () => {
      const response: any = await axios(`http://localhost:3000/api/freelancer/find_by_city/${selectedCity}`);

      response.data.length === 0 ? navigate(`/city/city_not_found`,  { state: selectedCity }) : navigate(`/city/${selectedCity}`);

    };
    fetchPositions();
  };

  
  return (
    <div className='flex items-center justify-center align-center flex-center flex-col
    xl:flex xl:align-items xl:justify-center 
    xl:flex-col'>
      <div className="w-full flex flex-wrap flex-center items-center justify-center flex-col">
        <p className='text-md mb-2 flex flex-wrap flex-center items-center justify-center sm:text-2xl md:text-2xl lg:text-2xl md:mt-10'>
          Find a freelancer</p>
        <p className="text-gray-500 sm:text-sm md:text-md md:w-1/3 md:mb-8 text-center md:tracking-wide md:leading-9">
          Find your next star freelancer with ease. Browse portfolios, compare prices, and connect with top talents.
          <p className="break-normal ">Start your project today!</p>
        </p>
      </div>
      <div className='mt-12'>
        <form 
        onSubmit={handleSubmit}
        className="w-72 sm:max-w-sm sm:pl-6 sm:pr-6 md:max-w-md xl:w-full">
          <div className="flex items-center border-b-2 border-teal-500
          xl:w-full xl:mr-0 xl:ml-0
          sm:mr-2 sm:ml-2 sm:py-2 md:mr-4 md:ml-4 md:py-2 md:mb-6 lg:py-2">
            <input 
            id="input" 
            name='selectedCity'
            value={selectedCity}
            onChange={(event)=> setSelectedCity((event.target.value))}
            className="xl:text-md appearance-none bg-transparent w-full py-2 px-1 sm:py-1 focus:outline-none sm:text-xs" 
            type="text" placeholder="Search by city" aria-label="Full name"/>
            <button 
            onClick={handleSubmit}
            className="xl:text-md flex-shrink-0 bg-teal-500 hover:bg-teal-300 hover:border-bg-teal-300 hover:text-black hover:border-teal-300 text-white py-1 px-5 rounded text-sm sm:mr-35 sm:text-xs" type="button">
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="mt-12 flex align-center justify-center w-72 h-full xl:flex xl:align-center xl:justify-center xl:w-full xl:h-full object-cover sm:h-92 sm:w-72 sm:mt-12 sm:mb-24 md:h-92 md:w-70 md:mt-12 md:mb-24">
        <img className="" src={teamImage}></img>
      </div>
    </div>
  );
}

import * as React from 'react';
import './search.css';

import {useNavigate } from "react-router-dom";
import teamImage from './../../images/creative_team_re.svg';
import axios from 'axios';
import clsx from 'clsx';

export interface ISearchProps {
  size?: 'sm' | 'md' | 'lg';
}

export function SearchFreelancerByCity ({ size= 'sm' }: ISearchProps) {
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
    <div className={clsx(
      'flex items-center align-center flex-center flex-col place-content-around',
      {
        '': size === 'sm',
      }
    )}>
      <div className={clsx("w-full flex flex-center items-center justify-center flex-col", 
      {

      })}>
        <p className={clsx('w-90 mb-2 flex flex-center items-center justify-center', 
        {
          'text-xl': size === 'sm',
        })}>Find a freelancer</p>
        <p className={clsx("text-gray-500", 
        {
          'text-sm w-40': size === 'sm',
        })}>Some nice description about the plataform</p>
      </div>
      <div className='mt-6'>
        <form 
        onSubmit={handleSubmit}
        className={clsx("w-full", 
        {
          'max-w-sm pl-6 pr-6': size === 'sm',
        })}>
          <div className={clsx("flex items-center border-b-2 border-teal-500", 
          {
            'mr-2 ml-2 py-2': size === 'sm',
            'py-2': size === "lg",
          })}>
            <input 
            id="input" 
            name='selectedCity'
            value={selectedCity}
            onChange={(event)=> setSelectedCity((event.target.value))}
            className={clsx("appearance-none bg-transparent w-full mr-3 py-1 px-3 focus:outline-none", 
            {
              'text-xs': size === 'sm',
            })} 
            type="text" placeholder="Search by city" aria-label="Full name"/>
            <button 
            onClick={handleSubmit}
            className={clsx("flex-shrink-0 bg-teal-500 hover:bg-teal-300 hover:border-bg-teal-300 hover:text-black hover:border-teal-300 text-white py-1 px-5 rounded", 
            {
              'mr-35 text-xs': size === 'sm',
            })} type="button">
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="object-cover h-48 w-96 mt-12">
        <img src={teamImage}></img>
      </div>
    </div>
  );
}

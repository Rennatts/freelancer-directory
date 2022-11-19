import * as React from 'react';
import axios from 'axios';
import './search.css';
import { Link, Navigate, useNavigate } from "react-router-dom";
import teamImage from './../../images/creative_team_re.svg';

export interface ISearchProps {
}

export function SearchFreelancerByCity (props: ISearchProps) {
  const [selectedCity, setSelectedCity] = React.useState("");
  const [FreelancerBySelectedCity, setFreelancerBySelectedCity] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    const fetchPositions = async () => {
      setIsLoading(true);
      const response: any = await axios(`http://localhost:3000/api/freelancer/find_by_city/${selectedCity}`);
      console.log(isLoading)

      response.data.length === 0 ? navigate(`/city/city_not_found`,  { state: selectedCity }) : navigate(`/city/${selectedCity}`);

    };
    fetchPositions();
  };

  
  return (
    <div className="h-80 py-52 flex items-center flex-center flex-col place-content-around mt-16">
      <div className="w-full flex flex-center items-center justify-center flex-col">
        <p className='w-90 text-2xl mb-2 flex flex-center items-center justify-center'>Find a freelancer</p>
        <p className="w-80 text-md text-gray-500">Some nice description about the plataform</p>
      </div>
      <div className='mt-16'>
        <form 
        onSubmit={handleSubmit}
        className="w-full max-w-sm">
          <div className="flex items-center border-b-2 border-teal-500 py-2">
            <input 
            id="input" 
            name='selectedCity'
            value={selectedCity}
            onChange={(event)=> setSelectedCity((event.target.value))}
            className="appearance-none bg-transparent w-full mr-3 py-1 px-3 focus:outline-none text-md" type="text" placeholder="Procure por cidade" aria-label="Full name"/>
            <button 
            onClick={handleSubmit}
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-300 hover:border-bg-teal-300 hover:text-black hover:border-teal-300 text-md text-white py-1 px-5 rounded" type="button">
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

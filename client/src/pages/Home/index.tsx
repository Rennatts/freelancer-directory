import React, { useEffect } from 'react';
import { Description } from '../../components/Description';
import { Explore } from '../../components/Explore';
import { SearchFreelancerByCity } from '../../components/SearchFreelancerByCity';



export default function Home() {

  return (
    <div className="jubotron">
      <SearchFreelancerByCity></SearchFreelancerByCity>
      <Description></Description>
      <Explore></Explore>
    </div>
  )
};
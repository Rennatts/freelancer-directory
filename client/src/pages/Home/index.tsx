import React, { useEffect } from 'react';
import { Description } from '../../components/Description';
import { ExploreByService } from '../../components/ExploreByService';
import { SearchFreelancerByCity } from '../../components/SearchFreelancerByCity';



export default function Home() {

  return (
    <div className="jubotron">
      <SearchFreelancerByCity></SearchFreelancerByCity>
      <ExploreByService></ExploreByService>
      <Description></Description>
    </div>
  )
};
import { Description, SearchFreelancerByCity, ExploreByService } from './../../components';



export function Home() {

  return (
    <div className="jubotron">
      <SearchFreelancerByCity></SearchFreelancerByCity>
      <ExploreByService></ExploreByService>
      <Description></Description>
    </div>
  )
};
import { Description, SearchFreelancerByCity, ExploreByService } from './../../components';



export default function Home() {

  return (
    <div className="jubotron">
      <SearchFreelancerByCity></SearchFreelancerByCity>
      <ExploreByService></ExploreByService>
      <Description></Description>
    </div>
  )
};
import { SearchFreelancerByCity, ExploreByService, HomeIntro } from './../../components';



export function Home() {

  return (
    <div className="jubotron">
      <SearchFreelancerByCity></SearchFreelancerByCity>
      <ExploreByService></ExploreByService>
      <HomeIntro></HomeIntro>
    </div>
  )
};
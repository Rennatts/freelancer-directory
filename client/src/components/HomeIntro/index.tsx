import './homeIntro.css';
import photo01 from './../../assets/001.jpg';
import photo02 from './../../assets/002.jpg';
import photo03 from './../../assets/003.jpg';


export interface IHomeIntroProps {
  
}


export function HomeIntro (props: IHomeIntroProps) {
  return (
    <div className='bg-teal-700 pt-14 pl-4 pr-4 md:pt-2 md:pb-8'>
      <div className='sm:grid sm:grid-rows-3 sm:grid-flow-col sm:gap-1 sm:m-20 grid grid-rows-2 grid-flow-col gap-1'>
        <div className='sm:row-start-2 sm:row-span-2 row-span-1'>
          <img src={photo01} alt="photo01"></img>
        </div>
        <div className='sm:row-end-3 sm:row-span-2 col-span-2'>
          <img src={photo02} alt="photo02"></img>
        </div>
        <div className='sm:row-start-2 sm:row-span-2 row-span-2 col-span-2'>
          <img src={photo03} alt="photo03"></img>
        </div>
        <div className='row-span-3 sm:row-start-1 sm:row-span-4 text-white sm:text-md md:text-md lg:text-xl md:mt-10 md:mr-32 md:ml-32'>
        <p>Easily source top-notch freelancers, craft well-defined work agreements, track progress collaboratively, and ensure smooth communication throughout your project</p>
        </div>
      </div>
    </div>
  );
}

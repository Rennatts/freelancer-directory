import * as React from 'react';
import './description.css';
import photo01 from './../../images/001.jpg';
import photo02 from './../../images/002.jpg';
import photo03 from './../../images/003.jpg';


export interface IDescriptionProps {
  
}


export function Description (props: IDescriptionProps) {
  return (
    <div className='photo_box'>
      <div className='box_01'>
        <img className='photo01' src={photo01} alt="photo01"></img>
      </div>
      <div className='box_02'>
        <img className='photo02' src={photo02} alt="photo02"></img>
      </div>
      <div className='box_03'>
        <img className='photo03' src={photo03} alt="photo03"></img>
      </div>
      <div className='description'>
        <p>Easily source top-notch freelancers, craft well-defined work agreements, track progress collaboratively, and ensure smooth communication throughout your project</p>
      </div>
    </div>
  );
}

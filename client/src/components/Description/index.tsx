import * as React from 'react';
import './description.css';

export interface IDescriptionProps {
}


export function Description (props: IDescriptionProps) {
  return (
    <div className='mt-96'>
      <div id="title" className='flex-auto content-center'>
        <h1 className="text-3xl font-bold">
          Hello world!
        </h1>
      </div>
      <div className='m-10 grid gap-4 grid-cols-3 max-w-7xl h-64'>
        <div className='mr-5 basis-1/2 border-radius: 0.5rem outline outline-offset-2 outline-cyan-500'>
          <p>oi</p>
        </div>
        <div className='mr-5 basis-1/2 border-radius: 0.5rem outline outline-offset-2 outline-cyan-500'>
          <p>oi</p>
        </div>
        <div className='mr-5 basis-1/2 border-radius: 0.5rem outline outline-offset-2 outline-cyan-500'>
          <p>oi</p>
        </div>
      </div>
    </div>
  );
}

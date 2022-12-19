import * as React from 'react';


export interface IExploreProps {
}



export function Explore (props: IExploreProps) {

  return (
    <div>
        <div>
            <p>The best place to find the professional you need to boost your business</p>
            <div>
                <button 
                className="bg-cyan-500 hover:bg-cyan-700 border-cyan-500 hover:border-cyan-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                Explorar
                </button>
            </div>
        </div>
    </div>
  );
}

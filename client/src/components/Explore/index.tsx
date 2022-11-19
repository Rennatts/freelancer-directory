import * as React from 'react';


export interface IExploreProps {
}



export function Explore (props: IExploreProps) {

  return (
    <div>
        <div>
            <p>some nice description about the plataform and what people can do with it plataform and what people can do with it</p>
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

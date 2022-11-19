import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import { FaSadTear } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { clsx } from 'clsx';


export interface ICityNotFoundProps {
    size?: 'sm' | 'md' | 'lg';
}


export function CityNotFound ({ size= 'md' }: ICityNotFoundProps) {
    const location = useLocation();
    const navigate = useNavigate();

    let { state } = useParams();
    return (
        <div className='py-40 flex justify-center flex-col items-center'>
            <div className='basis-1/4'>
                <h1 className={clsx(
                    'text-gray-100 font-bold font-sans',
                    {
                        'text-lg': size === 'sm',
                        'text-xl': size === 'md',
                        'text-2xl': size === 'lg',
                    }
                    )}>
                    Freelancer not found in {location.state}
                </h1>
                <IconContext.Provider value={{ color: "#218380", className: "global-class-name" }}>
                    <div className='flex justify-center py-10'>
                      <FaSadTear size={30}></FaSadTear>
                    </div>
                </IconContext.Provider>

                <button className="w-full flex-shrink-0 bg-teal-500 hover:bg-teal-300 hover:border-bg-teal-700 hover:text-black hover:border-teal-300 text-md text-white py-1 px-5 rounded" 
                onClick={()=> navigate('/')}
                >voltar</button>
            </div>
        </div>
    );
}
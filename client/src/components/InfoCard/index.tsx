import React from 'react'
import { Freelancer } from '../../Interfaces/Freelancer'
import { clsx } from 'clsx';
import { Navigate, useNavigate } from 'react-router-dom';

type Props = {
    Freelancer: Freelancer;
    size?: 'sm' | 'md' | 'lg';
}

export default function InfoCard({Freelancer, size="lg"}: Props) {
    const navigate = useNavigate();
    
    return (
        <div onClick={() => navigate(`/freelancer/profile/${Freelancer.id}`)} 
        className={clsx('cursor-pointer border-2 border-teal-500 rounded-lg shadow-2xl',
        {
            'h-10': size === 'sm',
            'h-40': size === 'md',
            'h-72': size === 'lg',
        }
        )}>
            <div className=''>
                <div className="px-6 py-4">
                    <h1 className={clsx('font-bold', 
                    {
                        'text-xl': size === 'sm',
                        'text-sm': size === 'md',
                        'text-md': size === 'lg',
                    })}
                    >{Freelancer.name}</h1>
                    <div className={clsx('mt-5', 
                    {
                        'text-xl': size === 'sm',
                        'text-sm': size === 'lg', 
                    })}>
                    </div>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                </div>
            </div>
        </div>
    )
}
import { Freelancer } from '../../Interfaces/Freelancer'
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';

type Props = {
    freelancer: Freelancer;
    size?: 'sm' | 'md' | 'lg';
}

export function InfoCard({freelancer, size="lg"}: Props) {
    const navigate = useNavigate();
    console.log("freelancerww", freelancer)
    
    return (
        <div onClick={() => navigate(`/freelancer/profile/${freelancer._id}`)} 
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
                    >{freelancer.name + freelancer.surname}</h1>
                </div>
            </div>
        </div>
    )
}
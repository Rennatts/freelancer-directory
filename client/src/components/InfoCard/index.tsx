import { Freelancer } from '../../pages/Interfaces/Freelancer'
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';

type Props = {
    freelancer: Freelancer;
}

export function InfoCard({freelancer}: Props) {
    const navigate = useNavigate();
    console.log("freelancerww", freelancer)
    
    return (
        <div onClick={() => navigate(`/freelancer/profile/${freelancer._id}`)} 
        className='h-36 xl:h-64 xl:w-64 cursor-pointer border-2 border-teal-500 rounded-lg shadow-2xl sm:h-10 md:h-40 lg:h-72'>
            <div className=''>
                <div className="px-6 py-4">
                    <h1 className='font-bold sm:text-sm md:text-md lg:text-lg'>
                        {`${freelancer.name} ${freelancer.surname}`}
                    </h1>
                </div>
            </div>
        </div>
    )
}
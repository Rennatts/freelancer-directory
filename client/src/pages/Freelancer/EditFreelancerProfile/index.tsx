import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Freelancer } from '../../../Interfaces/Freelancer';
import { clsx } from 'clsx';

export interface IEditFreelancerProfileProps {
  size?: 'sm' | 'md' | 'lg';
}



export function EditFreelancerProfile ({ size= 'lg'}: IEditFreelancerProfileProps ) {
    const [freelancer, setFreelancer] = React.useState<Freelancer>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [success, setSuccess] = React.useState<boolean>(false);
    const [error, setError] = React.useState<boolean>(false);
    const [ userData, setUserData] = React.useState({
        jobTitle: "",
        description: ""
    })
    
    let { freelancerId } = useParams();
    const navigate = useNavigate();

    console.log("freelancer", freelancer)
  

    React.useEffect(() => {
        const fetchPositions = async () => {
          setIsLoading(true);
          await axios(`http://localhost:3000/api/freelancer/${freelancerId}/edit`)
          .then((response) => setFreelancer(response.data))
        };

        if(!freelancer){
            fetchPositions(); 
            setIsLoading(false)
        }
    }, [freelancer]);
    
    const handleSubmit = async (e: any) => {
        e.preventDefault();
    
        axios
        .post(`http://localhost:3000/api/auth/signup_freelancer`, userData)
        .then((res) => {
    
          if(res.status === 201){
            setSuccess(true)
            //redirecionar para o perfil criado do usuário
            setTimeout(() => {
              navigate(`/freelancer/profile/${res.data.id}`)
            }, 10000)
          }
        })
        .catch((err) => setError(true));
    };

    function handleInputChange(event: any) {
        console.log("222", event.target.value)
        setUserData({...userData, [event.target.name]: event.target.value});
    }

    return (
    <div className="mb-6">
        <div className="flex items-start flex-col mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">Job title 
            </label>
            <input               
            id="input" 
            name='name'
            value={userData.jobTitle}
            onChange={(event)=> handleInputChange(event)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" required>
            </input>
        </div>
        <div className="flex items-start flex-col mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">Job title 
            </label>
            <textarea               
            id="input" 
            name='name'
            value={userData.description}
            onChange={(event)=> handleInputChange(event)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" required>
            </textarea>
        </div>
    </div>
    );
}

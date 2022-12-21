import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Freelancer } from '../../../Interfaces/Freelancer';
import { clsx } from 'clsx';
import { UserContext } from '../../../UserContext';

export interface IEditFreelancerProfileProps {
  size?: 'sm' | 'md' | 'lg';
}



export function EditFreelancerProfile ({ size= 'lg'}: IEditFreelancerProfileProps ) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [success, setSuccess] = React.useState<boolean>(false);
    const [error, setError] = React.useState<boolean>(false);
    const [ userData, setUserData] = React.useState({
        job_title: "",
        description: "",
        // zip_code: "",
        // address: "",
        // number: "",
        // city: "",
        // country: "",
    })
    
    let { freelancerId } = useParams();
    const navigate = useNavigate();
    const context = React.useContext(UserContext);

    console.log("userData", userData)
  

    React.useEffect(() => {
      const fetchPositions = async () => {
        setIsLoading(true);
        await axios(`http://localhost:3000/api/freelancer/${freelancerId}`).then((response) => 
        setUserData({job_title: response.data.job_title, description: response.data.description}))
      };

      fetchPositions(); 
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `${context?.token}`,
          }
        };
    
        axios.put(`http://localhost:3000/api/freelancer/${context?.id}`, userData, config)
        .then((res) => {
          console.log("res", res)
    
          if(res.status === 200){
            setSuccess(true)
            setTimeout(() => {
              navigate(`/freelancer/profile/${context?.id}`)
            }, 1000)
          }
        })
        .catch((err) => setError(true));
    };

    function handleInputChange(event: any) {
        setUserData({...userData, [event.target.name]: event.target.value});
    }

    return (
    <div className='flex items-center flex-center flex-col place-content-around p-20'>
      <h1>Complete with the information to be shown in your profile</h1>
        <div className="flex items-start flex-col mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">Job title 
            </label>
            <input               
            id="input" 
            name='job_title'
            value={userData.job_title}
            onChange={(event)=> handleInputChange(event)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" required>
            </input>
        </div>
        <div className="flex items-start flex-col mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">Description 
            </label>
            <textarea               
            id="input" 
            name='description'
            value={userData.description}
            onChange={(event)=> handleInputChange(event)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" required>
            </textarea>
        </div>
        {/* <div className="mb-6">
          <div className="flex items-start flex-col mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">zip code
              </label>
              <input               
              id="input" 
              name='zip_code'
              value={userData.zip_code}
              onChange={(event)=> handleInputChange(event)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" placeholder="00000-000" required>
              </input>
          </div>
          <div className="flex items-start flex-col mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">Address
              </label>
              <input               
              id="input" 
              name='address'
              value={userData.address}
              onChange={(event)=> handleInputChange(event)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" required>
              </input>
          </div>
          <div className="flex items-start flex-col mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">Number
              </label>
              <input               
              id="input" 
              name='number'
              value={userData.number}
              onChange={(event)=> handleInputChange(event)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" required>
              </input>
          </div>
          <div className="flex items-start flex-col mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">City
              </label>
              <input               
              id="input" 
              name='city'
              value={userData.city}
              onChange={(event)=> handleInputChange(event)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" required>
              </input>
          </div>
          <div className="flex items-start flex-col mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">Country
              </label>
              <input               
              id="input" 
              name='country'
              value={userData.country}
              onChange={(event)=> handleInputChange(event)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" required>
              </input>
          </div>
        </div> */}
        <button onClick={handleSubmit} className="flex-shrink-0 bg-teal-500 hover:bg-teal-300 hover:border-bg-teal-300 hover:text-black hover:border-teal-300 text-md text-white py-1 px-5 rounded" type="button">
          Save
        </button>
    </div>
    );
}

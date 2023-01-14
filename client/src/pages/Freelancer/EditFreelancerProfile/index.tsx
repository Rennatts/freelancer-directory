import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../../UserContext';
import { serviceType } from '../../../data';

export interface IEditFreelancerProfileProps {
  size?: 'sm' | 'md' | 'lg';
}



export function EditFreelancerProfile ({ size= 'lg'}: IEditFreelancerProfileProps ) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [success, setSuccess] = React.useState<boolean>(false);
    const [error, setError] = React.useState<boolean>(false);
    const [selectedServices, setSelectedServices] = React.useState<string[]>([]);
    const [ userData, setUserData] = React.useState({
        job_title: "",
        description: "",
        service_type: [""],
        zip_code: "",
        address: "",
        number: "",
        city: "",
        country: "",
    })
    
    let { freelancerId } = useParams();
    const navigate = useNavigate();
    const context = React.useContext(UserContext);
  

    React.useEffect(() => {
      const fetchPositions = async () => {
        setIsLoading(true);
        await axios(`http://localhost:3000/api/freelancer/${freelancerId}`).then((response) => 
        setUserData({
          job_title: response.data.job_title, 
          description: response.data.description, 
          service_type: response.data.service_type,
          zip_code: response.data.zip_code,
          address: response.data.address,
          number:response.data.number,
          city: response.data.city,
          country: response.data.country,
        }))
      };

      fetchPositions();

    }, []);


    const handleSubmit = (e: any) => {
        e.preventDefault();
        const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `${context?.token}`,
          }
        };

        axios.put(`http://localhost:3000/api/freelancer/${context?.id}`, userData, config)
        .then((res) => {
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
      console.log("event.target.value", event.target.value)
      if(event.target.name === "service_type"){
        setSelectedServices([...selectedServices, event.target.value]);
      }
      
      setUserData({...userData, [event.target.name]: event.target.value, service_type: selectedServices});
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
        <div className="flex items-start flex-col mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">Service Type</label>
          <div className='grid grid-rows-4 grid-flow-col gap-10'>
            {serviceType.map((item)=> (
              <div className="flex w-full flex-row items-center" key={item.value}>
                <input id="checked-checkbox" type="checkbox" name="service_type" value={item.label} onBlur={(event)=> handleInputChange(event)} className="w-4 h-4 text-teal-500 bg-gray-100 rounded border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label className="ml-2 text-sm font-medium text-black dark:text-black">{item.label}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-6 mt-8">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">Address</label>
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
        </div>
        <button onClick={handleSubmit} className="flex-shrink-0 bg-teal-500 hover:bg-teal-300 hover:border-bg-teal-300 hover:text-black hover:border-teal-300 text-md text-white py-1 px-5 rounded" type="button">
          Save
        </button>
    </div>
    );
}

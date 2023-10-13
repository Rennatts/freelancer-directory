import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../../UserContext';

export interface IEditUserProfileProps {
}



export function EditUserProfile ({}: IEditUserProfileProps ) {
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


    return (
      <div className='flex items-center flex-center flex-col place-content-around p-20'>
        <h1>Complete with the information to be shown in your profile</h1>
          <div className="mb-6 mt-8"></div>
          <button 
          onClick={handleSubmit} 
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-300 hover:border-bg-teal-300 hover:text-black hover:border-teal-300 text-md text-white py-1 px-5 rounded" type="button">
            Save
          </button>
      </div>
    );
}

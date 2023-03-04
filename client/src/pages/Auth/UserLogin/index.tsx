import axios from 'axios';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { saveUserToLocalStorage } from '../../../auth';
import { ErrorModal } from '../../../components';
import { handleErrorMessage } from '../../../utils/errorMessage';

export interface IUserLoginProps {
}

interface Error {
  existError: boolean,
  errorMessage: any;
}

export function UserLogin (props: IUserLoginProps) {
  const [error, setError] = React.useState<Error>({
    existError: false,
    errorMessage: "",
  });

  const [ status, setStatus ] = React.useState({
    isValid: false,
    message: "",
  })
  const navigate = useNavigate();
  const [ loginData, setLoginData ] = React.useState({
    email: "",
    password: "",
  })

  React.useEffect(()=> {
    if(error.existError){
      setLoginData({email: "", password: ""})
    }
  },[error.existError])

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();

  //   axios
  //   .post(`http://localhost:3000/api/auth/login_user`, loginData)
  //   .then((res) => {
  //     if(res.status !== 201){
  //       setError({errorMessage: handleErrorMessage(res.data), existError: true})
  //     }
  //     if(res.status === 201){
  //       saveUserToLocalStorage(res.data);
  //       setTimeout(() => {
  //         navigate(`/`)
  //       }, 1000)
  //     }
  //   })
  //   .catch((err) => {console.log("err", err.response.data.message); setError({errorMessage: handleErrorMessage(err.response.data.message), existError: true})});
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    try {
      const res = await axios.post(`http://localhost:3000/api/auth/login_user`, loginData);
      console.log("res", res)
  
      if(res.status !== 201){
        setError({errorMessage: handleErrorMessage(res.data), existError: true})
      } else {
        saveUserToLocalStorage(res.data);
        setTimeout(() => {
          navigate(`/`)
        }, 1000)
      }  
    } catch (err: any) { 
      setError({errorMessage: handleErrorMessage(err.response.data.message), existError: true});
    }  
  };




  function handleInputChange(event: any) {
    setLoginData({...loginData, [event.target.name]: event.target.value});
  }

  const handleErrorChange = (newError: Error) => {
    setError(newError);
  };


  return (
    <div className='flex items-center flex-center flex-col place-content-around md:p-20'>
      <div className='md:pr-64 md:pl-64 md:w-full w-64'>
        <div className='flex flex-center items-center justify-center'>
          <h2 className='p-9 text-xl underline underline-offset-8 decoration-teal-500'>Login</h2>
        </div>
        <ErrorModal error={error} onHandleErrorChange={handleErrorChange}/>
        <form className=''>
          <div className="mb-6">
            <div className="flex items-start flex-col mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">E-mail
              </label>
              <input               
              name='email'
              value={loginData.email}
              onChange={(event)=> handleInputChange(event)}  
              className="md:w-full text-black w-64 bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block p-2.5" placeholder="nome@email.com" required>
              </input>
            </div>

            <div className="flex items-start flex-col mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">
                Password
              </label>
              <input               
              name='password'
              value={loginData.password}
              type="password"
              onChange={(event)=> handleInputChange(event)}  
              className="md:w-full text-black w-64 bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block p-2.5" placeholder="***" required>
              </input>
            </div>

            {status.isValid === true ? <p>{status.message}</p> : "" }
            {status.isValid === false ? <p>{status.message}</p> : "" }

            <button 
            onClick={handleSubmit} 
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-300 hover:border-bg-teal-300 hover:text-black hover:border-teal-300 text-md text-white py-1 px-5 rounded" type="button">
              Enter
            </button>

            <div 
            onClick={()=> navigate(`/users/register`)} 
            className="flex items-end flex-col mb-6 text-xs mt-6">
              Do not have an account? <p className='cursor-pointer hover:text-cyan-300 text-'>Register here</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

import axios from 'axios';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { saveUserToLocalStorage } from '../../../auth';
import { ErrorModal } from '../../../components';

export interface IUserLoginProps {
}


export function UserLogin (props: IUserLoginProps) {
  const [error, setError] = React.useState<boolean>(false);
  const [ status, setStatus ] = React.useState({
    isValid: false,
    message: "",
  })
  const navigate = useNavigate();
  const [ loginData, setLoginData ] = React.useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    axios
    .post(`http://localhost:3000/api/auth/login_user`, loginData)
    .then((res) => {
      if(res.status === 200){
        saveUserToLocalStorage(res.data);
        setTimeout(() => {
          navigate(`/`)
        }, 1000)
      }
    })
    .catch((err) => setError(true));
  };


  function handleInputChange(event: any) {
    setLoginData({...loginData, [event.target.name]: event.target.value});
  }

  return (
    <div className='flex items-center flex-center flex-col place-content-around p-20'>
      <div>
        <div className='flex flex-center items-center justify-center'>
          <h2 className='p-9 text-xl underline underline-offset-8 decoration-teal-500'>Login</h2>
        </div>
        <ErrorModal mostrar={error}/>
        <form>
          <div className="mb-6">
            <div className="flex items-start flex-col mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">E-mail
              </label>
              <input               
              id="input" 
              name='email'
              value={loginData.email}
              onChange={(event)=> handleInputChange(event)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" placeholder="nome@email.com" required>
              </input>
            </div>

            <div className="flex items-start flex-col mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">Password
              </label>
              <input               
              id="input" 
              name='password'
              value={loginData.password}
              type="password"
              onChange={(event)=> handleInputChange(event)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" placeholder="***" required>
              </input>
            </div>

            {status.isValid === true ? <p>{status.message}</p> : "" }
            {status.isValid === false ? <p>{status.message}</p> : "" }

            <button onClick={handleSubmit} className="w-full flex-shrink-0 bg-teal-500 hover:bg-teal-300 hover:border-bg-teal-300 hover:text-black hover:border-teal-300 text-md text-white py-1 px-5 rounded" type="button">
              Enter
            </button>

            <div onClick={()=> navigate(`/users/register`)} className="flex items-end flex-col mb-6 text-xs mt-6">
              Do not have an account? <p className='cursor-pointer dark:text-teal-500 hover:dark:text-teal-300 hover:text-cyan-300 text-'>Register here</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

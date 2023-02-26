import axios from 'axios';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { saveUserToLocalStorage } from '../../../auth';
import { ErrorModal, SuccessModal } from '../../../components';
import { useState } from 'react';
import { handleErrorMessage } from '../../../utils/errorMessage';


export interface IUserLoginProps {
}

interface Error {
  existError: boolean,
  errorMessage: any;
}

export function UserRegister (props: IUserLoginProps) {
  const [success, setSuccess] = React.useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState("");
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
    name: "",
    surname: "",
    email: "",
    password: "",
  })

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();

  //   axios
  //   .post(`http://localhost:3000/api/auth/signup_user`, loginData)
  //   .then((res) => {
  //     console.log("res", res)
  //     if(res.status === 201){
  //       setSuccess(true)
  //       saveUserToLocalStorage(res.data);
  //       setTimeout(() => {
  //         navigate(`/`)
  //       }, 4000)
  //     }
  //   })
  //   .catch((err) => {setError({errorMessage: handleErrorMessage(err.response.data.message), existError: true})});
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    try {
      const res = await axios.post(`http://localhost:3000/api/auth/signup_user`, loginData);

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
      console.log("err", err)
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
    <div className='flex items-center flex-center flex-col place-content-around p-20'>
      <div className='md:pr-64 md:pl-64 md:w-full w-64'>
        <div className='flex flex-center items-center justify-center'>
          <h2 className='p-9 text-xl underline underline-offset-8 decoration-teal-500'>Register here</h2>
        </div>
        <ErrorModal error={error} onHandleErrorChange={handleErrorChange}></ErrorModal>
        <SuccessModal mostrar={success}></SuccessModal>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="flex items-start flex-col mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">Name
                </label>
                <input               
                name='name'
                value={loginData.name}
                onChange={(event)=> handleInputChange(event)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5" required>
                </input>
            </div>
            <div className="flex items-start flex-col mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">Surname
                </label>
                <input               
                name='surname'
                value={loginData.surname}
                onChange={(event)=> handleInputChange(event)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5" required>
                </input>
            </div>
            <div className="flex items-start flex-col mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">E-mail
              </label>
              <input               
              name='email'
              value={loginData.email}
              onChange={(event)=> handleInputChange(event)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700" placeholder="nome@email.com" required>
              </input>
            </div>

            <div className="flex items-start flex-col mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Password
              </label>
              <input               
              name='password'
              value={loginData.password}
              type="password"
              onChange={(event)=> {
              handleInputChange(event);
              event.target.value !== loginData.password && confirmPassword !== "" ? setStatus({
                isValid: false,
                message: 'Passwords do not match',
              }): setStatus({
                isValid: true,
                message: '',
              })}}
              className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-black" placeholder="***" required>
              </input>
              {status.isValid === false ? <p className='text-xs text-red'>{status.message}</p> : "" }
            </div>

            <div className="flex items-start flex-col mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">Confirm password
              </label>
              <input               
              name='confirmPassword'
              type="password"
              onChange={(event)=> {
              setConfirmPassword(event.target.value);
              event.target.value !== loginData.password? setStatus({
                isValid: false,
                message: 'Passwords do not match',
              }): setStatus({
                isValid: true,
                message: '',
              })}}
              className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-black" placeholder="***" required>
              </input>
              {status.isValid === false ? <p className='text-xs text-red'>{status.message}</p> : "" }
            </div>


            <button onClick={handleSubmit} className="w-full flex-shrink-0 bg-teal-500 hover:bg-teal-300 hover:border-bg-teal-300 hover:text-black hover:border-teal-300 text-md text-white py-1 px-5 rounded" type="button">
              Save
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

import axios from 'axios';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { saveUserToLocalStorage } from '../../../auth';
import { ErrorModal, SuccessModal } from '../../../components';
import { useState } from 'react';


export interface IUserLoginProps {
}

interface Error {
  existError: boolean,
  errorMessage: any;
}

interface ErrorCategory {
  [status: string]: string
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // await userRegisterSchema.isValid(loginData)
    // .then((valid) => {
    //   setStatus({
    //     isValid: valid,
    //     message: 'Erro no formulário, revise os campos por favor',
    //   });
    //   return valid
    // });

    axios
    .post(`http://localhost:3000/api/auth/signup_user`, loginData)
    .then((res) => {
      console.log("res", res)
      if(res.status === 201){
        setSuccess(true)
        saveUserToLocalStorage(res.data);
        setTimeout(() => {
          navigate(`/`)
        }, 4000)
      }
    })
    .catch((err) => {setError({errorMessage: handleErrorMessage(err.response.data.message), existError: true})});
  };

  function handleErrorMessage(status: string | number) {
    const keyActionMap: ErrorCategory = { 
      "Unauthorized": 'user not registered',
      "wrong password, try again": "wrong password, try again",
      "e-mail already registered": "e-mail already registered"
    }
    return keyActionMap[status]
  }



  function handleInputChange(event: any) {
    setLoginData({...loginData, [event.target.name]: event.target.value});
  }

  return (
    <div className='flex items-center flex-center flex-col place-content-around p-20'>
      <div>
        <div className='flex flex-center items-center justify-center'>
          <h2 className='p-9 text-xl underline underline-offset-8 decoration-teal-500'>Register here</h2>
        </div>
        <ErrorModal mostrar={error.existError} errorMessage={error.errorMessage}></ErrorModal>
        <SuccessModal mostrar={success}></SuccessModal>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="flex items-start flex-col mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">Name
                </label>
                <input               
                id="input" 
                name='name'
                value={loginData.name}
                onChange={(event)=> handleInputChange(event)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" required>
                </input>
            </div>
            <div className="flex items-start flex-col mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">Surname
                </label>
                <input               
                id="input" 
                name='surname'
                value={loginData.surname}
                onChange={(event)=> handleInputChange(event)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" required>
                </input>
            </div>
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
              onChange={(event)=> {
              handleInputChange(event);
              event.target.value !== loginData.password && confirmPassword !== "" ? setStatus({
                isValid: false,
                message: 'Passwords do not match',
              }): setStatus({
                isValid: true,
                message: '',
              })}}
              className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" placeholder="***" required>
              </input>
              {status.isValid === false ? <p className='text-xs text-red'>{status.message}</p> : "" }
            </div>

            <div className="flex items-start flex-col mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">Confirm password
              </label>
              <input               
              id="input" 
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
              className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" placeholder="***" required>
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

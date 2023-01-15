import * as React from 'react';
import { useNavigate } from "react-router-dom";
import './index.css';
import axios from 'axios';
import { experience, category, serviceType } from '../../../data';
import { saveUserToLocalStorage } from '../../../auth';
import { ErrorModal, SuccessModal } from '../../../components';



export interface IFreelancerRegisterProps {
}

interface Error {
  existError: boolean,
  errorMessage: any;
}

interface ErrorCategory {
  [status: string]: string
}


export function FreelancerRegister (props: IFreelancerRegisterProps) {
  const [currIndex, setCurrentIndex] = React.useState<number>(0);
  const [error, setError] = React.useState<Error>({
    existError: false,
    errorMessage: "",
  });
  const [success, setSuccess] = React.useState<boolean>(false);
  const [selectedStyles, setSelectedStyles] = React.useState<string[]>([]);
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [ status, setStatus ] = React.useState({
    isValid: false,
    message: "",
  })

  const navigate = useNavigate();
  const [ loginData, setLoginData ] = React.useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    zip_code: "",
    address: "",
    number: "",
    city: "",
    country: "",
    phone_number: "",
    instagram: "",
    website: "",
    experience: "",
    category: "",
    member_role: "NOT_MEMBER",
  })

  console.log("loginData", loginData)

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    axios
    .post(`http://localhost:3000/api/auth/signup_freelancer`, loginData)
    .then((res) => {
      if(res.status === 201){
        setSuccess(true)
        console.log(res.data)
        saveUserToLocalStorage(res.data);
        setTimeout(() => {
          navigate(`/freelancer/profile/edit/${res.data.id}`)
        }, 2000)
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

  function NextButton() {
    return (
      <button onClick={() => setCurrentIndex(currIndex + 1)} className="w-full flex-shrink-0 bg-teal-500 hover:bg-teal-300 hover:border-bg-teal-300 hover:text-black hover:border-teal-300 text-md text-white py-1 px-5 rounded" type="button">
        Next
      </button>
    );
  }

  function NextAndReturnButton() {
    return (
      <div className="flex flex-row space-x-3 w-full">
        <button onClick={() => setCurrentIndex(currIndex - 1)} className="flex-auto bg-teal-500 hover:bg-teal-300 hover:border-bg-teal-300 hover:text-black hover:border-teal-300 text-md text-white py-1 px-5 rounded" type="button">
          Back
        </button>
        <button onClick={() => setCurrentIndex(currIndex + 1)} className="flex-auto bg-teal-500 hover:bg-teal-300 hover:border-bg-teal-300 hover:text-black hover:border-teal-300 text-md text-white py-1 px-5 rounded" type="button">
          Next
        </button>
      </div>
    );
  }


  function SaveButton() {
    return (
      <div className="flex flex-row space-x-3 w-full">
        <button onClick={() => setCurrentIndex(currIndex - 1)} className="flex-auto bg-teal-500 hover:bg-teal-300 hover:border-bg-teal-300 hover:text-black hover:border-teal-300 text-md text-white py-1 px-5 rounded" type="button">
          Back
        </button>
        <button onClick={handleSubmit} className="flex-auto bg-teal-500 hover:bg-teal-300 hover:border-bg-teal-300 hover:text-black hover:border-teal-300 text-md text-white py-1 px-5 rounded" type="button">
          Save
        </button>
      </div>
    );
  }

  function RenderingButtons(currIndex: number):any {
    if (currIndex === 0) {
      return <NextButton />;
    }
    if (currIndex === 1 || currIndex === 2) {
      return <NextAndReturnButton />;
    }
    return <SaveButton/>;
  }
  

  return (
    <div className='flex items-center flex-center flex-col place-content-around p-20'>
      <div>
        <div className='flex flex-center items-center justify-center'>
          <h2 className='p-9 text-xl underline underline-offset-8 decoration-teal-500'>Register here</h2>
        </div>
        <ErrorModal mostrar={error.existError} errorMessage={error.errorMessage}/>
        <SuccessModal mostrar={success}></SuccessModal>
        <div className="w-full mt-27 mb-20">
          <ul id="connecting_line" className='relative flex space-x-24 auto mt-5 w-full -z-1'>
            {
              ["Name", "Address", "Contact", "Career"].map((item, index) => (
                <li data-title={item} className={`${currIndex >= index ? 'z-1 border-2 border-teal-500 before:text-black bg-teal-500 text-white grid rounded-full w-14 h-14 place-items-center before:content-[attr(data-title)] before:absolute before:text-xs before:-top-6 before:color-teal-500': 'bg-white z-1 border-2 border-black grid rounded-full w-14 h-14 place-items-center before:content-[attr(data-title)] before:absolute before:text-xs before:-top-6 before:color-teal-500'}`} key={item}>
                  {index}
                </li>
              ))
            }
          </ul>
        </div>
        <form>
          {currIndex === 0 ? (
            <div className="mb-6">
              <div className="flex items-start flex-col mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">Nome
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
                  <label className="block text-sm font-medium text-gray-900 dark:text-cyan-500">Username</label>
                  <label className="block mb-2 text-xs text-black">*optional</label>
                  <input               
                  id="input" 
                  name='username'
                  value={loginData.username}
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
                  message: 'The passwords are not the same',
              }): setStatus({
                isValid: true,
                message: '',
                })}}
              className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" placeholder="***" required>
              </input>
              {status.isValid === false ? <p className='text-xs text-red'>{status.message}</p> : "" }
            </div>
            </div>
          ) : null}
          
          {currIndex === 1 ? (
            <div className="mb-6">
              <div className="flex items-start flex-col mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">zip code
                  </label>
                  <input               
                  id="input" 
                  name='zip_code'
                  value={loginData.zip_code}
                  onChange={(event)=> handleInputChange(event)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" placeholder="00000-000" required>
                  </input>
              </div>
              <div className="flex items-start flex-col mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">Address
                  </label>
                  <input               
                  id="input" 
                  name='address'
                  value={loginData.address}
                  onChange={(event)=> handleInputChange(event)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" required>
                  </input>
              </div>
              <div className="flex items-start flex-col mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">Number
                  </label>
                  <input               
                  id="input" 
                  name='number'
                  value={loginData.number}
                  onChange={(event)=> handleInputChange(event)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" required>
                  </input>
              </div>
              <div className="flex items-start flex-col mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">City
                  </label>
                  <input               
                  id="input" 
                  name='city'
                  value={loginData.city}
                  onChange={(event)=> handleInputChange(event)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" required>
                  </input>
              </div>
              <div className="flex items-start flex-col mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">Country
                  </label>
                  <input               
                  id="input" 
                  name='country'
                  value={loginData.country}
                  onChange={(event)=> handleInputChange(event)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" required>
                  </input>
              </div>
            </div>
          ) : null}
          
          {currIndex === 2 ? (
            <div className="mb-6">
              <div className="flex items-start flex-col mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">Phone number
                  </label>
                  <input               
                  id="input" 
                  name='phone_number'
                  value={loginData.phone_number}
                  onChange={(event)=> handleInputChange(event)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" placeholder="(00)0000-0000" required>
                  </input>
              </div>
              <div className="flex items-start flex-col mb-6">
                  <label className="block text-sm font-medium text-gray-900 dark:text-cyan-500">Instagram</label>
                  <label className="block mb-2 text-xs text-black">*opcional</label>
                  <input               
                  id="input" 
                  name='instagram'
                  value={loginData.instagram}
                  onChange={(event)=> handleInputChange(event)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" required>
                  </input>
              </div>
              <div className="flex items-start flex-col mb-6">
                  <label className="block text-sm font-medium text-gray-900 dark:text-cyan-500">website</label>
                  <label className="block mb-2 text-xs text-black">*opcional</label>
                  <input               
                  id="input" 
                  name='website'
                  value={loginData.website}
                  onChange={(event)=> handleInputChange(event)}  className="bg-gray-50 border bg-transparent border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-teal-300" required>
                  </input>
              </div>
            </div>
          ) : null}
          
          
          {currIndex === 3 ? (
            <div className="mb-6">
              <div className="flex items-start flex-col mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">Service Type</label>
                <div className='grid grid-rows-2 grid-flow-col gap-6'>
                  {serviceType.map((item)=> (
                    <div className="flex w-full flex-row items-center" key={item.value}>
                      <input id="checked-checkbox" type="checkbox" name="style" value={item.value} onChange={(event)=> handleInputChange(event)} className="w-4 h-4 text-teal-500 bg-gray-100 rounded border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label className="ml-2 text-sm font-medium text-black dark:text-black">{item.value}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex w-max mb-6 flex-col">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">Categoria</label>
                {category.map((item:any) => (
                  <div className="flex items-center" key={item.value}>
                    <input id="default-radio-1" type="radio" name="category" value={item.value} onChange={(event)=> handleInputChange(event)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label className="ml-2 text-sm font-medium text-black">{item.label}</label>
                  </div>
                ))}
              </div>
              <div className="flex items-start flex-col mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-cyan-500">Years of experience</label>
                <div className="relative inline-block text-left mb-8">
                  <div className="absolute -right-30 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                    <div className="py-1" role="none">
                      <select name="experience" onChange={(event)=> handleInputChange(event)} >
                        {experience.map((item: any) => (
                          <option key={item.category} value={item.category} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-0">{item.category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {RenderingButtons(currIndex)}

        </form>
      </div>
    </div>
  );
}

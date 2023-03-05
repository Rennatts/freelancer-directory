
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { faCubes, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, signout } from '../../auth';
import { UserType } from '../../enum/UserType';
import { UserContext } from '../../UserContext';


interface IMenuProps {
}



export const NewHeader: React.FC<IMenuProps> = ({ }: IMenuProps) => {
    const [openNavBar, setOpenNavBar] = useState<boolean>(true)
    const context = useContext(UserContext);
    const navigate = useNavigate()
    let [open, setOpen] = useState<boolean>(false)

    console.log("header context", context)

    let links = [
      {name: "EXPLORE", link:"/freelancers/all"},
      {name: "PRICING", link: "/pricing"},
      {name: "ABOUT US", link: "/about_us"},
    ];

    let FreelancerLinks = [
      {name: "My Profile", link:`/freelancer/profile/${isAuthenticated().id}`},
    ];

    let UserLinks = [
      {name: "My Profile", link:`/user/profile/${isAuthenticated().id}`},
    ];

    let NotLoggedInLinks = [
      {name: "Login", link:`/users/login`},
      {name: "For Freelancers", link: "/freelancers"},
    ];

    function RenderProfilePath(userType: UserType): any {
      switch (userType) {
          case UserType.FREELANCER: 
              return <FreelancerHeader />;
          case UserType.USER: 
              return <UserHeader />;
          default: 
              return <NotLoggedHeader/>;
      }
    }   

    function FreelancerHeader() {
      return (
        <ul className="md:flex md:flex-row justify-evenly items-center mr-20">
          {
            FreelancerLinks.map((link) => (
              <li key={link.name} className='md:ml-8 text-sm md:my-0 my-7 mr-4'>
                <a href={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a>
              </li>
            ))
          }
         <Button width="1/2" onClick={()=> {signout(()=> navigate('/')); setOpen(false)}} >Sign out</Button>
        </ul>
      );
    }

    function UserHeader() {
      return (
        <ul className='md:flex md:flex-row justify-evenly items-center'>
          {
            UserLinks.map((link) => (
              <li key={link.name} className='md:ml-8 text-sm md:my-0 mr-6'>
                <a href={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a>
              </li>
            ))
          }
          <Button width="1/2" onClick={()=> signout(()=> {navigate('/'); setOpen(false)})} >Sign out</Button>
        </ul>
      );
    }

    function NotLoggedHeader() {
      return (
        <ul className="md:flex md:flex-row justify-evenly">
          {
            NotLoggedInLinks.map((link) => (
              <li key={link.name} className='md:ml-8 text-sm md:my-0 my-7 ml-0'>
                <Button onClick={()=> {navigate(link.link); setOpen(false)}}>{link.name}</Button>
              </li>
            ))
          }
        </ul>
      );
    }


    return(
      <div className='w-full top-0 left-0 mb-5 bg-teal-700'>
        <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
          <div onClick={()=> navigate('/')}  className='font-bold text-xl cursor-pointer flex align-center items-center justify-center text-gray-800'>
            <span className='text-3xl mr-1 pt-2'>
              <FontAwesomeIcon className='text-2xl cursor-pointer mr-2 text-teal-700' icon={faCubes}/>
            </span>
            Freelancers
          </div>
          <div onClick={()=> setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
            <FontAwesomeIcon icon={open? faXmark : faBars } name={open? 'close' : 'menu'} className='text-xl cursor-pointer text-gray-500'/>
          </div>
          <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto 
          md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 bg-gray-100 z-[1]' : 'top-[-490px] md:opacity-100 opacity-0'}`}>
            {
              links.map((link) => (
                <li key={link.name} className='md:ml-8 text-sm md:my-0 my-7 hover:text-teal-700 hover:underline hover:decoration-teal-700'>
                  <a href={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a>
                </li>
              ))
            }
            {RenderProfilePath(isAuthenticated().userType)}
          </ul>
        </div>
      </div>
    );
};















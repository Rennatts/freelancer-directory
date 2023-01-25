
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { faCubes, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from '../Button';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { isAuthenticated, signout } from '../../auth';
import { UserType } from '../../enum/UserType';
import { UserContext } from '../../UserContext';


interface IMenuProps {
    size?: 'sm' | 'md' | 'lg';
}



export const NewHeader: React.FC<IMenuProps> = ({ size= 'sm' }: IMenuProps) => {
    const [openNavBar, setOpenNavBar] = useState<boolean>(true)
    const context = useContext(UserContext);
    const navigate = useNavigate()
    let [open, setOpen] = useState<boolean>(false)

    let links = [
      {name: "OI", link:"/oi"},
      {name: "OLA", link: "/ola"},
      {name: "ABOUT US", link: "/hello"},
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
      if (userType === UserType.FREELANCER) {
      return <FreelancerHeader />;
      }
      if (userType === UserType.USER) {
      return <UserHeader />;
      }
      return <NotLoggedHeader/>;
    }

    function FreelancerHeader() {
      return (
        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto 
        md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 opacity-100' : 'top-[-490px] md:opacity-100 opacity-0'}`}>
          {
            FreelancerLinks.map((link) => (
              <li key={link.name} className='md:ml-8 text-sm md:my-0 my-7'>
                <a href={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a>
              </li>
            ))
          }
         <Button onClick={()=> signout(()=> navigate('/'))} >Sign out</Button>
        </ul>
      );
    }

    function UserHeader() {
      return (
        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto 
        md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 opacity-100' : 'top-[-490px] md:opacity-100 opacity-0'}`}>
          {
            UserLinks.map((link) => (
              <li key={link.name} className='md:ml-8 text-sm md:my-0 my-7'>
                <a href={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a>
              </li>
            ))
          }
          <Button onClick={()=> signout(()=> navigate('/'))} >Sign out</Button>
        </ul>
      );
    }

    function NotLoggedHeader() {
      return (
        <ul>
          {
            NotLoggedInLinks.map((link) => (
              <li key={link.name} className='md:ml-8 text-sm md:my-0 my-7'>
                <Button onClick={()=> navigate(link.link)}>{link.name}</Button>
              </li>
            ))
          }
        </ul>
      );
    }


    return(
      <div className='w-full top-0 left-0 mb-5 bg-teal-700'>
        <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
          <div onClick={()=> navigate('/')}  className='font-bold text-xl cursor-pointer flex items-center text-gray-800'>
            <span className='text-3xl text-indigo-600 mr-1 pt-2'>
              <FontAwesomeIcon className='text-xl cursor-pointer text-gray-500' icon={faCubes}/>
            </span>
            Tattoo
          </div>
          <div onClick={()=> setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
            <FontAwesomeIcon icon={open? faXmark : faBars } name={open? 'close' : 'menu'} className='text-xl cursor-pointer text-gray-500'/>
          </div>
          <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto 
          md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 bg-gray-100 z-[1]' : 'top-[-490px] md:opacity-100 opacity-0'}`}>
            {
              links.map((link) => (
                <li key={link.name} className='md:ml-8 text-sm md:my-0 my-7'>
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















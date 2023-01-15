import React, { useContext } from 'react';
    
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { isAuthenticated, signout } from '../../auth';
import { UserType } from '../../enum/UserType';
import { UserContext } from '../../UserContext';

interface IMenuProps {

}



export const Header: React.FC<IMenuProps> = (props: IMenuProps) => {
    const context = useContext(UserContext);
    const navigate = useNavigate()

    console.log("context", context)
    console.log("isAuthenticated", isAuthenticated())

    function FreelancerHeader() {
        return (
            <nav>
                <ul className='cursor-pointer flex align-center flex-row text-md ml-6'>
                    <li onClick={()=> navigate(`/freelancer/profile/${isAuthenticated().id}`)} className='px-4 hover:text-teal-500 hover:underline underline-offset-8 text-xs flex items-center flex-center'>
                        My Profile
                    </li>
                    <li onClick={()=> signout(()=> navigate('/'))} className='px-4 rounded bg-teal-500 text-white hover:text-black hover:bg-teal-300'>
                    SingOut</li>
                </ul>
            </nav>
        );
    }

    function UserHeader() {
        return (
            <nav>
                <ul className='cursor-pointer flex align-center flex-row text-md ml-6'>
                    <li onClick={()=> navigate(`/user/profile/${isAuthenticated().id}`)} className='px-4 hover:text-teal-500 hover:underline underline-offset-8 text-xs flex items-center flex-center'>
                        My Profile
                    </li>
                    <li onClick={()=> signout(()=> navigate('/'))} className='px-4 rounded bg-teal-500 text-white hover:text-black hover:bg-teal-300'>
                    SingOut</li>
                </ul>
            </nav>
        );
    }

    function NotLoggedHeader() {
        return (
            <nav>
                <ul className='cursor-pointer flex align-center flex-row text-md ml-6'>
                    <li className='px-4 rounded bg-teal-500 text-white hover:text-black hover:bg-teal-300'>
                        <NavLink to="/users/login">Login</NavLink>
                    </li>
                    <li className='px-4 hover:text-teal-500 hover:underline underline-offset-8 text-xs flex items-center flex-center'>
                        <NavLink className="ml-8" to="/freelancers">For Freelancers</NavLink>
                    </li>
                </ul>
            </nav>
        )
    }


    
    
    function RenderProfilePath(userType: UserType): any {
        if (userType === UserType.FREELANCER) {
        return <FreelancerHeader />;
        }
        if (userType === UserType.USER) {
        return <UserHeader />;
        }
        return <NotLoggedHeader/>;
    }

    return(
        <div className="flex items-center flex-center flex-row py-7 w-full place-content-around">
            <div className="cursor-pointer text-2xl ml-10">
                <h1><Link to="/">LOGO</Link></h1>
            </div>
            <nav>
                <ul className='cursor-pointer flex justify-evenly align-center flex-row text-md ml-10'>
                    <li className='px-4 hover:text-teal-500 hover:underline underline-offset-8'>
                       <NavLink to="/oi">oi</NavLink>
                    </li>
                    <li className='px-4 hover:text-teal-500 hover:underline underline-offset-8'>
                        <NavLink to="/ola">ola</NavLink>
                    </li>
                    <li className='px-4 hover:text-teal-500 hover:underline underline-offset-8'>
                        <NavLink to="/hello">About us</NavLink>
                    </li>
                    <li className='px-4 hover:text-teal-500 hover:underline underline-offset-8'>
                        <NavLink to="/hello">Q&A</NavLink>
                    </li>
                </ul>
            </nav>
            {RenderProfilePath(isAuthenticated().userType)}
 
        </div> 
    );
};
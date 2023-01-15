import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import { UserContext } from '../../../UserContext';
import ProfilePhoto from './../../../images/profilePhoto.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen, faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { User } from '../../../Interfaces/User';

export interface IUserProfileProps {
  size?: 'sm' | 'md' | 'lg';
}



export function UserProfile ({ size= 'lg'}: IUserProfileProps) {
    const [user, setUser] = React.useState<User>();
    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [error, setError] = React.useState<boolean>(false);
    let { userId } = useParams() as any;
    const navigate = useNavigate();
    const context = React.useContext(UserContext);

    console.log("userId", user)
  
    React.useEffect(() => {
        const fetchPositions = async () => {
          await axios(`http://localhost:3000/api/user/${userId}`)
          .then((response) => setUser(response.data))
        };

        if(!user){
            fetchPositions(); 
        }

    }, [user]);

    return (
        <>
            <div className="place-content-around p-20  mt-2 ml-80 mr-80 shadow-2xl">
                <div className="flex items-start flex-start flex-col">
                    <div className='w-full flex flex-col items-center justify-center border-b border-teal-500'>
                        <img className='h-14 w-12' src={ProfilePhoto} alt="profile_photo"></img>
                        <p className='mt-2'>{user?.name}</p>
                        <p className='mt-2'>
                        </p> 
                        <p className='mt-2'>Member since
                            <Moment className="ml-2" format="YYYY/MM/DD">{user?.createdAt}</Moment>
                        </p>
                        <br/>
                    </div>
                </div>

                {context?.id === user?._id ? 
                (
                    <div className='mt-12 w-full flex justify-items-end'>
                        <button onClick={() => navigate(`/user/profile/edit/${user?._id}`)} className="text-gray-50 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                        <FontAwesomeIcon className="mr-2" icon={faUserPen} />Edit Profile
                        </button>
                    </div>
                ): (
                    <div className='mt-12 w-full flex justify-items-end'>
                        <button onClick={()=> setOpenModal(true)} className="text-gray-500 background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                        <FontAwesomeIcon className="mr-2" icon={faSquarePen} />Create Review
                        </button>
                    </div>
                )}
                {/* <ReviewList></ReviewList> */}
            </div>
        </>

    );
}

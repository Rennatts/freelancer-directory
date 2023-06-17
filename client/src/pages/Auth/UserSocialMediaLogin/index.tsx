import axios, { AxiosError } from 'axios';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { saveUserToLocalStorage } from '../../../auth';
import { ErrorModal, SuccessModal } from '../../../components';
import { useState } from 'react';
import { handleErrorMessage } from '../../../utils/errorMessage';
import {
    LoginSocialGoogle,
    LoginSocialFacebook,
    LoginSocialInstagram,
    LoginSocialTwitter,
    IResolveParams,
} from 'reactjs-social-login'
import {
    FacebookLoginButton,
    GoogleLoginButton,
    InstagramLoginButton,
    TwitterLoginButton,
} from 'react-social-login-buttons'
import { UserLogin } from '../UserLogin';

export interface IUserSocialMediaLoginProps {
}

interface Error {
  existError: boolean,
  errorMessage: any;
}

interface Window {
    fbAsyncInit: any;
}

export function UserSocialMediaLogin (props: IUserSocialMediaLoginProps) {
    const [provider, setProvider] = useState('')
    const [profile, setProfile] = useState<any>()
    const navigate = useNavigate();

    console.log("provider", provider)
    console.log("profile", profile)

    const onLoginStart = React.useCallback(() => {
        alert('login start')
    }, [])

    const onLogoutSuccess = React.useCallback(() => {
        setProfile(null)
        setProvider('')
        alert('logout success')
    }, []);

    return(
        <div className='flex items-center flex-center justify-center align-center lg:flex-row md:flex-col md:items-center md:flex-center md:mt-20 sm:flex sm:flex-col sm:items-center sm:flex-center xsm:flex xsm:flex-col xsm:justify-center xsm:align-center'>          
            <div className='xsm:flex xsm:justify-center xsm:items-center flex justify-center items-end flex-col w-full lg:w-full'>
                {/* <LoginSocialFacebook
                    isOnlyGetToken
                    appId='1013581282965210'
                    onLoginStart={onLoginStart}
                    onResolve={(response: IResolveParams) => {
                        console.log("response", response);
                        setProvider('facebook');
                        setProfile(response.data);
                        // You can save the user details in local storage like this
                        saveUserToLocalStorage(response);
                        // Navigate to the main page after login
                        navigate('/');
                    }}
                    onReject={(reject: string | object) => {
                        console.log("reject", reject)
                        // Handle error - you might need to adjust handleErrorMessage function to handle string | object type
                        //handleErrorMessage(JSON.stringify(reject));
                    }}
                >
                    <FacebookLoginButton/>
                </LoginSocialFacebook> */}
                
                <LoginSocialFacebook
                    className='xsm:w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/2 mt-3'
                    appId={process.env.REACT_APP_FB_APP_ID || ''}
                    fieldsProfile={
                        'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
                    }
                    onLoginStart={onLoginStart}
                    onLogoutSuccess={onLogoutSuccess}
                    // redirect_uri={REDIRECT_URI}
                    onResolve={({ provider, data }: IResolveParams) => {
                        setProvider(provider);
                        setProfile(data);
                    }}
                    onReject={err => {
                        console.log(err);
                    }}
                    >
                    <FacebookLoginButton />
                </LoginSocialFacebook>

                <LoginSocialGoogle
                    className='xsm:w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/2 mt-3'
                    client_id={process.env.REACT_APP_GG_APP_ID || ''}
                    onLoginStart={onLoginStart}
                    redirect_uri={'https://localhost:4000/'}
                    scope="openid profile email"
                    discoveryDocs="claims_supported"
                    access_type="offline"
                    onResolve={({ provider, data }: IResolveParams) => {
                        setProvider(provider);
                        setProfile(data);
                    }}
                    onReject={err => {
                        console.log(err);
                    }}
                    >
                    <GoogleLoginButton />
                </LoginSocialGoogle>
                <LoginSocialInstagram
                    className='xsm:w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/2 mt-3'
                    client_id={process.env.REACT_APP_INSTAGRAM_APP_ID || ''}
                    client_secret={process.env.REACT_APP_INSTAGRAM_APP_SECRET || ''}
                    redirect_uri={'https://localhost:4000/'}
                    onLoginStart={onLoginStart}
                    onLogoutSuccess={onLogoutSuccess}
                    onResolve={({ provider, data }: IResolveParams) => {
                        setProvider(provider);
                        setProfile(data);
                    }}
                    onReject={(err: any) => {
                        console.log(err);
                    }}
                    >
                    <InstagramLoginButton />
                </LoginSocialInstagram>

                <LoginSocialTwitter
                    className='xsm:w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/2 mt-3'
                    client_id={process.env.REACT_APP_TWITTER_V2_APP_KEY || ''}
                    // client_secret={process.env.REACT_APP_TWITTER_V2_APP_SECRET || ''}
                    redirect_uri={'https://localhost:4000/'}
                    onLoginStart={onLoginStart}
                    onLogoutSuccess={onLogoutSuccess}
                    onResolve={({ provider, data }: IResolveParams) => {
                        setProvider(provider);
                        setProfile(data);
                    }}
                    onReject={(err: any) => {
                        console.log(err);
                    }}
                    >
                    <TwitterLoginButton />
                </LoginSocialTwitter>
            </div>
            <div className='xsm:flex xsm:justify-center xsm:items-center mg:w-full md:flex md:justify-center md:items-center flex justify-center items-start flex-col w-full lg:w-full sm:flex-center sm:items-center sm:flex-col xsm:flex-col xs:w-100 lg:w-100'>
                <UserLogin></UserLogin>
            </div>
        </div>
    );
}

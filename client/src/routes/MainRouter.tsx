import React, {useEffect} from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Header from '../components/Header';
import Home from '../pages/Home';
import { Footer } from '../components/Footer';
import ErrorPage from '../pages/Error';
import { CityNotFound } from '../components/CityNotFound';
import { CitySearchResults } from '../pages/CitySearchResults';
import { UserLogin } from '../pages/Auth/UserLogin';
import { UserRegister } from '../pages/Auth/UserRegister';
import { FreelancerRegister } from './../pages/Auth/FreelancerRegister';
import { RedirectionFreelancers } from '../pages/RedirectionFreelancers';
import { FreelancerLogin } from '../pages/Auth/FreelancerLogin';
import { isAuthenticated, isLogged } from '../auth';
import { UserContext } from '../UserContext';
import ProtectedRoute from '../auth/ProtectedRoute';
import { FreelancerProfile } from '../pages/Freelancer/FreelancerProfile';
import { EditFreelancerProfile } from '../pages/Freelancer/EditFreelancerProfile';
import { ServiceNotFound } from '../components/ServiceNotFound';
import { ServiceSearchResults } from '../pages/ServiceSearchResults';


function MainRouter(){
    const jwt = isLogged();
    console.log("JWT",  isAuthenticated());
   
    return (
        <div>
            <UserContext.Provider value={{name: isAuthenticated().name, userType:isAuthenticated().userType, id: isAuthenticated().id, token: isAuthenticated().token}}>
                <Router>
                    <Header></Header>
                        <Routes>
                            <Route path="/" element={<Home/>}></Route>
                            <Route path="/city/:selectedCity" element={<CitySearchResults/>}></Route>
                            <Route path="/city/city_not_found" element={<CityNotFound/>}></Route>
                            <Route path="/service/service_not_found" element={<ServiceNotFound/>}></Route>
                            <Route path="/service/:selectedService" element={<ServiceSearchResults/>}></Route>
                            <Route path="/freelancer/profile/:freelancerId" element={<FreelancerProfile/>}></Route>
                            <Route path="*" element={<ErrorPage/>}></Route>
                            <Route path="/users/login" element={<UserLogin/>}></Route>
                            <Route path="/users/register" element={<UserRegister/>}></Route>
                            <Route path="/freelancers/register" element={<FreelancerRegister/>}></Route>
                            <Route path="/freelancers" element={<RedirectionFreelancers/>}></Route>
                            <Route path="/freelancers/login" element={<FreelancerLogin/>}></Route>
                            <Route path="/freelancer/profile/edit/:freelancerId" element={<EditFreelancerProfile/>}></Route>
                            {/* <Route
                                path="/oi"
                                element={
                                    <ProtectedRoute user={isAuthenticated()}>
                                    <Footer/>
                                    </ProtectedRoute>
                                }
                            /> */}
                            <Route element={<ProtectedRoute user={isAuthenticated()}></ProtectedRoute>}>
                                <Route path="oi" element={<Footer/>} />
                                <Route path="ola" element={<Footer/>} />
                            </Route>
                        </Routes>
                </Router>
                <Footer></Footer>
            </UserContext.Provider>
        </div>
    )

};


export default MainRouter;

import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { CityNotFound, Footer, Header, NewHeader } from './../components';
import { isAuthenticated } from '../auth';
import { UserContext } from '../UserContext';
import ProtectedRoute from '../auth/ProtectedRoute';
import { ServiceNotFound } from '../components/ServiceNotFound';
import { 
    CitySearchResults, 
    EditFreelancerProfile, 
    ErrorPage, 
    FreelancerLogin, 
    FreelancerProfile, 
    FreelancerRegister, 
    Home, 
    RedirectionFreelancers, 
    ServiceSearchResults, 
    UserLogin, 
    UserProfile, 
    UserRegister,
    AboutUsPage
} from '../pages';


function MainRouter(){
    console.log("JWT",  isAuthenticated());
   
    return (
        <div>
            <UserContext.Provider value={{name: isAuthenticated().name, userType:isAuthenticated().userType, id: isAuthenticated().id, token: isAuthenticated().token}}>
                <Router>
                    <NewHeader/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/city/:selectedCity" element={<CitySearchResults/>}/>
                            <Route path="/city/city_not_found" element={<CityNotFound/>}/>
                            <Route path="/service/service_not_found" element={<ServiceNotFound/>}/>
                            <Route path="/service/:selectedService" element={<ServiceSearchResults/>}/>
                            <Route path="/freelancer/profile/:freelancerId" element={<FreelancerProfile/>}/>
                            <Route path="/user/profile/:userId" element={<UserProfile/>}/>
                            <Route path="*" element={<ErrorPage/>}/>
                            <Route path="/users/login" element={<UserLogin/>}/>
                            <Route path="/users/register" element={<UserRegister/>}/>
                            <Route path="/freelancers/register" element={<FreelancerRegister/>}/>
                            <Route path="/freelancers" element={<RedirectionFreelancers/>}/>
                            <Route path="/freelancers/login" element={<FreelancerLogin/>}/>
                            <Route path="/about_us" element={<AboutUsPage/>}/>
                            <Route path="/freelancer/profile/edit/:freelancerId" element={<EditFreelancerProfile/>}/>
                            {/* <Route
                                path="/oi"
                                element={
                                    <ProtectedRoute user={isAuthenticated()}>
                                    <Footer/>
                                    </ProtectedRoute>
                                }
                            /> */}
                            <Route element={<ProtectedRoute user={isAuthenticated()}/>}>
                                <Route path="oi" element={<Footer/>} />
                                <Route path="ola" element={<Footer/>} />
                            </Route>
                        </Routes>
                </Router>
                <Footer/>
            </UserContext.Provider>
        </div>
    )

};


export default MainRouter;

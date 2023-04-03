import axios from "axios";
import { UserContext } from './../UserContext';
import { useContext } from 'react';

export const saveUserToLocalStorage = (jwt) => {
    localStorage.setItem("jwt", JSON.stringify(jwt));
}


export const isLogged = () => {
    if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
}


export const logout = (cb) => {
    localStorage.removeItem("jwt");
    document.cookie = "t=;expires=Thu, 01 Jan 1970 00:00:00 UCT;path=/";
    cb();
}



export const checkAuth = (userId) => {
    return isLogged().user._id === userId;
}


export const isAuthenticated = () => {
    if(typeof window === "undefined") {
        return false
    }

    if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false
    }

};



// export const signout = (next) => {

//     console.log("localStorage", localStorage)

//     if(typeof window !== "undefined"){
//         localStorage.removeItem("jwt")
//     } 
//     next()

//     return axios.get(`http://localhost:3000/api/auth/logout_user`)
//     .then(res => {
//         console.log("res", res)
//         localStorage.removeItem("jwt")
//         console.log("localStorage", localStorage)
//     })
//     .catch(err => console.log("err", err))

// };



export const useSignout = () => {
    const { clearUserData } = useContext(UserContext);
  
    const signout = (next) => {
      console.log('localStorage', localStorage);
  
      if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
      }
      next();
  
      return axios
        .get(`http://localhost:3000/api/auth/logout_user`)
        .then((res) => {
          console.log('res', res);
          localStorage.removeItem('jwt');
          clearUserData(); // Call the function to clear user data from the context provider
          console.log('localStorage', localStorage);
        })
        .catch((err) => console.log('err', err));
    };
  
    return signout;
};

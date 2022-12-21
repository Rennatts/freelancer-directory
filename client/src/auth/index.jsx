import axios from "axios";

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



export const signout = (next) => {
    //const navigate = useNavigate()

    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")
    } 
    return axios.get(`http://localhost:3000/api/auth/logout_user`)
    .then(res => {
        console.log("res", res)
        //navigate('/')
    })
    .catch(err => console.log("err", err))

};


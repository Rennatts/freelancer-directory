import React from "react";

interface Context {
    name: string;
    id: string;
    userType: string;
    token: string;
    clearUserData: () => void;
}


export const UserContext = React.createContext<Context | null>(null);


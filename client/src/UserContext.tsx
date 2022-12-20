import React from "react";

interface Context {
    name: string;
    id: string;
    userType: string;
    token: string;
}


export const UserContext = React.createContext<Context | null>(null);


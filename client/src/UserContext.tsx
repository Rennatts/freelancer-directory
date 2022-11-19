import React from "react";

interface Context {
    name: string;
    token: string;
}


export const UserContext = React.createContext<Context | null>(null);


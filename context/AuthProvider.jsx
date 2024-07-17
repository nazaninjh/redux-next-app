'use client'
const { createContext, useState } = require("react");

//can you use redux prsist to make this work better
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [Auth, setAuth] = useState({user: 'Moriah.Stanton'});
    return (<AuthContext.Provider value={{Auth, setAuth}}>
        {children}
    </AuthContext.Provider>)
}

export default AuthContext;
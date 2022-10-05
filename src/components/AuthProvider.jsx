import React, { useState, useContext } from 'react';

const AuthContext = React.createContext();

export function useAuthContext() {
    const { isLoggedIn, setLoggedIn } = useContext(AuthContext);
    return { isLoggedIn, setLoggedIn };
}

export function AuthProvider({ children }) {
    const [isLoggedIn, setLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

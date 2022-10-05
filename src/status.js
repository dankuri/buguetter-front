import React, { useState } from "react";

const StatusContext = React.createContext();

export default function StatusProvider({ children }) {
    // TODO: checkServer here
    // TODO: checkRefreshCookie here
    // TODO: getUser here
    return (
        <StatusContext.Provider value={}>
            {children}
        </StatusContext.Provider>
    )
}
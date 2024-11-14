// IsLoggedInProvider.js
import React, { useState } from "react";
import isLoggedInContext from "./IsLoggedInContext";

const IsLoggedInProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <isLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </isLoggedInContext.Provider>
    );
};

export default IsLoggedInProvider;

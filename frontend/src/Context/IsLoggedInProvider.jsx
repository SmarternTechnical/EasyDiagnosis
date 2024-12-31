import React, { useState, useEffect } from "react";
import isLoggedInContext from "./IsLoggedInContext";

const IsLoggedInProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Restore isLoggedIn state from localStorage on mount
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(storedLoggedIn);
  }, []);

  // Update localStorage whenever isLoggedIn changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <isLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </isLoggedInContext.Provider>
  );
};

export default IsLoggedInProvider;

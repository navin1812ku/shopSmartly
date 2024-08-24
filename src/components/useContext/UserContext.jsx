import React, { createContext, useContext, useState } from 'react';
const UserContext = createContext();

export const useUserstate = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

  const [isUserLoggedIn, setUserLogegdIn] = useState(() => {
    // Check if the token is present in the local storage during initialization
    const role = localStorage.getItem('role');
    return (role === 'USER'); // Convert token presence to boolean
  });

  const setUserLoggedInStatus = () => {
    setUserLogegdIn(!isUserLoggedIn)
  };

  return (
    <UserContext.Provider value={{
      isUserLoggedIn,
      setUserLoggedInStatus
    }}>
      {children}
    </UserContext.Provider>
  );
};
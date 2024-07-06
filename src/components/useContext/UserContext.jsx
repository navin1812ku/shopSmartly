import React, { createContext, useContext, useState } from 'react';
const UserContext = createContext();

export const useUserstate = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setLogegdIn] = useState(true);

  const [isUserLoggedIn, setUserLogegdIn] = useState(() => {
    // Check if the token is present in the local storage during initialization
    const role = localStorage.getItem('role');
    return (role === 'USER'); // Convert token presence to boolean
  });

  const [isAdminLoggedIn, setAdminLogegdIn] = useState(() => {
    // Check if the token is present in the local storage during initialization
    const role = localStorage.getItem('role');
    return (role === 'ADMIN'); // Convert token presence to boolean
  });

  const [isVendorLoggedIn, setVendorLogegdIn] = useState(() => {
    // Check if the token is present in the local storage during initialization
    const role = localStorage.getItem('role');
    return (role === 'VENDOR'); // Convert token presence to boolean
  });

  const [isCourierLoggedIn, setCourierLogegdIn] = useState(() => {
    // Check if the token is present in the local storage during initialization
    const role = localStorage.getItem('role');
    return (role === 'COURIER'); // Convert token presence to boolean
  });

  const setLoggedInStatus = () => {
    setLogegdIn(!isLoggedIn)
  };

  const setUserLoggedInStatus = () => {
    setUserLogegdIn(!isUserLoggedIn)
  };

  const setAdminLoggedInStatus = () => {
    setAdminLogegdIn(!isAdminLoggedIn)
  };

  const setVendorLoggedInStatus = () => {
    setVendorLogegdIn(!isVendorLoggedIn)
  };

  const setCourierLoggedInStatus = () => {
    setCourierLogegdIn(!isCourierLoggedIn)
  };

  return (
    <UserContext.Provider value={{
      isLoggedIn,
      setLoggedInStatus,
      isUserLoggedIn,
      setUserLoggedInStatus,
      isAdminLoggedIn,
      setAdminLoggedInStatus,
      isVendorLoggedIn,
      setVendorLoggedInStatus,
      isCourierLoggedIn,
      setCourierLoggedInStatus
    }}>
      {children}
    </UserContext.Provider>
  );
};
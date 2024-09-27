import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
const ShopContext = createContext();

const StoreContextProvider = ({children}) => {

    axios.defaults.withCredentials = true;

    const contextValue = {
    } 


  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  )
}

const useAuth = () => useContext(ShopContext);
export { useAuth, StoreContextProvider };
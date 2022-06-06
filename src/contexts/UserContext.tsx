import React, { createContext, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "../api/axios";
import { AxiosError } from "axios";

type AuthUser = {
  user: string
  pwd: string
  accessToken: String
}


type UserContextProviderProps = {
  children: React.ReactNode
}


type UserContextType = {
  auth: AuthUser
  setAuth: React.Dispatch<React.SetStateAction<AuthUser>>
  logout: () => void
}


const UserContext = createContext({} as UserContextType)

export const UserContextProvider = (props: UserContextProviderProps) => {

  const navigate = useNavigate();

  const [auth, setAuth] = useState<AuthUser>({} as AuthUser)

  const logout = async () => {
    // if used in more components, this should be in context
    try {
      // axios to /logout endpoint 
      await axios.get("/logout", {
        withCredentials: true
      });
      navigate('login');
      setAuth({} as AuthUser);
    } catch (error) {
      const err = error as AxiosError;
      console.error(err.message);
    }
  }


  return (
    <UserContext.Provider value= {{ auth, setAuth, logout }}>
      { props.children }
    </UserContext.Provider>
    )
}

export default UserContext
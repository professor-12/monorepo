import React from 'react'
import { createContext } from 'react'
import { useAuth } from '../hooks/auth'
import { useContext } from 'react'


const Auth = createContext({})
const AuthProvider = ({ children }) => {
      const value = useAuth()
      if (value.loading) {
            return <div>Loading</div>
      }
      return (
            <Auth.Provider value={{ ...value }}> {children}</Auth.Provider >
      )
}

export default AuthProvider

export function useAuthContext() {
      const context = useContext(Auth)

      if (!context) {
            throw new Error("Context not found")
      }

      return context
}
import React from 'react'
import { createContext } from 'react'


export const useAuth = () => {
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            // Subscribe to Firebase auth state
            const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
                  setUser(firebaseUser);
                  setLoading(false);
            });

            return () => unsubscribe();
      }, []);

      return { user, loading };
};


const Auth = createContext({})
const AuthProvider = ({ children }) => {
      const value = useAuth()
      return (
            <Auth.Provider value={{ ...value }}> {children}</Auth.Provider >
      )
}

export default AuthProvider
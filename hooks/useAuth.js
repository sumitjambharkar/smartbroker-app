import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from '../firebase-config'

const AuthContext = createContext({});
 
export const AuthProvider = ({children}) => {

  const [currentUser,setCurrentUser] = useState(null)
  
  // const signUp = (email, password) => {
  //   return createUserWithEmailAndPassword(auth, email, password);
  // };
  // const login = async(email, password) => {
  //   return signInWithEmailAndPassword(auth, email, password)
   
  // };
  const logout = async () => {
    await firebase.auth().signOut();
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log('user status changed: ', user);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{
        currentUser,
        logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth () {
    return useContext(AuthContext);
}
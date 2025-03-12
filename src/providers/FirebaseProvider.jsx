import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase";

export const FirebaseContext = createContext(null)

const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to the auth state change listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);  // Set user if logged in
        console.log(currentUser);
      } else {
        setUser(null);  // Set user to null if logged out
        console.log('User is absent.');
      }
      setLoading(false);
    });
    // Cleanup function to unsubscribe on component unmount
    return () => {
      unsubscribe();
    };
  }, []);  // Empty dependency array ensures this runs once when component mounts

  const createUser = async (name, email, password, photoURL) => {
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name, photoURL: photoURL })
      return credentials.user;
    } catch (error) {
      console.log(error)
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password)=>{
    try{
      setLoading(true)
      const result = await signInWithEmailAndPassword(auth, email, password)
      return result.user
    }catch(err){
      console.log(err.message)
    }finally{
      setLoading(false)
    }
  }

  const logOut = async ()=>{
    try{
      setLoading(true)
      await signOut(auth)
    }catch(err){
      return err
    }finally{
      console.clear()
      setLoading(false)
    }
  }




  const authInfo = { user, loading, createUser, login, logOut }


  return (
    <FirebaseContext.Provider value={authInfo}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const FirebaseContext = createContext(null)

const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [firebaseLoading, setFirebaseLoading] = useState(true);

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
      setFirebaseLoading(false);
    });
    // Cleanup function to unsubscribe on component unmount
    return () => {
      unsubscribe();
    };
  }, []);  // Empty dependency array ensures this runs once when component mounts



  const authInfo = { user, firebaseLoading }


  return (
    <FirebaseContext.Provider value={authInfo}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
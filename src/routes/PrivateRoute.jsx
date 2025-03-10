import { useContext } from "react";
import FirebaseProvider from "../providers/FirebaseProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, firebaseLoading } = useContext(FirebaseProvider)
  const location = useLocation()
  console.log(location)

  if (firebaseLoading) {
    return <div className="loading-spinner size-16" />
  }

  if (user?.email) {
    return children;
  }

  return (
    <Navigate state={location.pathname} to='/login' replace />
  )

};

export default PrivateRoute;
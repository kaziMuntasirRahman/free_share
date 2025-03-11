import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import FirebaseProvider from "../providers/FirebaseProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(FirebaseProvider)
  const location = useLocation()
  console.log(location)

  if (loading) {
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
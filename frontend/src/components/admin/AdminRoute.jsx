import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";
export default function AdminRoute({children}) {
    const {user}= useContext(AuthContext)
  return (
    <div>
      {!user && <Navigate to="/login"/>}
      {user?.role !== "admin" && <Navigate to ="/"/>}
      {children}
    </div>
  )
}


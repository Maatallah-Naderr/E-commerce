import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();
export default function AuthProvider({children}){
    const[token , setToken]=useState(null);
    const [user , setUser]= useState(null);
    const [loading , setLoading]= useState(true);
    const [error , setError]= useState(null);
    const isAuthenticated = !!token;
////upload token 
useEffect(()=>{
  const savedToken = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");
  if(savedToken){
    setToken(savedToken)
  }
if(savedUser) setUser(JSON.parse(savedUser))
  setLoading(false);
},[])

    async function loginUser(tokenData , userData){
        try{
            setLoading(true);
            setError(null);
              setToken(tokenData);
        setUser(userData);
        localStorage.setItem("token", tokenData)
        localStorage.setItem("user",JSON.stringify(userData))
      
        }catch(error){
            setError(error.message|| "login failed");
        }finally{
            setLoading(false)
        }
      

    }
    function logout(){
        setToken(null);
        setUser(null);
        localStorage.removeItem("token")
        localStorage.removeItem("user");
    }
    const value = {token , user ,loginUser,logout,loading, error, isAuthenticated}
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}